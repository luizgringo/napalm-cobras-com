
## Visão geral

Site institucional moderno da Napalm Cobras com identidade **Brutalist Punk** (preto #0a0a0a, off-white #f5f1e8, vermelho sangue #c8102e), trilíngue (PT-BR padrão, EN, ES), rotas em **inglês** para SEO global, animações com **framer-motion**, SSR via TanStack Start. Corrige o baterista para **Humberto Monteiro**.

## Estrutura de rotas (inglês, file-based)

```text
src/routes/
  __root.tsx              layout, header/footer, i18n provider, JSON-LD MusicGroup
  index.tsx               / — hero, último EP, próximos shows, teaser de integrantes
  band.tsx                /band — biografia + 3 integrantes (Humberto correto)
  music.tsx               /music — player Bandcamp + links de streaming
  shows.tsx               /shows — widget oficial Bandsintown + fallback SSR
  videos.tsx              /videos — show ao vivo "Metalpunk Overkill" em destaque
  gallery.tsx             /gallery — galeria curada de flyers
  press.tsx               /press — press release, rider técnico, mapa de palco, fotos
  contact.tsx             /contact — booking, redes, e-mail
```

Cada rota com `head()` próprio: title, description, og:title, og:description, og:url únicos. Canonical apenas nas folhas. JSON-LD apropriado por página.

## i18n (PT-BR / EN / ES)

- PT-BR sem prefixo (`/`, `/band`); EN em `/en/...`; ES em `/es/...`.
- Dicionário JSON em `src/i18n/{pt,en,es}.json` + hook `useT()` (sem libs externas).
- `<link rel="alternate" hreflang>` automático em todas as rotas.
- Seletor PT/EN/ES no header, preserva a rota atual.

## Sistema de design

- **Tokens** em `src/styles.css` (Tailwind v4 `@theme inline`): `--ink` #0a0a0a, `--paper` #f5f1e8, `--blood` #c8102e, `--smoke` #1a1a1a.
- **Fontes** via `<link>` no `__root.tsx`: Bebas Neue (display), JetBrains Mono (metadados), Inter (corpo).
- **Texturas**: overlay SVG de ruído xerox, bordas duras, faixas pretas tipo fita isolante.
- Sem gradiente. Foco vermelho-sangue visível para acessibilidade.

## Animações (framer-motion)

Instalo `framer-motion`. Padrões usados:
- Hero: `motion.h1` com stagger por palavra + slight tilt no hover.
- Seções: `whileInView` fade/slide on scroll com `viewport={{ once: true }}`.
- Cards de integrantes/flyers: hover com `scale` sutil + glitch CSS.
- Marquee horizontal infinito com `motion.div` animando `x`.
- Nav mobile: `AnimatePresence` para drawer.
- Page transitions leves no `<Outlet />` envolto por `AnimatePresence`.

Mantemos performático: animações curtas (200–400ms), `prefers-reduced-motion` respeitado.

## Integrações

- **Bandsintown:** script oficial carregado client-side só em `/shows` com `<artist-name>NAPALM COBRAS</artist-name>`. Fallback SSR caso o script falhe.
- **Bandcamp:** iframe oficial do EP "Homens Brancos de Terno" na home e em `/music`.
- **YouTube:** embed do show "Metalpunk Overkill" em `/videos` + cards linkando ao canal.
- **Streamings:** Spotify, YT Music, Deezer, Apple Music, Amazon Music, Bandcamp.
- **Instagram:** botão de "Follow" (sem feed embutido).

## Assets fornecidos

1. **Logo:** baixo de `https://www.napalmcobras.com/img/logo.svg`, salvo em `src/assets/logo.svg`.
2. **Foto do Humberto Monteiro:** baixo via Google Drive connector (file id `1DUWJF1imKeaVB9UiKIkzrvs7GHoCEjbG`) e salvo em `src/assets/members/humberto.jpg`. Se o connector falhar, peço pra você anexar.
3. **Flyers:** listo pasta `Flyers de Show` via Google Drive connector e baixo em lote pra `src/assets/flyers/`. Se algum falhar, fica placeholder.
4. **Fotos da banda (Instagram):** Instagram exige login/scraping não confiável. Vou usar generate_image com prompts fiéis à estética (3 caras, palco escuro, fumaça, vermelho) como placeholder e você substitui depois enviando aqui — ou eu pego das pastas `Fotos`/`Imagens` do Drive se estiverem acessíveis.
5. **Rider e mapa de palco:** baixo o Google Doc do rider (id `1PyI7vB5sun0wU7g3vfDW0s67fSDV5GgTvE1ScH8eDvc`) como PDF e a pasta `1UnYAN5rwPMq9bxZKw_7Uj6CxWwfE3btm` (mapa). Servidos em `/public` pra download direto em `/press`.
6. **Press release:** baixo o Google Doc (id `1IYFfpa9XEsZbaEbgr8806I3mC2R7b3goBi95DWUaEnQ`) e uso o texto como biografia oficial em `/band` e `/press`.

> Conecto o **Google Drive connector** para puxar 2–6. Se algum arquivo não estiver acessível, sigo com placeholder e te aviso com a lista do que faltou.

## SEO técnico

- Meta tags únicas por rota × 3 idiomas (`head()`).
- JSON-LD `MusicGroup` no `__root.tsx` (integrantes corretos, genre Metal Punk/Speedrock, foundingLocation Belo Horizonte BR, sameAs com redes/streamings).
- JSON-LD `MusicAlbum` em `/music`, `Event` (via Bandsintown) em `/shows`, `VideoObject` em `/videos`.
- `public/robots.txt` permitindo tudo + referência ao sitemap.
- `public/sitemap.xml` com todas as rotas × 3 idiomas.
- Imagens com `loading="lazy"`, alt descritivo em PT/EN/ES.
- Um `<h1>` por rota, headings semânticos.

## Componentes novos

`Header`, `Footer`, `LanguageSwitcher`, `NoiseOverlay`, `Marquee`, `BandsintownWidget`, `BandcampPlayer`, `YouTubeEmbed`, `FlyerGallery`, `MemberCard`, `StreamingLinks`, `MotionSection` (wrapper com `whileInView`).

## Detalhes técnicos

- **Stack:** TanStack Start, Tailwind v4, shadcn já presente.
- **Novas deps:** `framer-motion`.
- **Sem Lovable Cloud** (conteúdo estático; widgets carregam client-side).
- **Performance:** scripts terceiros só onde precisam, fontes com `display=swap`, `prefers-reduced-motion` honrado, imagens otimizadas.

## Ordem de implementação

1. Instalar `framer-motion`, conectar Google Drive, baixar logo e tentar baixar demais assets.
2. Tokens, fontes, overlay de ruído em `src/styles.css`.
3. i18n provider + dicionários PT/EN/ES + LanguageSwitcher.
4. `Header`/`Footer`/`MotionSection` + `__root.tsx` com JSON-LD.
5. `/` (home) com hero animado, EP, próximos shows, teaser de integrantes.
6. `/band` com biografia (do press release) e 3 integrantes (Humberto correto).
7. `/music` (Bandcamp + streamings).
8. `/shows` (Bandsintown).
9. `/videos` (show ao vivo em destaque).
10. `/gallery` (flyers ou placeholders).
11. `/press` (rider PDF, mapa, press release, fotos hi-res).
12. `/contact`.
13. SEO: sitemap.xml, robots.txt, hreflang em todas as rotas.
14. Traduções EN e ES espelhando PT-BR.

Aprovado? Implemento direto.
