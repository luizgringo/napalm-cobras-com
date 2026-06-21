# Napalm Cobras

Site oficial da banda **Napalm Cobras** — Speed Rock and Roll de Belo Horizonte.

Construído com Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion e Biome. Internacionalizado por URL (`/pt`, `/en`, `/es`) com renderização estática (SSG) para máxima performance e SEO.

## Stack

- **Next.js 16** (App Router, SSG, `next/image`, `next/font`, `next/script`)
- **TypeScript** estrito
- **Tailwind CSS v4** (`@tailwindcss/postcss`)
- **Framer Motion** para animações
- **Biome** para lint e formatação
- **pnpm** como gerenciador de pacotes
- **Vercel** como destino de deploy (Analytics + Speed Insights)

## Scripts

```bash
pnpm dev      # ambiente de desenvolvimento
pnpm build    # build de produção (SSG)
pnpm start    # serve o build de produção
pnpm lint     # Biome check
pnpm format   # Biome check --write (formata e organiza imports)
```

## Estrutura

```
src/
  app/                 # roteamento (App Router)
    [locale]/(site)/   # páginas localizadas + layout, error
    layout.tsx         # root (metadata, globals)
    not-found.tsx
    sitemap.ts | robots.ts
  components/
    layout/            # Header, Footer
    sections/          # blocos animados (CaveRoom, Reveal, AudioPlayer...)
    templates/         # views de página (HomeView, PageHero/SectionTitle)
    seo/               # JsonLd
    ui/                # shadcn/ui
  config/              # site.ts, navigation.ts, flyers.ts
  contexts/            # i18n-context (provider de dicionário por locale)
  features/            # integrações: shows (Bandsintown), music, social (Instagram)
  i18n/                # config + dicionários pt/en/es
  lib/                 # seo, fonts, utils, api/http
  providers/           # AppProviders
  styles/              # globals.css
  types/               # tipos compartilhados
public/assets/         # imagens e svgs versionados
```

## Internacionalização

- Locales: `pt` (padrão), `en`, `es`.
- O `middleware.ts` detecta o idioma (cookie / `Accept-Language`) e redireciona `/` para o locale apropriado.
- Os dicionários ficam em `src/i18n/{pt,en,es}.ts` e são tipados a partir de `pt`.

## Integrações (Tier 1 / Tier 2)

As integrações funcionam sem credenciais (Tier 1, via embeds/links) e ganham dados dinâmicos quando variáveis de ambiente são configuradas (Tier 2). Veja `.env.example`.

- **Bandsintown** (`features/shows`): widget oficial por padrão; lista nativa + JSON-LD `MusicEvent` quando `NEXT_PUBLIC_BANDSINTOWN_APP_ID` está definido.
- **Bandcamp + Spotify** (`features/music`): players embutidos.
- **Instagram** (`features/social`): bloco "seguir" por padrão; grade do feed quando `BEHOLD_FEED_ID` está definido (Behold.so).

## Flyers / Galeria

A página de Galeria (`/[locale]/gallery`) lista os flyers definidos em `src/config/flyers.ts`. Enquanto a lista estiver vazia, exibe placeholders. Para adicionar:

1. Coloque as imagens em `public/assets/images/flyers/`.
2. Preencha o array `FLYERS` em `src/config/flyers.ts` com `{ src, title, year }`.

## Deploy

Otimizado para Vercel. As variáveis do `.env.example` devem ser configuradas no painel do projeto. `NEXT_PUBLIC_SITE_URL` define a URL canônica usada em metadata, sitemap e robots.
