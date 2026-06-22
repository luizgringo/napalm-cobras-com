/**
 * Central site configuration and release-credit data for Napalm Cobras.
 *
 * @remarks
 * This module exposes the global {@link SITE} object (band identity, social
 * links, discography, members, press kit and videos), the per-release credits
 * accessor {@link getReleaseCredits}, and the curated {@link BAND_LINKS} used
 * across the site. It is the single source of truth for static band metadata.
 */
import type { Locale } from "@/i18n/config";

/**
 * Global, immutable band configuration consumed throughout the site.
 *
 * @remarks
 * Groups together the band's core data:
 * - identity: `name`, `url`, `email`, `city`, `region`, `country`, `foundedYear`
 * - `socials`: canonical URLs for every social/streaming profile
 * - `follow`: ordered list of profiles surfaced in "follow" sections
 * - `bandsintown` / `spotify`: external integration ids
 * - `streaming`: where the album can be streamed/bought
 * - `album`: featured EP metadata, tracks and embed URLs
 * - `members`: current line-up with photos
 * - `press`: press-kit document and media folder links
 * - `liveVideoId` / `videos`: featured live video and video gallery
 * - `featuredTrackTitle` / `featuredTrackMeta`: highlighted track labels
 */
export const SITE = {
  name: "Napalm Cobras",
  url: "https://www.napalmcobras.com",
  email: "contato@napalmcobras.com",
  city: "Belo Horizonte",
  region: "Minas Gerais",
  country: "BR",
  foundedYear: "2021",
  socials: {
    instagram: "https://www.instagram.com/napalmcobras",
    bandcamp: "https://napalmcobras.bandcamp.com",
    youtube: "https://www.youtube.com/@napalmcobras",
    spotify: "https://open.spotify.com/intl-pt/album/3Cn3q1dhBmDmE8ctivbMLp",
    spotifyArtist: "https://open.spotify.com/intl-pt/artist/2VhEadXjwX0PoXKdbLpCs4",
    bandsintown: "https://www.bandsintown.com/a/15520612-napalm-cobras",
    soundcloud: "https://soundcloud.com/napalm-cobras",
    tiktok: "https://www.tiktok.com/@napalmcobras",
    twitter: "https://x.com/napalmcobras",
    youtubeMusic: "https://music.youtube.com/channel/UCF2Mv8hLf--Fc-HC4yUh6Dg",
    deezer: "https://www.deezer.com/br/artist/211367047",
    appleMusic: "https://music.apple.com/br/artist/napalm-cobras/1684328626",
    amazonMusic: "https://music.amazon.com.br/artists/B0C3DSM6PR/napalm-cobras",
    qobuz: "https://play.qobuz.com/artist/18217806",
    linktree: "https://linktr.ee/napalmcobras",
  },
  follow: [
    { name: "Instagram", key: "instagram" },
    { name: "SoundCloud", key: "soundcloud" },
    { name: "TikTok", key: "tiktok" },
    { name: "Spotify", key: "spotifyArtist" },
    { name: "Bandsintown", key: "bandsintown" },
    { name: "YouTube Music", key: "youtubeMusic" },
    { name: "Deezer", key: "deezer" },
    { name: "Apple Music", key: "appleMusic" },
    { name: "Amazon Music", key: "amazonMusic" },
  ],
  bandsintown: {
    artistId: "15520612",
    artistName: "Napalm Cobras",
  },
  spotify: {
    artistId: "2VhEadXjwX0PoXKdbLpCs4",
    albumId: "3Cn3q1dhBmDmE8ctivbMLp",
  },
  streaming: [
    { name: "Bandcamp", url: "https://napalmcobras.bandcamp.com/album/homens-brancos-de-terno" },
    { name: "Spotify", url: "https://open.spotify.com/intl-pt/album/3Cn3q1dhBmDmE8ctivbMLp" },
    {
      name: "YouTube Music",
      url: "https://music.youtube.com/playlist?list=OLAK5uy_kJ3P0GlMmL87X0hZFfMZD6OIiQU20CXhs",
    },
    { name: "Deezer", url: "https://www.deezer.com/br/album/434349037" },
    {
      name: "Apple Music",
      url: "https://music.apple.com/br/album/homens-brancos-de-terno-ep/1684330472",
    },
    { name: "Amazon Music", url: "https://music.amazon.com.br/albums/B0C3DV7FK7" },
    { name: "Qobuz", url: "https://play.qobuz.com/album/udtebi91720uc" },
  ],
  album: {
    title: "Homens Brancos de Terno",
    type: "EP",
    releaseDate: "2023-05-01",
    year: "2023",
    bandcampEmbed:
      "https://bandcamp.com/EmbeddedPlayer/album=2877232628/size=large/bgcol=181a1b/linkcol=c8102e/tracklist=false/transparent=true/",
    spotifyEmbed:
      "https://open.spotify.com/embed/album/3Cn3q1dhBmDmE8ctivbMLp?utm_source=generator&theme=0",
    tracks: [
      { title: "Homens Brancos de Terno", duration: "2:44" },
      { title: "Parei de Beber Socialmente", duration: "1:58" },
      { title: "Nada Pode Me Parar", duration: "2:44" },
      { title: "Esse blues não é sobre você", duration: "4:16" },
      { title: "Vertigem", duration: "2:05" },
    ],
  },
  members: [
    { name: "Uander Trajano", photo: "/assets/images/members/uander.jpg" },
    { name: "Luiz Gringo", photo: "/assets/images/members/gringo.jpg" },
    { name: "Humberto Monteiro", photo: "/assets/images/members/humberto.jpg" },
  ],
  press: {
    pressRelease:
      "https://docs.google.com/document/d/1IYFfpa9XEsZbaEbgr8806I3mC2R7b3goBi95DWUaEnQ/edit",
    rider: "https://docs.google.com/document/d/1PyI7vB5sun0wU7g3vfDW0s67fSDV5GgTvE1ScH8eDvc/edit",
    stageMap: "/assets/images/stage-map.png",
    mediaFolder: "https://drive.google.com/drive/folders/1NcOK4RjX4cmYaLv_olAA53qBo1YIqgpA",
  },
  liveVideoId: "O4TLQGISTR4",
  videos: [
    { id: "ltT2_slJc58", title: "The Hog (Muzarellas Cover)", kind: "clip" },
    { id: "wZnYoVtZcNg", title: "Ao Vivo em Ouro Preto", kind: "live" },
    { id: "3tqvq9YXd1k", title: "Parei de Beber Socialmente", kind: "clip" },
    { id: "lVqGJW4hIsE", title: "Parei de Beber Socialmente", kind: "session" },
    { id: "vk72NqSHeik", title: "Extinção", kind: "session" },
    { id: "LOOdxSr237M", title: "Longo Caminho Para Casa", kind: "clip" },
    { id: "PVD-WTHSrps", title: "Homens Brancos de Terno", kind: "clip" },
  ],
  featuredTrackTitle: "Homens Brancos de Terno",
  featuredTrackMeta: "EP · 5 faixas · 2023",
} as const;

