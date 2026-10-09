'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function MotionEffect() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.getElementById('main');
    if (!main) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const targets = new Set<HTMLElement>();
    let words: IntersectionObserver | undefined;
    let reveals: IntersectionObserver | undefined;

    const show = (element: HTMLElement) => {
      element.classList.add('in-view');
      words?.unobserve(element);
      reveals?.unobserve(element);
    };

    const showAll = () => {
      words?.disconnect();
      reveals?.disconnect();
      targets.forEach((element) => {
        element.classList.remove('motion-ready');
        element.classList.add('in-view');
      });
    };

    function startObservers() {
      if (preference.matches || !('IntersectionObserver' in window)) return;
      const enter: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) show(entry.target as HTMLElement);
        });
      };
      // SplitText: top 90%. WOW: viewport edge, offset 0, including mobile.
      words = new IntersectionObserver(enter, { rootMargin: '0px 0px -10% 0px' });
      reveals = new IntersectionObserver(enter, { threshold: 0 });
    }

    function discover() {
      main!.querySelectorAll<HTMLElement>('.reveal, .split').forEach((element) => {
        if (targets.has(element)) return;
        targets.add(element);
        // The hero starts in CSS on first paint, avoiding a visible → hidden hydration flash.
        if (element.closest('.hero')) {
          show(element);
          return;
        }
        if (preference.matches || !words || !reveals || element.classList.contains('in-view')) {
          show(element);
          return;
        }
        element.classList.add('motion-ready');
        (element.classList.contains('split') ? words : reveals).observe(element);
      });
    }

    // Interactivity remains enabled when motion is reduced or observers are unavailable.
    const activateFeature = (event: Event) => {
      const origin = event.target;
      if (!(origin instanceof Element)) return;
      const feature = origin.closest<HTMLElement>('.feature');
      if (!feature || !main.contains(feature) || feature.classList.contains('active')) return;
      feature.parentElement?.querySelectorAll('.feature').forEach((sibling) => {
        sibling.classList.toggle('active', sibling === feature);
      });
    };

    const focusContent = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      let element: Element | null = event.target;
      while (element && element !== main) {
        if (element instanceof HTMLElement && targets.has(element)) show(element);
        element = element.parentElement;
      }
    };

    const updatePreference = () => {
      showAll();
      try { startObservers(); discover(); } catch { showAll(); }
    };

    // Streaming routes can mount additional server components after pathname changes.
    const mutations = new MutationObserver(() => {
      try { discover(); } catch { showAll(); }
    });

    try {
      startObservers();
      discover();
      mutations.observe(main, { childList: true, subtree: true });
    } catch {
      showAll(); // Optional motion must never prevent access to content.
    }

    main.addEventListener('pointerover', activateFeature);
    main.addEventListener('focusin', activateFeature);
    main.addEventListener('focusin', focusContent);
    preference.addEventListener('change', updatePreference);

    return () => {
      mutations.disconnect();
      words?.disconnect();
      reveals?.disconnect();
      main.removeEventListener('pointerover', activateFeature);
      main.removeEventListener('focusin', activateFeature);
      main.removeEventListener('focusin', focusContent);
      preference.removeEventListener('change', updatePreference);
      targets.forEach((element) => element.classList.remove('motion-ready', 'in-view'));
    };
  }, [pathname]);

  return null;
}
