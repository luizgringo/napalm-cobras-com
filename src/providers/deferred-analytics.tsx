"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Analytics = dynamic(
  () => import("@vercel/analytics/next").then((module) => module.Analytics),
  { ssr: false },
);

const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((module) => module.SpeedInsights),
  { ssr: false },
);

export function DeferredMonitoring() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setIsReady(true));
      return () => window.cancelIdleCallback(id);
    }

    const timer = setTimeout(() => setIsReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
