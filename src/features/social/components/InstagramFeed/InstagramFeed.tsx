/**
 * Server component that fetches the Instagram feed and renders either a grid
 * of recent posts or a follow call-to-action when no posts are available.
 */

import { Instagram } from "lucide-react";
import { SITE } from "@/config/site";
import { getInstagramFeed } from "../../services/instagram";
import styles from "./InstagramFeed.module.css";

/**
 * Renders a grid of the latest Instagram posts, or a follow CTA as fallback.
 *
 * @param props - Component props.
 * @param props.followLabel - Localized label for the follow call-to-action.
 * @returns The rendered feed grid or fallback CTA.
 * @remarks Async Server Component; fetches data via {@link getInstagramFeed}.
 */
export async function InstagramFeed({ followLabel }: { followLabel: string }) {
  const posts = await getInstagramFeed();

  if (!posts || posts.length === 0) {
    return (
      <a
        href={SITE.socials.instagram}
        target="_blank"
        rel="noreferrer"
        className={styles["ig-cta"]}
      >
        <span className={styles["ig-cta__handle"]}>
          <Instagram size={28} className={styles["ig-cta__icon"]} /> @napalmcobras
        </span>
        <span className={styles["ig-cta__action"]}>{followLabel} →</span>
      </a>
    );
  }

  return (
    <div className={styles["ig-grid"]}>
      {posts.slice(0, 6).map((post) => (
        <a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noreferrer"
          className={styles["ig-grid__item"]}
        >
          {/* biome-ignore lint/performance/noImgElement: Instagram CDN hostnames are dynamic */}
          <img
            src={post.thumbnailUrl || post.mediaUrl}
            alt={post.caption ?? "Instagram"}
            loading="lazy"
            className={styles["ig-grid__img"]}
          />
        </a>
      ))}
    </div>
  );
}
