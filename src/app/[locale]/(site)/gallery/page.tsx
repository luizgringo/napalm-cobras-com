import type { Metadata } from "next";
import { FlyerGallery } from "@/components/sections/FlyerGallery";
import { PageHero } from "@/components/templates/SectionTitle";
import { FLYERS } from "@/config/flyers";
import { getDictionary, type Locale } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo";
import { mergeClassNames } from "@/lib/utils";
import primitives from "@/styles/primitives.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);
  return buildMetadata({
    locale: locale as Locale,
    path: "gallery",
    title: t.gallery.title,
    description: t.gallery.intro,
  });
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);

  return (
    <>
      <PageHero eyebrow="Visual Archive" title={t.gallery.title} intro={t.gallery.intro} />

      <section>
        <div className={mergeClassNames(primitives.container, primitives["container--cozy"])}>
          <FlyerGallery
            flyers={FLYERS}
            placeholder={t.gallery.placeholder}
            closeLabel={t.gallery.close}
            prevLabel={t.gallery.prev}
            nextLabel={t.gallery.next}
          />
        </div>
      </section>
    </>
  );
}