/**
 * A labeled outbound link used in release credits and band link lists.
 */
export interface CreditLink {
  /** Human-readable text shown for the link. */
  label: string;
  /** Destination URL. */
  href: string;
}

/** Map of a localized string keyed by {@link Locale}. */
type LocalizedText = Record<Locale, string>;
/** Map of a localized list of strings keyed by {@link Locale}. */
type LocalizedList = Record<Locale, string[]>;

/**
 * Release credits stored with every supported locale, before resolution.
 */
interface LocalizedReleaseCredits {
  /** Localized prose describing the release. */
  description: LocalizedText;
  /** Localized bullet-point facts about the release. */
  facts: LocalizedList;
  /** Optional related links (studios, collaborators). */
  links?: CreditLink[];
}

/**
 * Release credits already resolved to a single locale for rendering.
 */
export interface ReleaseCredits {
  /** Prose describing the release in the requested locale. */
  description: string;
  /** Bullet-point facts about the release in the requested locale. */
  facts: string[];
  /** Optional related links (studios, collaborators). */
  links?: CreditLink[];
}

/** Per-release localized credits keyed by Spotify album/track id. */
const RELEASE_CREDITS: Record<string, LocalizedReleaseCredits> = {
  "3Cn3q1dhBmDmE8ctivbMLp": {
    description: {
      pt: 'No final de 2022, a Napalm Cobras gravou o seu primeiro EP, intitulado "Homens Brancos de Terno", no Estúdio Moai em Belo Horizonte, sob a supervisão de Fabricio Borges e Débora Coimbra. A mixagem ficou por conta do Felipe Sad, enquanto a masterização foi realizada por Joona Lukala, no estúdio Noise for Fiction em Tuulissuo, Lieto, na Finlândia.',
      en: 'In late 2022, Napalm Cobras recorded their debut EP, "Homens Brancos de Terno", at Estúdio Moai in Belo Horizonte, under the supervision of Fabricio Borges and Débora Coimbra. Mixing was handled by Felipe Sad, while mastering was done by Joona Lukala at the Noise for Fiction studio in Tuulissuo, Lieto, Finland.',
      es: 'A finales de 2022, Napalm Cobras grabó su primer EP, titulado "Homens Brancos de Terno", en el Estúdio Moai de Belo Horizonte, bajo la supervisión de Fabricio Borges y Débora Coimbra. La mezcla estuvo a cargo de Felipe Sad, mientras que la masterización fue realizada por Joona Lukala, en el estudio Noise for Fiction en Tuulissuo, Lieto, Finlandia.',
    },
    facts: {
      pt: [
        "Estúdio Moai — Belo Horizonte, 2022",
        "Supervisão: Fabricio Borges & Débora Coimbra",
        "Mixagem: Felipe Sad",
        "Masterização: Joona Lukala / Noise for Fiction (Finlândia)",
      ],
      en: [
        "Estúdio Moai — Belo Horizonte, 2022",
        "Supervision: Fabricio Borges & Débora Coimbra",
        "Mixing: Felipe Sad",
        "Mastering: Joona Lukala / Noise for Fiction (Finland)",
      ],
      es: [
        "Estúdio Moai — Belo Horizonte, 2022",
        "Supervisión: Fabricio Borges & Débora Coimbra",
        "Mezcla: Felipe Sad",
        "Masterización: Joona Lukala / Noise for Fiction (Finlandia)",
      ],
    },
    links: [
      { label: "Estúdio Moai", href: "https://www.instagram.com/estudiomoaibh/" },
      { label: "Débora Coimbra", href: "https://www.instagram.com/ddcoimbra/" },
      { label: "Felipe Sad", href: "https://www.instagram.com/felipesad/" },
      { label: "Joona Lukala", href: "https://www.instagram.com/joona_lukala/" },
      {
        label: "Noise for Fiction",
        href: "https://www.facebook.com/noiseforfictionaanitysstudio/",
      },
    ],
  },
  "1oON2uCjZrnaHiNhClDijT": {
    description: {
      pt: '"Longo Caminho Para Casa" foi inspirada numa aventura alcoólica do nosso grande amigo Pixixo, perdido nas terras longínquas de Contagem City! Gravada no complexo de estúdios Moai, conta com a participação mais que especial do maior artista mineiro em atividade: O Abelha. HEY HO PIXIXO!',
      en: '"Longo Caminho Para Casa" was inspired by a boozy adventure of our great friend Pixixo, lost in the faraway lands of Contagem City! Recorded at the Moai studio complex, it features the more than special guest appearance of the greatest active artist from Minas Gerais: O Abelha. HEY HO PIXIXO!',
      es: '"Longo Caminho Para Casa" fue inspirada en una aventura alcohólica de nuestro gran amigo Pixixo, perdido en las lejanas tierras de Contagem City! Grabada en el complejo de estudios Moai, cuenta con la participación más que especial del mayor artista de Minas Gerais en actividad: O Abelha. ¡HEY HO PIXIXO!',
    },
    facts: {
      pt: ["Estúdio Moai — Belo Horizonte", "Participação especial: O Abelha"],
      en: ["Estúdio Moai — Belo Horizonte", "Special guest: O Abelha"],
      es: ["Estúdio Moai — Belo Horizonte", "Invitado especial: O Abelha"],
    },
    links: [
      { label: "O Abelha", href: "https://www.instagram.com/oabelha_oficial/" },
      { label: "Pixixo", href: "https://www.instagram.com/pixixo/" },
    ],
  },
};

