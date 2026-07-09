/**
 * Responsive band hero image for the homepage.
 *
 * Serves pre-generated AVIF/WebP/JPEG variants via `<picture>` and `srcset`,
 * with layout tuned so all three band members stay visible across viewports.
 *
 * @remarks Regenerate assets with `pnpm generate:band-hero` (source:
 * `assets-source/band-hero.JPG`). Also regenerates `public/og/cover.jpg` for
 * Open Graph. Preload AVIF variants on the home route for LCP.
 */

import { mergeClassNames } from "@/lib/utils";
import styles from "./BandHeroImage.module.css";

/** Responsive widths generated under `public/assets/images/band-hero/`. */
const BAND_HERO_WIDTHS = [640, 960, 1280, 1400] as const;

const BAND_HERO_BASE = "/assets/images/band-hero/band-hero";

function buildSrcSet(format: "avif" | "webp" | "jpg") {
  return BAND_HERO_WIDTHS.map((width) => `${BAND_HERO_BASE}-${width}.${format} ${width}w`).join(
    ", ",
  );
}

/** Props for {@link BandHeroImage}. */
type BandHeroImageProps = {
  /** Localized alt text describing the band photo. */
  alt: string;
  /** Optional class merged onto the root `<picture>` element. */
  className?: string;
};

/**
 * Full-bleed hero background image with modern format negotiation and responsive sizing.
 *
 * @param props - Component props.
 * @param props.alt - Accessible description of the band photograph.
 * @param props.className - Extra class names for the `<picture>` wrapper.
 * @returns A positioned `<picture>` element filling its parent (`absolute inset-0`).
 * @remarks Server Component — no client JS. Uses `object-fit: contain` on narrow
 * and portrait viewports; switches to `cover` at `min-width: 1024px` in landscape
 * so faces remain visible without excessive letterboxing.
 */
export function BandHeroImage({ alt, className }: BandHeroImageProps) {
  return (
    <picture className={mergeClassNames(styles.root, className)}>
      <source type="image/avif" srcSet={buildSrcSet("avif")} sizes="100vw" />
      <source type="image/webp" srcSet={buildSrcSet("webp")} sizes="100vw" />
      <img
        src={`${BAND_HERO_BASE}-1400.jpg`}
        srcSet={buildSrcSet("jpg")}
        sizes="100vw"
        alt={alt}
        fetchPriority="high"
        decoding="async"
        className={styles.img}
      />
    </picture>
  );
}
