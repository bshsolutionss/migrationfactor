import { Children, Fragment, cloneElement, isValidElement, type ReactNode } from 'react';

/** Render stable word masks on the server; never replace React-owned DOM after hydration. */
export default function WordReveal({ children }: { children: ReactNode }) {
  let index = 0;

  function split(node: ReactNode): ReactNode {
    return Children.map(node, (child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return String(child).split(/(\s+)/).map((word, part) => {
          if (!word.trim()) return word;
          const delay = index++ * 25;
          return (
            <span className="word-mask" key={part}>
              <span className="word" style={{ animationDelay: `${delay}ms` }}>{word}</span>
            </span>
          );
        });
      }
      if (isValidElement<{ children?: ReactNode }>(child) &&
          (typeof child.type === 'string' || child.type === Fragment) && child.props.children) {
        return cloneElement(child, undefined, split(child.props.children));
      }
      return child;
    });
  }

  return <>{split(children)}</>;
}
