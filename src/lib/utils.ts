/**
 * Small, shared utility helpers for the Napalm Cobras website.
 *
 * @remarks
 * Provides class-name merging and URL host beautification used across UI components.
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges conditional class names and resolves Tailwind conflicts.
 *
 * @param inputs - Class values (strings, arrays, objects) to combine.
 * @returns A single, conflict-resolved class name string.
 */
export function mergeClassNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Strips protocol, leading `www.` and trailing slash from a URL for display.
 *
 * @param url - The URL to simplify.
 * @returns The bare host (and path) suitable for showing to users.
 */
export function prettyHost(url: string): string {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}
