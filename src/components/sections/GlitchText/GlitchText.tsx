/**
 * Server component rendering text with a CSS-driven RGB-split glitch effect.
 *
 * @remarks Structure lives here and styling in `GlitchText.module.css`.
 */

import type { ReactNode } from "react";
import { mergeClassNames } from "@/lib/utils";
import styles from "./GlitchText.module.css";

/**
 * Triple-layered text producing a Xerox/RGB-split glitch on hover and
 * a one-shot glitch on mount. The visible layer is the middle one; the
 * other two are pure decoration.
 *
 * @param props - Component props.
 * @param props.children - Text content; coerced to a string for the duplicated glitch layers.
 * @param props.className - Optional extra class names merged onto the root element.
 * @param props.continuous - When `true`, the glitch animates continuously instead of only on hover/mount. Defaults to `false`.
 * @param props.as - Intrinsic element/tag used for the root. Defaults to `"span"`.
 * @returns The glitch text element.
 * @remarks Server component.
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
