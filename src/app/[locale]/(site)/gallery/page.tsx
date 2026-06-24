/**
 * Localized gallery page. Async Server Component that renders the flyer gallery
 * with localized labels.
 */
import type { Metadata } from "next";
import { FlyerGallery } from "@/components/sections/FlyerGallery";
import { PageSchema } from "@/components/seo/PageSchema";
import { PageHero } from "@/components/templates/SectionTitle";
import { FLYERS } from "@/config/flyers";
import { getDictionary, type Locale } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo";
import { mergeClassNames } from "@/lib/utils";
import primitives from "@/styles/primitives.module.css";

/** Props for the gallery route, carrying the async `locale` route param. */
type Props = { params: Promise<{ locale: string }> };

/**
 * Builds localized metadata for the gallery page.
 *
 * @param props - Route props.
 * @param props.params - Promise resolving to the route params containing `locale`.
 * @returns The localized {@link Metadata} for the gallery page.
 */
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

/**
 * Gallery page (async Server Component). Renders the page hero and the flyer
 * gallery with localized lightbox labels.
 *
 * @param props - Route props.
 * @param props.params - Promise resolving to the route params containing `locale`.
 * @returns The rendered gallery page.
 */
export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);

  return (
    <>
      <PageSchema pathname={`/${locale}/gallery`} />
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
