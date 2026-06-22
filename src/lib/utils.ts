import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function mergeClassNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function prettyHost(url: string): string {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}
