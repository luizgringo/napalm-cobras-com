"use client";

import { motion } from "framer-motion";
import { Heart, Instagram, MessageCircle, Play } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/sections/Reveal";
import { mergeClassNames } from "@/lib/utils";
import primitives from "@/styles/primitives.module.css";
import type { InstagramFeedData } from "../services/behold";
import { useInstagramFeed } from "./InstagramFeed.hooks";
import styles from "./InstagramFeed.module.css";

interface InstagramFeedProps {
  feed: InstagramFeedData;
  followLabel: string;
  followersLabel: string;
  profileHref: string;
}

export function InstagramFeed({
  feed,
  followLabel,
  followersLabel,
  profileHref,
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
                alt={profile.username}
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
                alt={post.caption || `Post de ${profile.username}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
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
