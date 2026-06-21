# Napalm Cobras

Site oficial da banda **Napalm Cobras** — Metalpunk de Belo Horizonte / MG.

Construído com **Next.js 16 (App Router)**, **React 19**, **TypeScript** estrito, **Tailwind CSS v4**, **Framer Motion** e **Biome**. Internacionalizado por URL (`/pt`, `/en`, `/es`) com renderização estática (SSG/ISR) para máxima performance e SEO.

- Produção: <https://www.napalmcobras.com>

## Sumário

- [Stack](#stack)
- [Requisitos](#requisitos)
- [Começando](#começando)
- [Scripts](#scripts)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Estrutura](#estrutura)
- [Rotas & páginas](#rotas--páginas)
- [Internacionalização](#internacionalização)
- [Integrações (Tier 1 / Tier 2)](#integrações-tier-1--tier-2)
- [Conteúdo & configuração](#conteúdo--configuração)
- [Homepage & Snake Mode](#homepage--snake-mode)
- [SEO](#seo)
- [Deploy](#deploy)

## Stack

- **Next.js 16** — App Router, SSG/ISR, `next/image`, `next/font`, `next/script`
- **React 19** + **TypeScript 5.8** (modo estrito)
- **Tailwind CSS v4** (`@tailwindcss/postcss`) + CSS Modules
- **Framer Motion** — animações (componente `Reveal`, salas da home, trilha da cobra)
- **shadcn/ui** + **Radix UI** — primitivos de UI acessíveis
- **react-icons** / **lucide-react** — ícones (incl. ícones de marca para streamings)
- **Biome** — lint e formatação (substitui ESLint + Prettier)
- **Husky** — git hooks
- **pnpm** — gerenciador de pacotes
- **Vercel** — deploy, **Analytics** e **Speed Insights**

## Requisitos

- **Node.js** 20+ (recomendado LTS)
- **pnpm** 9+ (`corepack enable` ativa o pnpm automaticamente)

## Começando

```bash
# 1. Instalar dependências
pnpm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# edite o .env conforme a seção "Variáveis de ambiente"

# 3. Ambiente de desenvolvimento
pnpm dev
# http://localhost:3000  (redireciona para o locale detectado, ex.: /pt)
```

## Scripts

```bash
pnpm dev      # ambiente de desenvolvimento
pnpm build    # build de produção (SSG/ISR)
pnpm start    # serve o build de produção
pnpm lint     # Biome check (lint + formatação, sem escrever)
pnpm format   # Biome check --write (formata e organiza imports)
```

## Variáveis de ambiente

Todas as integrações funcionam **sem credenciais** (Tier 1, via embeds/links) e ganham dados dinâmicos quando as variáveis abaixo são preenchidas (Tier 2). Use `.env.example` como base.

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Sim | URL canônica usada em metadata, Open Graph, sitemap e robots. |
| `NEXT_PUBLIC_BANDSINTOWN_APP_ID` | Não | App ID público do Bandsintown. Habilita a agenda nativa + JSON-LD `MusicEvent`. |
| `SPOTIFY_CLIENT_ID` | Não | Spotify Web API (Client Credentials) — dados de álbum/artista. |
| `SPOTIFY_CLIENT_SECRET` | Não | Segredo do Spotify Web API. **Nunca commitar.** |
| `BEHOLD_FEED_ID` | Não | ID do feed da [Behold.so](https://behold.so) para a grade do Instagram. |

> O arquivo `.env` (com segredos reais) está no `.gitignore` e não deve ser versionado. Em produção, configure as variáveis no painel da Vercel.

## Estrutura

```
src/
  app/                     # roteamento (App Router)
    [locale]/(site)/       # páginas localizadas + layout, template, error
      band | music | shows | videos | gallery | press | contact
      page.tsx             # home
    layout.tsx             # root (metadata, fonts, globals, providers)
    not-found.tsx
    sitemap.ts | robots.ts
  components/
    layout/                # Header, Footer
    sections/              # blocos animados (Reveal, CaveRoom, LinkGrid,
                           #   LinkedText, SnakeTrail, SnakeToggle, embeds...)
    templates/             # views de página (HomeView, PageHero/SectionTitle)
    site/                  # componentes específicos do site
    seo/                   # JsonLd
    ui/                    # shadcn/ui
  config/                  # site.ts, navigation.ts, flyers.ts, clipping.ts
  contexts/                # i18n-context (dicionário por locale)
  features/                # integrações por domínio:
    shows/                 #   Bandsintown
    music/                 #   Spotify Web API + embeds
    instagram/ social/     #   feed/seguir Instagram (Behold.so)
  i18n/                    # config + dicionários pt/en/es
  lib/                     # seo, fonts, utils, api/http, social-icons
  providers/               # AppProviders
  styles/                  # globals.css, primitives.module.css
  types/                   # tipos compartilhados
public/assets/             # imagens (membros, flyers, hero) e svgs
```

## Rotas & páginas

Todas as rotas são prefixadas pelo locale (`/[locale]/...`). Definição do menu em `src/config/navigation.ts`.

| Rota | Página | Conteúdo |
| --- | --- | --- |
| `/[locale]` | Home | Hero + "salas" animadas (Studio, Stage, Tour, Feed), Snake Mode. |
| `/[locale]/band` | Banda | Biografia, integrantes e timeline (com links inline via `LinkedText`). |
| `/[locale]/music` | Música | Lançamentos em destaque, players (Spotify), ficha técnica e streamings. |
| `/[locale]/shows` | Shows | Agenda (Bandsintown) e booking. |
| `/[locale]/videos` | Vídeos | Show ao vivo, clipes e registros. |
| `/[locale]/gallery` | Galeria | Flyers de shows (`config/flyers.ts`) com lightbox. |
| `/[locale]/press` | Imprensa | Press release, rider, mapa de palco e Clipping (`config/clipping.ts`). |
| `/[locale]/contact` | Contato | Booking, e-mail e grade de redes/streamings (`LinkGrid`). |

## Internacionalização

- Locales: `pt` (padrão), `en`, `es`.
- O `middleware.ts` detecta o idioma (cookie / `Accept-Language`) e redireciona `/` para o locale apropriado.
- Os dicionários ficam em `src/i18n/{pt,en,es}.ts` e são **tipados a partir de `pt`** — adicionar uma chave em `pt` torna obrigatório traduzi-la em `en` e `es` (erro de compilação caso contrário).

## Integrações (Tier 1 / Tier 2)

- **Bandsintown** (`features/shows`): widget oficial por padrão; agenda nativa + JSON-LD `MusicEvent` quando `NEXT_PUBLIC_BANDSINTOWN_APP_ID` está definido.
- **Spotify** (`features/music`): players embutidos sempre; metadados de álbum/artista via Web API quando `SPOTIFY_CLIENT_ID`/`SPOTIFY_CLIENT_SECRET` estão definidos (com lista curada de lançamentos como fallback).
- **Bandcamp**: players embutidos.
- **Instagram** (`features/instagram` / `features/social`): bloco "seguir" por padrão; grade do feed quando `BEHOLD_FEED_ID` está definido (Behold.so).

## Conteúdo & configuração

A maior parte do conteúdo é editável em arquivos de configuração tipados, sem mexer nos componentes:

- `src/config/site.ts` — dados centrais da banda: redes sociais, streamings, álbum/EP, integrantes, imprensa, créditos de lançamentos (`RELEASE_CREDITS`) e a lista de links inline (`BAND_LINKS`) usada pelo `LinkedText` na página `/band`.
- `src/config/flyers.ts` — flyers da galeria (`{ src, title, year, venue, lineup }`).
- `src/config/clipping.ts` — matérias/notícias da seção Clipping em `/press`.
- `src/config/navigation.ts` — itens do menu.
- `src/i18n/{pt,en,es}.ts` — todos os textos (incluindo bio e timeline da banda).

### Adicionar flyers à galeria

1. Coloque as imagens em `public/assets/images/flyers/`.
2. Acrescente o item ao array `FLYERS` em `src/config/flyers.ts`.

## Homepage & Snake Mode

A home é organizada em "salas" animadas (Studio, Stage, Tour, Feed) com `framer-motion`. O **Snake Mode** é uma trilha de cobra que segue o cursor.

- O site **inicia com o Snake Mode desligado (OFF)** por padrão.
- A preferência é persistida em `localStorage` (`SNAKE_STORAGE_KEY`): a trilha só aparece automaticamente se o visitante já tiver ativado antes.
- O usuário liga/desliga pelo botão `SnakeToggle` (canto da home).

## SEO

- Metadata por página e por locale (títulos, descrições, Open Graph) via `lib/seo`.
- `app/sitemap.ts` e `app/robots.ts` gerados a partir de `NEXT_PUBLIC_SITE_URL`.
- Dados estruturados JSON-LD (`components/seo/JsonLd`) — ex.: `MusicGroup` e `MusicEvent`.
- Imagens otimizadas com `next/image`; fontes com `next/font`.

## Deploy

Otimizado para **Vercel**. Configure as variáveis do `.env.example` no painel do projeto — em especial `NEXT_PUBLIC_SITE_URL`, que define a URL canônica usada em metadata, sitemap e robots. `@vercel/analytics` e `@vercel/speed-insights` já estão integrados.
