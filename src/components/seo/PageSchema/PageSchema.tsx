import { AeoFaq } from "@/components/seo/AeoFaq";
import { JsonLd } from "@/components/seo/JsonLd";
import { extractFaqsFromContent, getAeoPage } from "@/lib/aeo-content";
import { pageSchemaGraph } from "@/lib/aeo-schema";

interface PageSchemaProps {
  pathname: string;
}

export function PageSchema({ pathname }: PageSchemaProps) {
  const schemas = pageSchemaGraph(pathname);
  const page = getAeoPage(pathname);
  const faqs = extractFaqsFromContent(page?.content ?? "");

  return (
    <>
      {schemas.length > 0 ? <JsonLd data={schemas} /> : null}
      {faqs.length > 0 ? <AeoFaq items={faqs} /> : null}
    </>
  );
}
