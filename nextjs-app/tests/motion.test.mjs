import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const testDirectory = path.dirname(fileURLToPath(import.meta.url));

// Execute the real effect with controlled browser APIs. No test-only code enters the app.
function setup({ reduced = false, missingObserver = false, failingObserver = false } = {}) {
  class Element {
    constructor(classes) {
      const tokens = new Set(classes.split(' '));
      this.classList = {
        add: (...names) => names.forEach((name) => tokens.add(name)),
        remove: (...names) => names.forEach((name) => tokens.delete(name)),
        contains: (name) => tokens.has(name),
        toggle: (name, value) => value ? tokens.add(name) : tokens.delete(name),
      };
    }
    closest(selector) {
      if (selector === '.hero' && this.hero) return this;
      return selector === '.feature' && this.classList.contains('feature') ? this : null;
    }
  }
  const heading = new Element('split');
  const reveal = new Element('reveal');
  const features = [new Element('feature active'), new Element('feature')];
  const targets = [heading, reveal];
  const events = new Map();
  const group = { querySelectorAll: () => features };
  features.forEach((feature) => { feature.parentElement = group; });
  const main = {
    querySelectorAll: () => targets,
    contains: (element) => features.includes(element),
    addEventListener: (name, handler) => {
      if (!events.has(name)) events.set(name, new Set());
      events.get(name).add(handler);
    },
    removeEventListener: (name, handler) => events.get(name)?.delete(handler),
  };
  const preferenceListeners = new Set();
  const preference = {
    matches: reduced,
    addEventListener: (_, handler) => preferenceListeners.add(handler),
    removeEventListener: (_, handler) => preferenceListeners.delete(handler),
  };
  const observers = [];
  class Observer {
    constructor(callback, options) {
      if (failingObserver) throw Error('Unavailable observer');
      this.callback = callback; this.options = options; this.observed = new Set();
      observers.push(this);
    }
    observe(element) { this.observed.add(element); }
    unobserve(element) { this.observed.delete(element); }
    disconnect() { this.observed.clear(); this.disconnected = true; }
  }
  const mutations = [];
  class Mutations {
    constructor(callback) { mutations.push(this); this.callback = callback; }
    observe() { this.connected = true; }
    disconnect() { this.connected = false; }
  }
  const window = { matchMedia: () => preference };
  if (!missingObserver) window.IntersectionObserver = Observer;
  let effect;
  const code = ts.transpileModule(fs.readFileSync(path.join(testDirectory, '../src/components/shared/MotionEffect.tsx'), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, {
    exports, Element, HTMLElement: Element, IntersectionObserver: Observer,
    MutationObserver: Mutations, document: { getElementById: () => main }, window,
    require: (name) => name === 'react' ? { useEffect: (fn) => { effect = fn; } } : { usePathname: () => '/' },
  });
  exports.default();
  return { run: () => effect(), targets, heading, reveal, features, events, preference, preferenceListeners, observers, mutation: () => mutations.at(-1), Element };
}

test('heading and WOW entry use distinct source trigger points and unobserve after entrance', () => {
  const app = setup(); const cleanup = app.run();
  assert.equal(app.observers[0].options.rootMargin, '0px 0px -10% 0px');
  assert.equal(app.observers[1].options.threshold, 0);
  assert.ok(app.heading.classList.contains('motion-ready'));
  app.observers[0].callback([{ isIntersecting: true, target: app.heading }]);
  assert.ok(app.heading.classList.contains('in-view'));
  assert.equal(app.observers[0].observed.size, 0);
  cleanup();
});

test('Strict Mode setup/cleanup/setup leaves one handler and no stale observers', () => {
  const app = setup(); app.run()(); const cleanup = app.run();
  assert.equal(app.events.get('pointerover').size, 1);
  assert.equal(app.events.get('focusin').size, 2);
  assert.equal(app.preferenceListeners.size, 1);
  assert.ok(app.observers.slice(0, 2).every((observer) => observer.disconnected));
  cleanup();
  assert.ok(app.observers.every((observer) => observer.disconnected));
  assert.equal(app.preferenceListeners.size, 0);
  assert.ok(app.targets.every((element) => !element.classList.contains('motion-ready')));
});

test('first-paint hero motion is not hidden or restarted by hydration', () => {
  const app = setup(); app.heading.hero = true; app.reveal.hero = true;
  const cleanup = app.run();
  assert.ok(app.targets.every((element) => !element.classList.contains('motion-ready') && element.classList.contains('in-view')));
  assert.ok(app.observers.every((observer) => observer.observed.size === 0));
  cleanup();
});

test('reduced motion preserves feature activation and shows all content', () => {
  const app = setup({ reduced: true }); const cleanup = app.run();
  assert.ok(app.targets.every((element) => element.classList.contains('in-view')));
  assert.equal(app.observers.length, 0);
  app.events.get('pointerover').forEach((handler) => handler({ target: app.features[1] }));
  assert.ok(app.features[1].classList.contains('active'));
  assert.ok(!app.features[0].classList.contains('active'));
  cleanup();
});

test('live reduced-motion changes stop pending reveals without hiding already visible content', () => {
  const app = setup(); const cleanup = app.run();
  app.preference.matches = true;
  app.preferenceListeners.forEach((handler) => handler());
  assert.ok(app.targets.every((element) => !element.classList.contains('motion-ready') && element.classList.contains('in-view')));
  app.preference.matches = false;
  app.preferenceListeners.forEach((handler) => handler());
  assert.ok(app.targets.every((element) => !element.classList.contains('motion-ready')));
  cleanup();
});

test('unsupported or failing observer APIs never hide content', () => {
  for (const options of [{ missingObserver: true }, { failingObserver: true }]) {
    const app = setup(options); const cleanup = app.run();
    assert.ok(app.targets.every((element) => !element.classList.contains('motion-ready')));
    assert.equal(app.events.get('pointerover').size, 1);
    cleanup();
  }
});

test('streamed route elements register once, and keyboard focus reveals ancestor groups', () => {
  const app = setup(); const cleanup = app.run();
  const streamed = new app.Element('reveal'); app.targets.push(streamed);
  app.mutation().callback(); app.mutation().callback();
  assert.equal(app.observers[1].observed.size, 2);
  const control = new app.Element(''); control.parentElement = streamed;
  app.events.get('focusin').forEach((handler) => handler({ target: control }));
  assert.ok(streamed.classList.contains('in-view'));
  cleanup();
  assert.equal(app.mutation().connected, false);
});