/**
 * Resolves the localized credits for a given release.
 *
 * @param albumId - Spotify album/track id used as the credits key.
 * @param locale - Locale to resolve the localized text and facts into.
 * @returns The credits for the requested locale, or `null` when no credits
 * exist for the given id.
 */
export function getReleaseCredits(albumId: string, locale: Locale): ReleaseCredits | null {
  const credits = RELEASE_CREDITS[albumId];
  if (!credits) {
    return null;
  }
  return {
    description: credits.description[locale],
    facts: credits.facts[locale],
    links: credits.links,
  };
}

/**
 * Curated list of partners, venues, bands and collaborators linked across the site.
 */
export const BAND_LINKS: CreditLink[] = [
  { label: "Festival de Inverno de Ouro Preto", href: "https://fiu.ufop.br/" },
  {
    label: "Trash Bar & Quengo Gastronomia",
    href: "https://www.instagram.com/trashequengo/",
  },
  {
    label: "Sagrada Escritura do Gueto",
    href: "https://www.instagram.com/sagradaescrituradogueto/",
  },
  { label: "Pixploitation Fest", href: "https://www.instagram.com/pixploitation_fest/" },
  { label: "Punho Cerrado Distro", href: "https://www.instagram.com/punho_cerrado_distro/" },
  { label: "Hardcore Superstars", href: "https://www.instagram.com/hardcoresuperstarofficial/" },
  { label: "Coletivo Bloco 31", href: "https://www.instagram.com/bloco31br/" },
  { label: "Metalpunk Overkill", href: "https://www.instagram.com/metalpunkoverkill/" },
  { label: "Usina de Cultura", href: "https://www.instagram.com/usinadecultura/" },
  { label: "Zumbis do Espaço", href: "https://www.instagram.com/zumbisdoespaco/" },
  { label: "Manger Cadavre?", href: "https://www.instagram.com/mangercadavre/" },
  { label: "Asfixia Social", href: "https://www.asfixiasocial.com/band" },
  { label: "Evil Syndicate", href: "https://www.instagram.com/evilsyndicateoficial/" },
  { label: "Evil Matchers", href: "https://www.instagram.com/evilmatchers/" },
  { label: "Lucas Chavo", href: "https://www.instagram.com/lucas.chavo/" },
  { label: "The Varukers", href: "https://pt.wikipedia.org/wiki/The_Varukers" },
  { label: "The Folsoms", href: "https://www.instagram.com/folsomsoficial/" },
  { label: "Estúdio MOAI", href: "https://www.instagram.com/estudiomoaibh/" },
  { label: "Estúdio Moai", href: "https://www.instagram.com/estudiomoaibh/" },
  { label: "Casa Matriz", href: "https://www.instagram.com/casamatrizbh/" },
  { label: "Encontracena", href: "https://www.instagram.com/encontracena/" },
  { label: "Muzzarelas", href: "https://www.instagram.com/muzzarelasoficial/" },
  { label: "Punk no Park", href: "https://www.instagram.com/punknopark/" },
  { label: "Felipe Sad", href: "https://www.instagram.com/felipesad/" },
  { label: "Joona Lukala", href: "https://www.metal-archives.com/artists/Joona_Lukala/131178" },
  { label: "Noise for Fiction", href: "https://www.facebook.com/noiseforfictionaanitysstudio/" },
  { label: "Dead Fish", href: "https://www.instagram.com/deadfishoficial/" },
  { label: "Drastiko", href: "https://www.instagram.com/drastiko_oficial_hardcore_bh/" },
  { label: "Zander", href: "https://www.instagram.com/zanderoficial/" },
  { label: "Master", href: "https://whiplash.net/bandas/m/master.html" },
  { label: "Witchhammer", href: "https://www.instagram.com/witchhammerbr/" },
  { label: "Sociedade Armada", href: "https://www.instagram.com/sociedadearmadahc/" },
  { label: "Estado de Fúria", href: "https://www.instagram.com/estadodefuriahc/" },
  { label: "Efecto", href: "https://www.instagram.com/efectobh/" },
  { label: "A Obra", href: "https://www.instagram.com/aobrabh/" },
  { label: "Glam Slam Party", href: "https://www.instagram.com/glamslamparty/" },
  { label: "Débora Coimbra", href: "https://www.instagram.com/ddcoimbra/" },
  { label: 'Humberto "Beto" Monteiro', href: "https://hasmonteiro.com/" },
];
