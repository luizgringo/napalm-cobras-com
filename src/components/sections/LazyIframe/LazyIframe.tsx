"use client";

import type { IframeHTMLAttributes, ReactNode } from "react";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import styles from "./LazyIframe.module.css";

interface LazyIframeProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  minHeight: number;
  placeholder?: ReactNode;
}

export function LazyIframe({
  minHeight,
  placeholder,
  title,
  src,
  className,
  loading = "lazy",
  ...iframeProps
}: LazyIframeProps) {
  const { ref, isInView } = useInViewOnce("400px");

  return (
    <div ref={ref} className={styles["lazy-iframe"]} style={{ minHeight }}>
      {isInView ? (
        <iframe
          title={title}
          src={src}
          loading={loading}
          style={{ height: minHeight }}
          className={className}
          {...iframeProps}
        />
      ) : (
        placeholder
      )}
    </div>
  );
}
