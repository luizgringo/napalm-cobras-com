import type { ReactNode } from "react";

/**
 * Triple-layered text producing a Xerox/RGB-split glitch on hover and
 * a one-shot glitch on mount. The visible layer is the middle one; the
 * other two are pure decoration.
 */
export function GlitchText({
  children,
  className = "",
  as: Tag = "span",
}: {
  children: ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const text = String(children);
  return (
    <Tag className={`glitch relative inline-block ${className}`} data-text={text}>
      {children}
    </Tag>
  );
}
