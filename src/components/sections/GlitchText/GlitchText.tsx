import type { ReactNode } from "react";
import { mergeClassNames } from "@/lib/utils";
import styles from "./GlitchText.module.css";

/**
 * Triple-layered text producing a Xerox/RGB-split glitch on hover and
 * a one-shot glitch on mount. The visible layer is the middle one; the
 * other two are pure decoration.
 */
export function GlitchText({
  children,
  className,
  continuous = false,
  as: Tag = "span",
}: {
  children: ReactNode;
  className?: string;
  continuous?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const text = String(children);
  return (
    <Tag
      className={mergeClassNames(
        styles["glitch-text"],
        continuous && styles["glitch-text--continuous"],
        className,
      )}
      data-text={text}
    >
      {children}
    </Tag>
  );
}
