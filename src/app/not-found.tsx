import Link from "next/link";
import { defaultLocale } from "@/i18n/config";
import { fontVariables } from "@/lib/fonts";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <html lang={defaultLocale} className={fontVariables}>
      <body>
        <main className={styles.screen}>
          <p className={styles.screen__code}>404</p>
          <p className={styles.screen__text}>Página não encontrada</p>
          <Link href={`/${defaultLocale}`} className={styles.screen__action}>
            Voltar ao início
          </Link>
        </main>
      </body>
    </html>
  );
}
