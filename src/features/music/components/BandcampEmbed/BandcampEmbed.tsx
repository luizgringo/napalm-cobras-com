import { SITE } from "@/config/site";
import styles from "./BandcampEmbed.module.css";

interface BandcampEmbedProps {
  src?: string;
  title?: string;
}

export function BandcampEmbed({
  src = SITE.album.bandcampEmbed,
  title = "Bandcamp — Homens Brancos de Terno",
}: BandcampEmbedProps = {}) {
  return (
    <div className={styles["embed-frame"]}>
      <iframe title={title} src={src} style={{ border: 0, width: "100%", height: 540 }} seamless />
    </div>
  );
}
