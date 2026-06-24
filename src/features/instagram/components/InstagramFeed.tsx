"use client";

/**
 * Client component that renders the Instagram feed: profile header
 * (avatar, handle, follower count, follow CTA) plus an animated grid of posts.
 */

import { motion } from "framer-motion";
import { Heart, Instagram, MessageCircle, Play } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/sections/Reveal";
import { buildInstagramAvatarAlt, buildInstagramPostAlt } from "@/lib/image-alt";
import { mergeClassNames } from "@/lib/utils";
import primitives from "@/styles/primitives.module.css";
import type { InstagramFeedData } from "../services/behold";
import { useInstagramFeed } from "./InstagramFeed.hooks";
import styles from "./InstagramFeed.module.css";

/** Props for {@link InstagramFeed}. */
interface InstagramFeedProps {
  /** Normalized Instagram profile and posts to render. */
  feed: InstagramFeedData;
  /** Localized label for the "follow" call-to-action button. */
  followLabel: string;
  /** Localized label shown after the follower count (e.g. "followers"). */
  followersLabel: string;
  /** External URL to the Instagram profile. */
  profileHref: string;
  /** Localized template for the profile avatar alt text (`{username}` placeholder). */
  avatarAltTemplate: string;
  /** Localized fallback for post alt text when caption is missing (`{username}` placeholder). */
  postAltFallback: string;
}

/**
 * Renders the Instagram feed as a profile header and an animated post grid.
 *
 * @param props - See {@link InstagramFeedProps}.
 * @remarks Client component (uses framer-motion animations).
 */
export function InstagramFeed({
  feed,
  followLabel,
  followersLabel,
  profileHref,
  avatarAltTemplate,
  postAltFallback,
}: InstagramFeedProps) {
  const { profile, posts, formatCount } = useInstagramFeed(feed);

  return (
    <Reveal>
      <div className={styles.feed}>
        <header className={styles.feed__header}>
          <a href={profileHref} target="_blank" rel="noreferrer" className={styles.feed__profile}>
            <span className={styles.feed__avatar}>
              <Image
                src={profile.profilePictureUrl}
                alt={buildInstagramAvatarAlt(profile.username, avatarAltTemplate)}
                fill
                sizes="56px"
                className={styles["feed__avatar-img"]}
              />
            </span>
            <span className={styles["feed__profile-text"]}>
              <span className={styles.feed__username}>@{profile.username}</span>
              <span className={styles.feed__followers}>
                {formatCount(profile.followersCount)} {followersLabel}
              </span>
            </span>
          </a>
          <a
            href={profileHref}
            target="_blank"
            rel="noreferrer"
            className={mergeClassNames(
              primitives.cta,
              primitives["cta--outline-blood"],
              primitives["cta--pulse"],
            )}
          >
            <Instagram size={14} /> {followLabel}
          </a>
        </header>

        <div className={styles.feed__grid}>
          {posts.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className={styles.post}
            >
              <Image
                src={post.imageUrl}
                alt={buildInstagramPostAlt(post.caption, profile.username, postAltFallback)}
                fill
                sizes="(max-width: 768px) 45vw, (max-width: 1200px) 30vw, 384px"
                className={styles.post__img}
              />
              {post.mediaType !== "IMAGE" ? (
                <span className={styles.post__badge}>
                  <Play size={14} fill="currentColor" />
                </span>
              ) : null}
              <div className={styles.post__overlay}>
                {post.caption ? <p className={styles.post__caption}>{post.caption}</p> : null}
                <div className={styles.post__stats}>
                  <span className={styles.post__stat}>
                    <Heart size={13} /> {formatCount(post.likeCount)}
                  </span>
                  <span className={styles.post__stat}>
                    <MessageCircle size={13} /> {formatCount(post.commentsCount)}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
