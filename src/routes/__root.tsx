import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { I18nProvider } from "@/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SITE } from "@/lib/site";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-9xl text-blood">404</h1>
        <h2 className="mt-4 font-display text-3xl uppercase text-paper">Page not found</h2>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-paper/60">
          This page doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex bg-blood px-6 py-3 font-mono text-xs uppercase tracking-widest text-paper hover:bg-paper hover:text-ink"
        >
          ← Home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl text-paper">Something broke.</h1>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 cursor-pointer bg-blood px-6 py-3 font-mono text-xs uppercase tracking-widest text-paper"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Napalm Cobras",
  genre: ["Metal Punk", "Speedrock", "Hardcore Punk"],
  foundingLocation: { "@type": "Place", name: "Belo Horizonte, Minas Gerais, Brazil" },
  url: "/",
  sameAs: [
    SITE.socials.instagram,
    SITE.socials.bandcamp,
    SITE.socials.youtube,
    SITE.socials.bandsintown,
  ],
  member: [
    { "@type": "Person", name: "Uander Trajano", roleName: "Bass & Vocals" },
    { "@type": "Person", name: "Luiz Gringo", roleName: "Guitar" },
    { "@type": "Person", name: "Humberto Monteiro", roleName: "Drums" },
  ],
  album: {
    "@type": "MusicAlbum",
    name: "Homens Brancos de Terno",
    datePublished: "2022",
  },
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Napalm Cobras — Metal Punk / Speedrock from Belo Horizonte" },
      { name: "description", content: "Brazilian Metal Punk and Speedrock trio from Belo Horizonte. EP \"Homens Brancos de Terno\", live shows and press materials." },
      { name: "theme-color", content: "#0a0a0a" },
      { property: "og:site_name", content: "Napalm Cobras" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Napalm Cobras — Metal Punk / Speedrock" },
      { property: "og:description", content: "Brazilian Metal Punk and Speedrock trio from Belo Horizonte." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&family=Pirata+One&family=Bebas+Neue&family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;700&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(orgJsonLd),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <div className="flex min-h-screen flex-col bg-ink">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </I18nProvider>
    </QueryClientProvider>
  );
}
