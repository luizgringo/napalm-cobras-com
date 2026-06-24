const SITE = {
  name: "Napalm Cobras",
  url: "https://www.napalmcobras.com",
  email: "contato@napalmcobras.com",
  city: "Belo Horizonte",
  region: "Minas Gerais",
  country: "Brasil",
  founded: 2021,
  genre: "Metalpunk",
};

const MEMBERS = {
  pt: [
    "Uander Trajano — vocais e baixo",
    'Luiz "Gringo" Bueno — guitarra e voz',
    'Humberto "Beto" Monteiro — bateria',
  ],
  en: [
    "Uander Trajano — vocals and bass",
    'Luiz "Gringo" Bueno — guitar and vocals',
    'Humberto "Beto" Monteiro — drums',
  ],
  es: [
    "Uander Trajano — voz y bajo",
    'Luiz "Gringo" Bueno — guitarra y voz',
    'Humberto "Beto" Monteiro — batería',
  ],
};

const DISCOGRAPHY = {
  pt: [
    "Ao Vivo No Metalpunk Overkill — álbum ao vivo · 2024",
    "Homens Brancos de Terno — EP · 2023 (5 faixas)",
    "Longo Caminho Para Casa — single · 2024",
    "The Hog — single · 2025",
  ],
  en: [
    "Ao Vivo No Metalpunk Overkill — live album · 2024",
    "Homens Brancos de Terno — EP · 2023 (5 tracks)",
    "Longo Caminho Para Casa — single · 2024",
    "The Hog — single · 2025",
  ],
  es: [
    "Ao Vivo No Metalpunk Overkill — álbum en vivo · 2024",
    "Homens Brancos de Terno — EP · 2023 (5 temas)",
    "Longo Caminho Para Casa — single · 2024",
    "The Hog — single · 2025",
  ],
};

const SOCIALS = [
  "Instagram: https://www.instagram.com/napalmcobras",
  "Bandcamp: https://napalmcobras.bandcamp.com",
  "YouTube: https://www.youtube.com/@napalmcobras",
  "Spotify: https://open.spotify.com/intl-pt/artist/2VhEadXjwX0PoXKdbLpCs4",
  "Bandsintown: https://www.bandsintown.com/a/15520612-napalm-cobras",
];

const SUMMARY_HEADING = {
  pt: "## Introduction",
  en: "## Overview",
  es: "## Introduction",
};

function list(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function section(heading, paragraph) {
  return `${heading}\n\n${paragraph}`;
}

function homeContent(locale) {
  const l = {
    pt: {
      summary:
        "Napalm Cobras é uma banda de Metalpunk de Belo Horizonte, fundada em 2021, com discos no Spotify, Bandcamp e YouTube.",
      what: section(
        "## O que é a Napalm Cobras?",
        "Napalm Cobras é uma banda de Metalpunk de Belo Horizonte, Minas Gerais, Brasil, fundada em 2021. A sonoridade combina a intensidade do metal com a urgência do punk em faixas rápidas, diretas e com letras de indignação e inquietação social.",
      ),
      where: section(
        "## De onde é a Napalm Cobras?",
        "Napalm Cobras nasceu em Belo Horizonte, Minas Gerais, em 2021, e atua no circuito underground de BH e Contagem. A banda já se apresentou na Casa Matriz, A Obra, Espaço Y, Usina de Cultura e Trash Bar & Quengo Gastronomia.",
      ),
      listen: section(
        "## Como ouvir a Napalm Cobras?",
        'Napalm Cobras publicou o EP "Homens Brancos de Terno" em 2023 com 5 faixas, disponível no Bandcamp, Spotify, Apple Music, Deezer e YouTube Music. O álbum ao vivo "Ao Vivo No Metalpunk Overkill" foi lançado em 2024 após show com Master (EUA).',
      ),
      contact: section(
        "## Como entrar em contato com a Napalm Cobras?",
        `Napalm Cobras recebe propostas de booking, imprensa e parcerias pelo e-mail ${SITE.email}. A agenda de shows futuros é sincronizada automaticamente na plataforma Bandsintown (artista ID 15520612).`,
      ),
      socials: "## Redes e streaming",
    },
    en: {
      summary:
        "Napalm Cobras is a Metalpunk band from Belo Horizonte, Brazil, formed in 2021, with releases on Spotify, Bandcamp and YouTube.",
      what: section(
        "## What is Napalm Cobras?",
        "Napalm Cobras is a Metalpunk band from Belo Horizonte, Minas Gerais, Brazil, formed in 2021. Their sound blends the weight of metal with the urgency of punk into fast, direct songs with lyrics about indignation and social unrest.",
      ),
      where: section(
        "## Where is Napalm Cobras from?",
        "Napalm Cobras was formed in Belo Horizonte, Minas Gerais, Brazil, in 2021, and plays the underground circuit in BH and Contagem. The band has performed at Casa Matriz, A Obra, Espaço Y, Usina de Cultura and Trash Bar & Quengo Gastronomia.",
      ),
      listen: section(
        "## How can I listen to Napalm Cobras?",
        'Napalm Cobras released the EP "Homens Brancos de Terno" in 2023 with 5 tracks, available on Bandcamp, Spotify, Apple Music, Deezer and YouTube Music. The live album "Ao Vivo No Metalpunk Overkill" came out in 2024 after a show with Master (USA).',
      ),
      contact: section(
        "## How do I contact Napalm Cobras?",
        `Napalm Cobras accepts booking, press and partnership inquiries at ${SITE.email}. Upcoming tour dates are synced automatically on Bandsintown (artist ID 15520612).`,
      ),
      socials: "## Streaming and social links",
    },
    es: {
      summary:
        "Napalm Cobras es una banda de Metalpunk de Belo Horizonte, Brasil, formada en 2021, con lanzamientos en Spotify, Bandcamp y YouTube.",
      what: section(
        "## ¿Qué es Napalm Cobras?",
        "Napalm Cobras es una banda de Metalpunk de Belo Horizonte, Minas Gerais, Brasil, formada en 2021. Su sonido fusiona el peso del metal con la urgencia del punk en canciones rápidas y directas con letras de indignación e inquietud social.",
      ),
      where: section(
        "## ¿De dónde es Napalm Cobras?",
        "Napalm Cobras se formó en Belo Horizonte, Minas Gerais, Brasil, en 2021, y actúa en el circuito underground de BH y Contagem. La banda tocó en Casa Matriz, A Obra, Espaço Y, Usina de Cultura y Trash Bar & Quengo Gastronomia.",
      ),
      listen: section(
        "## ¿Cómo escuchar a Napalm Cobras?",
        'Napalm Cobras lanzó el EP "Homens Brancos de Terno" en 2023 con 5 temas, disponible en Bandcamp, Spotify, Apple Music, Deezer y YouTube Music. El álbum en vivo "Ao Vivo No Metalpunk Overkill" salió en 2024 tras un show con Master (EE.UU.).',
      ),
      contact: section(
        "## ¿Cómo contactar a Napalm Cobras?",
        `Napalm Cobras recibe propuestas de booking, prensa y alianzas en ${SITE.email}. Las fechas futuras se sincronizan automáticamente en Bandsintown (artista ID 15520612).`,
      ),
      socials: "## Redes y streaming",
    },
  }[locale];

  return `${SUMMARY_HEADING[locale]}

${l.summary}

${l.what}

${l.where}

${l.listen}

${l.contact}

${l.socials}

${list(SOCIALS)}`;
}

function bandContent(locale) {
  const l = {
    pt: {
      summary:
        "Napalm Cobras é uma banda de Metalpunk de BH formada em 2021 por Uander Trajano, Luiz Gringo e Fred Souza, com EP de 2023 e álbum ao vivo de 2024.",
      intro: section(
        "## Quem é a Napalm Cobras?",
        'Napalm Cobras foi formada em 2021 em Belo Horizonte por Uander Trajano (ex-Drunk Demons, Evil Matchers), Luiz "Gringo" Bueno (ex-Evil Matchers, Crackodiles, Dead Goblins) e Fred Souza (ex-Fake). Em 2022, Lucas Chavo assumiu a bateria; em 2026, Humberto "Beto" Monteiro.',
      ),
      ep: section(
        "## Qual foi o primeiro lançamento?",
        'Napalm Cobras gravou o EP "Homens Brancos de Terno" no Estúdio Moai (BH) em 2022, com mixagem de Felipe Sad e masterização de Joona Lukala na Finlândia. O disco foi lançado em 2023 com 5 faixas e consolidou a energia ao vivo da banda.',
      ),
      live: "## Quais marcos ao vivo são relevantes?",
      members: "## Quem são os integrantes atuais?",
    },
    en: {
      summary:
        "Napalm Cobras is a Metalpunk band from BH formed in 2021 by Uander Trajano, Luiz Gringo and Fred Souza, with a 2023 EP and a 2024 live album.",
      intro: section(
        "## Who is Napalm Cobras?",
        'Napalm Cobras was formed in 2021 in Belo Horizonte by Uander Trajano (ex-Drunk Demons, Evil Matchers), Luiz "Gringo" Bueno (ex-Evil Matchers, Crackodiles, Dead Goblins) and Fred Souza (ex-Fake). Lucas Chavo joined on drums in 2022; Humberto "Beto" Monteiro in 2026.',
      ),
      ep: section(
        "## What was their first release?",
        'Napalm Cobras recorded the EP "Homens Brancos de Terno" at Estúdio Moai (BH) in 2022, mixed by Felipe Sad and mastered by Joona Lukala in Finland. The record was released in 2023 with 5 tracks and defined the band\'s live energy.',
      ),
      live: "## What are notable live milestones?",
      members: "## Who is in the current line-up?",
    },
    es: {
      summary:
        "Napalm Cobras es una banda de Metalpunk de BH formada en 2021 por Uander Trajano, Luiz Gringo y Fred Souza, con EP de 2023 y álbum en vivo de 2024.",
      intro: section(
        "## ¿Quién es Napalm Cobras?",
        'Napalm Cobras se formó en 2021 en Belo Horizonte por Uander Trajano (ex-Drunk Demons, Evil Matchers), Luiz "Gringo" Bueno (ex-Evil Matchers, Crackodiles, Dead Goblins) y Fred Souza (ex-Fake). Lucas Chavo en batería desde 2022; Humberto "Beto" Monteiro en 2026.',
      ),
      ep: section(
        "## ¿Cuál fue su primer lanzamiento?",
        'Napalm Cobras grabó el EP "Homens Brancos de Terno" en Estúdio Moai (BH) en 2022, mezclado por Felipe Sad y masterizado por Joona Lukala en Finlandia. El disco salió en 2023 con 5 temas y consolidó la energía en vivo de la banda.',
      ),
      live: "## ¿Cuáles son hitos en vivo relevantes?",
      members: "## ¿Quiénes integran la formación actual?",
    },
  }[locale];

  const milestones = [
    "2022: estreia na Casa Matriz (BH)",
    "2023: Festival de Inverno de Ouro Preto",
    "2024: Metalpunk Overkill com Master (EUA) — disco ao vivo",
    '2025: videoclipe "The Hog" (homenagem a Muzzarelas)',
    "2026: palco com The Varukers (Punk no Park, BH)",
  ];
  const milestonesEn = [
    "2022: debut at Casa Matriz (BH)",
    "2023: Ouro Preto Winter Festival",
    "2024: Metalpunk Overkill with Master (USA) — live album",
    '2025: "The Hog" music video (Muzzarelas tribute)',
    "2026: shared stage with The Varukers (Punk no Park, BH)",
  ];
  const milestonesEs = [
    "2022: debut en Casa Matriz (BH)",
    "2023: Festival de Invierno de Ouro Preto",
    "2024: Metalpunk Overkill con Master (EE.UU.) — disco en vivo",
    '2025: videoclip "The Hog" (homenaje a Muzzarelas)',
    "2026: escenario con The Varukers (Punk no Park, BH)",
  ];
  const milestoneList =
    locale === "en" ? milestonesEn : locale === "es" ? milestonesEs : milestones;

  return `${SUMMARY_HEADING[locale]}

${l.summary}

${l.intro}

${l.ep}

${l.live}

${list(milestoneList)}

${l.members}

${list(MEMBERS[locale])}`;
}

function musicContent(locale) {
  const l = {
    pt: {
      summary:
        'Napalm Cobras tem EP "Homens Brancos de Terno" (2023), single "Longo Caminho Para Casa" (2024), álbum ao vivo (2024) e single "The Hog" (2025) em todas as plataformas.',
      listen: section(
        "## Onde ouvir a Napalm Cobras?",
        "Napalm Cobras distribui sua discografia no Bandcamp, Spotify, Apple Music, Deezer, YouTube Music, Amazon Music, Tidal e Qobuz. O EP de estreia de 2023 e o álbum ao vivo de 2024 estão disponíveis para streaming e download.",
      ),
      disc: section(
        "## Qual é a discografia?",
        "Napalm Cobras lançou 4 registros principais entre 2023 e 2025: o EP Homens Brancos de Terno (2023), o single Longo Caminho Para Casa (2024), o álbum Ao Vivo No Metalpunk Overkill (2024) e o single The Hog (2025).",
      ),
      tracks: `## Quais faixas estão no EP "Homens Brancos de Terno"?`,
    },
    en: {
      summary:
        'Napalm Cobras has the EP "Homens Brancos de Terno" (2023), single "Longo Caminho Para Casa" (2024), live album (2024) and single "The Hog" (2025) on all platforms.',
      listen: section(
        "## Where can I listen to Napalm Cobras?",
        "Napalm Cobras distributes its discography on Bandcamp, Spotify, Apple Music, Deezer, YouTube Music, Amazon Music, Tidal and Qobuz. The 2023 debut EP and the 2024 live album are available for streaming and download.",
      ),
      disc: section(
        "## What is the discography?",
        "Napalm Cobras released 4 main records between 2023 and 2025: the EP Homens Brancos de Terno (2023), the single Longo Caminho Para Casa (2024), the album Ao Vivo No Metalpunk Overkill (2024) and the single The Hog (2025).",
      ),
      tracks: `## Which tracks are on the EP "Homens Brancos de Terno"?`,
    },
    es: {
      summary:
        'Napalm Cobras tiene el EP "Homens Brancos de Terno" (2023), single "Longo Caminho Para Casa" (2024), álbum en vivo (2024) y single "The Hog" (2025) en todas las plataformas.',
      listen: section(
        "## ¿Dónde escuchar a Napalm Cobras?",
        "Napalm Cobras distribuye su discografía en Bandcamp, Spotify, Apple Music, Deezer, YouTube Music, Amazon Music, Tidal y Qobuz. El EP debut de 2023 y el álbum en vivo de 2024 están disponibles para streaming y descarga.",
      ),
      disc: section(
        "## ¿Cuál es la discografía?",
        "Napalm Cobras lanzó 4 registros principales entre 2023 y 2025: el EP Homens Brancos de Terno (2023), el single Longo Caminho Para Casa (2024), el álbum Ao Vivo No Metalpunk Overkill (2024) y el single The Hog (2025).",
      ),
      tracks: `## ¿Qué temas incluye el EP "Homens Brancos de Terno"?`,
    },
  }[locale];

  const tracks = [
    "Homens Brancos de Terno (2:44)",
    "Parei de Beber Socialmente (1:58)",
    "Nada Pode Me Parar (2:44)",
    "Esse blues não é sobre você (4:16)",
    "Vertigem (2:05)",
  ];

  return `${SUMMARY_HEADING[locale]}

${l.summary}

${l.listen}

${list(SOCIALS)}

${l.disc}

${list(DISCOGRAPHY[locale])}

${l.tracks}

${tracks.map((track, index) => `${index + 1}. ${track}`).join("\n")}`;
}

function showsContent(locale) {
  const l = {
    pt: {
      summary:
        "Napalm Cobras publica agenda de shows no Bandsintown e aceita booking pelo e-mail contato@napalmcobras.com.",
      dates: section(
        "## Onde ver a agenda de shows?",
        "Napalm Cobras publica datas futuras na plataforma Bandsintown (artista ID 15520612), com links diretos para compra de ingressos quando disponíveis. Para contratação e booking de shows, envie proposta para contato@napalmcobras.com.",
      ),
      festivals: section(
        "## Quais festivais a banda já participou?",
        "Napalm Cobras já tocou no Festival de Inverno de Ouro Preto (2023), Metalpunk Overkill (2024), Punk no Park (2024–2026), Pixploitation Fest (2025–2026) e Cadeia Rock Fest na Usina de Cultura (2025).",
      ),
      list: "## Principais festivais e eventos",
    },
    en: {
      summary:
        "Napalm Cobras publishes show dates on Bandsintown and accepts bookings at contato@napalmcobras.com.",
      dates: section(
        "## Where can I find show dates?",
        "Napalm Cobras lists upcoming dates on Bandsintown (artist ID 15520612), with direct ticket links when available. For show bookings and hire requests, send proposals to contato@napalmcobras.com.",
      ),
      festivals: section(
        "## Which festivals has the band played?",
        "Napalm Cobras has played the Ouro Preto Winter Festival (2023), Metalpunk Overkill (2024), Punk no Park (2024–2026), Pixploitation Fest (2025–2026) and Cadeia Rock Fest at Usina de Cultura (2025).",
      ),
      list: "## Key festivals and events",
    },
    es: {
      summary:
        "Napalm Cobras publica fechas en Bandsintown y acepta booking en contato@napalmcobras.com.",
      dates: section(
        "## ¿Dónde ver la agenda de conciertos?",
        "Napalm Cobras publica fechas futuras en Bandsintown (artista ID 15520612), con enlaces directos para comprar entradas cuando están disponibles. Para contratación de shows, envía propuestas a contato@napalmcobras.com.",
      ),
      festivals: section(
        "## ¿En qué festivales ha tocado la banda?",
        "Napalm Cobras tocó en el Festival de Invierno de Ouro Preto (2023), Metalpunk Overkill (2024), Punk no Park (2024–2026), Pixploitation Fest (2025–2026) y Cadeia Rock Fest en Usina de Cultura (2025).",
      ),
      list: "## Principales festivales y eventos",
    },
  }[locale];

  const events = [
    "Festival de Inverno de Ouro Preto — 2023",
    "Metalpunk Overkill com Master (EUA) — 2024",
    "Punk no Park — 2024, 2025 e 2026",
    "Pixploitation Fest — 2025 e 2026",
    "Cadeia Rock Fest, Usina de Cultura — 2025",
  ];
  const eventsEn = [
    "Ouro Preto Winter Festival — 2023",
    "Metalpunk Overkill with Master (USA) — 2024",
    "Punk no Park — 2024, 2025 and 2026",
    "Pixploitation Fest — 2025 and 2026",
    "Cadeia Rock Fest, Usina de Cultura — 2025",
  ];
  const eventsEs = [
    "Festival de Invierno de Ouro Preto — 2023",
    "Metalpunk Overkill con Master (EE.UU.) — 2024",
    "Punk no Park — 2024, 2025 y 2026",
    "Pixploitation Fest — 2025 y 2026",
    "Cadeia Rock Fest, Usina de Cultura — 2025",
  ];
  const eventList = locale === "en" ? eventsEn : locale === "es" ? eventsEs : events;

  return `${SUMMARY_HEADING[locale]}

${l.summary}

${l.dates}

${l.festivals}

${l.list}

${list(eventList)}`;
}

function videosContent(locale) {
  const l = {
    pt: {
      summary:
        "Napalm Cobras publica clipes e shows ao vivo no YouTube, com destaque para o set do Metalpunk Overkill 2024 filmado pela Goblin TV.",
      watch: section(
        "## Onde assistir vídeos da Napalm Cobras?",
        "Napalm Cobras mantém canal oficial no YouTube em youtube.com/@napalmcobras com clipes, sessões acústicas e registros de shows completos. Os vídeos também são compartilhados no Instagram e nas redes da banda.",
      ),
      featured: section(
        "## Qual é o vídeo ao vivo em destaque?",
        'Napalm Cobras gravou o set "Metalpunk Overkill — show ao vivo" em 2024, filmado pela Goblin TV ao lado da banda Master (EUA). O vídeo completo está no YouTube com ID O4TLQGISTR4.',
      ),
      clips: "## Quais clipes estão disponíveis?",
    },
    en: {
      summary:
        "Napalm Cobras publishes clips and live sets on YouTube, featuring the Metalpunk Overkill 2024 set filmed by Goblin TV.",
      watch: section(
        "## Where can I watch Napalm Cobras videos?",
        "Napalm Cobras runs an official YouTube channel at youtube.com/@napalmcobras with music videos, acoustic sessions and full live sets. Videos are also shared on Instagram and the band's social profiles.",
      ),
      featured: section(
        "## What is the featured live video?",
        'Napalm Cobras recorded the set "Metalpunk Overkill — live" in 2024, filmed by Goblin TV sharing the stage with Master (USA). The full video is on YouTube with ID O4TLQGISTR4.',
      ),
      clips: "## Which music videos are available?",
    },
    es: {
      summary:
        "Napalm Cobras publica clips y shows en vivo en YouTube, con destaque para el set de Metalpunk Overkill 2024 filmado por Goblin TV.",
      watch: section(
        "## ¿Dónde ver videos de Napalm Cobras?",
        "Napalm Cobras mantiene canal oficial en YouTube en youtube.com/@napalmcobras con videoclips, sesiones acústicas y shows completos. Los videos también se comparten en Instagram y las redes de la banda.",
      ),
      featured: section(
        "## ¿Cuál es el video en vivo destacado?",
        'Napalm Cobras grabó el set "Metalpunk Overkill — show en vivo" en 2024, filmado por Goblin TV junto a Master (EE.UU.). El video completo está en YouTube con ID O4TLQGISTR4.',
      ),
      clips: "## ¿Qué videoclips hay disponibles?",
    },
  }[locale];

  const clips = [
    "The Hog (cover Muzzarelas, 2025)",
    "Parei de Beber Socialmente (clipe e sessão Encontracena)",
    "Longo Caminho Para Casa (2024)",
    "Homens Brancos de Terno (clipe oficial)",
  ];
  const clipsEn = [
    "The Hog (Muzzarelas cover, 2025)",
    "Parei de Beber Socialmente (official clip and Encontracena session)",
    "Longo Caminho Para Casa (2024)",
    "Homens Brancos de Terno (official clip)",
  ];
  const clipsEs = [
    "The Hog (cover de Muzzarelas, 2025)",
    "Parei de Beber Socialmente (clip y sesión Encontracena)",
    "Longo Caminho Para Casa (2024)",
    "Homens Brancos de Terno (clip oficial)",
  ];
  const clipList = locale === "en" ? clipsEn : locale === "es" ? clipsEs : clips;

  return `${SUMMARY_HEADING[locale]}

${l.summary}

${l.watch}

${l.featured}

${l.clips}

${list(clipList)}`;
}

function galleryContent(locale) {
  const l = {
    pt: {
      summary:
        "Napalm Cobras mantém galeria de flyers e fotos de shows em Belo Horizonte, Contagem e turnês fora de Minas Gerais.",
      about: section(
        "## O que há na galeria da Napalm Cobras?",
        "Napalm Cobras reúne flyers, cartazes e fotos de shows em Belo Horizonte, Contagem e cidades como Curitiba e Ouro Preto. O acervo documenta o circuito Metalpunk, Punk no Park e festivais independentes de 2022 a 2026.",
      ),
      usage: section(
        "## Como promotores e a mídia podem usar a galeria?",
        "Napalm Cobras permite que promotores e veículos de mídia referenciem flyers e fotos da galeria com crédito à banda e aos fotógrafos. Para downloads em alta resolução e permissões, contate contato@napalmcobras.com ou acesse a página de imprensa com a pasta de mídia de 2024.",
      ),
      items: "## O que você encontra na galeria",
    },
    en: {
      summary:
        "Napalm Cobras maintains a gallery of flyers and show photos from Belo Horizonte, Contagem and tours outside Minas Gerais.",
      about: section(
        "## What is in the Napalm Cobras gallery?",
        "Napalm Cobras collects flyers, posters and show photos from Belo Horizonte, Contagem and cities such as Curitiba and Ouro Preto. The archive documents the Metalpunk circuit, Punk no Park and independent festivals from 2022 to 2026.",
      ),
      usage: section(
        "## How can promoters and media use the gallery?",
        "Napalm Cobras allows promoters and media outlets to reference gallery flyers and photos with proper credit to the band and photographers. For high-resolution downloads and permissions, contact contato@napalmcobras.com or visit the press page for the 2024 media folder.",
      ),
      items: "## What you will find in the gallery",
    },
    es: {
      summary:
        "Napalm Cobras mantiene galería de flyers y fotos de shows en Belo Horizonte, Contagem y giras fuera de Minas Gerais.",
      about: section(
        "## ¿Qué hay en la galería de Napalm Cobras?",
        "Napalm Cobras reúne flyers, carteles y fotos de shows en Belo Horizonte, Contagem y ciudades como Curitiba y Ouro Preto. El archivo documenta el circuito Metalpunk, Punk no Park y festivales independientes de 2022 a 2026.",
      ),
      usage: section(
        "## ¿Cómo pueden usar la galería promotores y medios?",
        "Napalm Cobras permite que promotores y medios referencien flyers y fotos de la galería con crédito a la banda y a los fotógrafos. Para descargas en alta resolución y permisos, contacta contato@napalmcobras.com o visita la página de prensa con la carpeta de medios de 2024.",
      ),
      items: "## Qué encontrarás en la galería",
    },
  }[locale];

  const items = [
    "Flyers de shows em BH, Contagem e Curitiba",
    "Registros do Metalpunk Overkill 2024",
    "Material do Punk no Park e Pixploitation Fest",
    "Fotos de palcos, bastidores e público",
  ];
  const itemsEn = [
    "Show flyers from BH, Contagem and Curitiba",
    "Metalpunk Overkill 2024 material",
    "Punk no Park and Pixploitation Fest assets",
    "Stage, backstage and crowd photos",
  ];
  const itemsEs = [
    "Flyers de shows en BH, Contagem y Curitiba",
    "Material de Metalpunk Overkill 2024",
    "Assets de Punk no Park y Pixploitation Fest",
    "Fotos de escenario, backstage y público",
  ];
  const itemList = locale === "en" ? itemsEn : locale === "es" ? itemsEs : items;

  return `${SUMMARY_HEADING[locale]}

${l.summary}

${l.about}

${l.usage}

${l.items}

${list(itemList)}`;
}

function pressContent(locale) {
  const l = {
    pt: {
      summary:
        "Napalm Cobras oferece press kit com release, rider técnico, mapa de palco e pasta de mídia para jornalistas e promotores.",
      kit: section(
        "## Onde encontrar o press kit da Napalm Cobras?",
        "Napalm Cobras disponibiliza press release, rider técnico, mapa de palco e pasta de fotos na página de imprensa do site, com material atualizado desde a formação em 2021 e o lançamento do EP de 2023. Para solicitações adicionais, contate contato@napalmcobras.com.",
      ),
      materials: section(
        "## Que materiais estão disponíveis para a mídia?",
        "Napalm Cobras disponibiliza fotos em alta resolução, biografia oficial e documentos técnicos para jornalistas que cobrem a banda desde 2021, incluindo material do EP de 2023 e do álbum ao vivo de 2024.",
      ),
      materialsList: "## Lista de materiais",
    },
    en: {
      summary:
        "Napalm Cobras offers a press kit with release, technical rider, stage plot and media folder for journalists and promoters.",
      kit: section(
        "## Where is the Napalm Cobras press kit?",
        "Napalm Cobras provides a press release, technical rider, stage plot and photo folder on the press page of the website, with assets updated since the band formed in 2021 and the 2023 EP release. For additional requests, contact contato@napalmcobras.com.",
      ),
      materials: section(
        "## What media assets are available?",
        "Napalm Cobras provides high-resolution photos, official biographies and technical documents for journalists covering the band since 2021, including assets from the 2023 EP and the 2024 live album release.",
      ),
      materialsList: "## Materials list",
    },
    es: {
      summary:
        "Napalm Cobras ofrece press kit con release, rider técnico, plano de escenario y carpeta de medios para periodistas y promotores.",
      kit: section(
        "## ¿Dónde está el press kit de Napalm Cobras?",
        "Napalm Cobras ofrece press release, rider técnico, plano de escenario y carpeta de fotos en la página de prensa del sitio, con material actualizado desde la formación en 2021 y el EP de 2023. Para solicitudes adicionales, contacta contato@napalmcobras.com.",
      ),
      materials: section(
        "## ¿Qué materiales hay para medios?",
        "Napalm Cobras ofrece fotos en alta resolución, biografía oficial y documentos técnicos para periodistas que cubren la banda desde 2021, incluyendo material del EP de 2023 y del álbum en vivo de 2024.",
      ),
      materialsList: "## Lista de materiales",
    },
  }[locale];

  const materials = [
    "Press release oficial (Google Docs)",
    "Rider técnico completo",
    "Mapa de palco / stage plot",
    "Pasta de fotos e assets para download",
  ];
  const materialsEn = [
    "Official press release (Google Docs)",
    "Full technical rider",
    "Stage plot",
    "Photo and asset download folder",
  ];
  const materialsEs = [
    "Press release oficial (Google Docs)",
    "Rider técnico completo",
    "Plano de escenario",
    "Carpeta de fotos y assets para descarga",
  ];
  const materialList = locale === "en" ? materialsEn : locale === "es" ? materialsEs : materials;

  return `${SUMMARY_HEADING[locale]}

${l.summary}

${l.kit}

${l.materials}

${l.materialsList}

${list(materialList)}`;
}

function contactContent(locale) {
  const l = {
    pt: {
      summary:
        "Napalm Cobras atende booking, imprensa e parcerias pelo e-mail contato@napalmcobras.com e pelo Instagram @napalmcobras.",
      how: section(
        "## Como entrar em contato com a Napalm Cobras?",
        "Napalm Cobras responde propostas de booking, imprensa e colaborações pelo e-mail contato@napalmcobras.com e pelo direct no Instagram @napalmcobras. O site oficial napalmcobras.com está ativo desde 2021, ano da formação da banda em Belo Horizonte.",
      ),
      booking: section(
        "## Como contratar a Napalm Cobras para um show?",
        "Napalm Cobras aceita propostas de booking para festivais e casas de show em Minas Gerais e outras regiões do Brasil, com agenda ativa desde 2022 e apresentações recorrentes entre 2023 e 2025. Envie proposta para contato@napalmcobras.com ou consulte o Bandsintown (artista ID 15520612).",
      ),
      press: section(
        "## Como solicitar entrevista ou material de imprensa?",
        "Napalm Cobras atende jornalistas e veículos de mídia com press release, fotos em alta resolução e rider técnico revisado em 2025. Solicitações de entrevista para rádio, TV ou podcasts devem incluir pauta, prazo e veículo, enviadas para contato@napalmcobras.com.",
      ),
      purpose: "## Para que serve o contato?",
    },
    en: {
      summary:
        "Napalm Cobras handles bookings, press and partnerships at contato@napalmcobras.com and on Instagram @napalmcobras.",
      how: section(
        "## How do I contact Napalm Cobras?",
        "Napalm Cobras answers booking, press and collaboration proposals at contato@napalmcobras.com and via Instagram DM at @napalmcobras. The official website napalmcobras.com has been live since 2021, when the band formed in Belo Horizonte.",
      ),
      booking: section(
        "## How do I book Napalm Cobras for a show?",
        "Napalm Cobras accepts booking proposals for festivals and venues in Minas Gerais and across Brazil, with an active schedule since 2022 and recurring shows between 2023 and 2025. Send proposals to contato@napalmcobras.com or check Bandsintown (artist ID 15520612).",
      ),
      press: section(
        "## How do I request a press interview or media assets?",
        "Napalm Cobras supports journalists and media outlets with press releases, high-resolution photos and a technical rider updated in 2025. Interview requests for radio, TV or podcasts should include topic, deadline and outlet, sent to contato@napalmcobras.com.",
      ),
      purpose: "## What is the contact for?",
    },
    es: {
      summary:
        "Napalm Cobras atiende booking, prensa y alianzas en contato@napalmcobras.com e Instagram @napalmcobras.",
      how: section(
        "## ¿Cómo contactar a Napalm Cobras?",
        "Napalm Cobras responde propuestas de booking, prensa y colaboraciones en contato@napalmcobras.com y por mensaje directo en Instagram @napalmcobras. El sitio oficial napalmcobras.com está activo desde 2021, año de la formación de la banda en Belo Horizonte.",
      ),
      booking: section(
        "## ¿Cómo contratar a Napalm Cobras para un show?",
        "Napalm Cobras acepta propuestas de booking para festivales y locales en Minas Gerais y otras regiones de Brasil, con agenda activa desde 2022 y shows recurrentes entre 2023 y 2025. Envía propuestas a contato@napalmcobras.com o consulta Bandsintown (artista ID 15520612).",
      ),
      press: section(
        "## ¿Cómo solicitar entrevista o material de prensa?",
        "Napalm Cobras atiende a periodistas y medios con press release, fotos en alta resolución y rider técnico actualizado en 2025. Las solicitudes de entrevista para radio, TV o podcasts deben incluir tema, plazo y medio, enviadas a contato@napalmcobras.com.",
      ),
      purpose: "## ¿Para qué sirve el contacto?",
    },
  }[locale];

  const purposes = [
    "Booking e contratação de shows",
    "Imprensa, entrevistas e cobertura",
    "Parcerias, festivais e colaborações",
  ];
  const purposesEn = [
    "Show bookings and hire requests",
    "Press, interviews and media coverage",
    "Partnerships, festivals and collaborations",
  ];
  const purposesEs = [
    "Booking y contratación de shows",
    "Prensa, entrevistas y cobertura",
    "Alianzas, festivales y colaboraciones",
  ];
  const purposeList = locale === "en" ? purposesEn : locale === "es" ? purposesEs : purposes;

  return `${SUMMARY_HEADING[locale]}

${l.summary}

${l.how}

${l.booking}

${l.press}

${l.purpose}

${list(purposeList)}`;
}

const ROUTE_CONTENT = {
  "": homeContent,
  band: bandContent,
  music: musicContent,
  shows: showsContent,
  videos: videosContent,
  gallery: galleryContent,
  press: pressContent,
  contact: contactContent,
};

const PAGE_META = {
  "": {
    pt: {
      title: "Napalm Cobras — Metalpunk de Belo Horizonte",
      description:
        "Banda de Metalpunk formada em Belo Horizonte em 2021. Ouça o EP Homens Brancos de Terno e veja os próximos shows.",
    },
    en: {
      title: "Napalm Cobras — Metalpunk from Belo Horizonte",
      description:
        'Metalpunk band formed in Belo Horizonte in 2021. Listen to the EP "Homens Brancos de Terno" and catch us live.',
    },
    es: {
      title: "Napalm Cobras — Metalpunk de Belo Horizonte",
      description:
        "Banda de Metalpunk formada en Belo Horizonte en 2021. Escuchá el EP Homens Brancos de Terno y mirá los próximos shows.",
    },
  },
  band: {
    pt: {
      title: "Banda",
      description: "Conheça a Napalm Cobras — formação, história e identidade.",
    },
    en: { title: "Band", description: "Meet Napalm Cobras — line-up, history and identity." },
    es: {
      title: "Banda",
      description: "Conocé a Napalm Cobras — formación, historia e identidad.",
    },
  },
  music: {
    pt: {
      title: "Música",
      description: "Discografia, streaming e fichas técnicas da Napalm Cobras.",
    },
    en: {
      title: "Music",
      description: "Discography, streaming links and credits for Napalm Cobras.",
    },
    es: {
      title: "Música",
      description: "Discografía, streaming y fichas técnicas de Napalm Cobras.",
    },
  },
  shows: {
    pt: { title: "Shows", description: "Próximos shows e agenda da Napalm Cobras." },
    en: { title: "Shows", description: "Upcoming shows and tour dates for Napalm Cobras." },
    es: { title: "Conciertos", description: "Próximos conciertos y agenda de Napalm Cobras." },
  },
  videos: {
    pt: { title: "Vídeos", description: "Clipes e registros ao vivo da Napalm Cobras." },
    en: { title: "Videos", description: "Music videos and live recordings from Napalm Cobras." },
    es: { title: "Videos", description: "Videos y registros en vivo de Napalm Cobras." },
  },
  gallery: {
    pt: { title: "Galeria", description: "Flyers e fotos de shows da Napalm Cobras." },
    en: { title: "Gallery", description: "Show flyers and photos from Napalm Cobras." },
    es: { title: "Galería", description: "Flyers y fotos de shows de Napalm Cobras." },
  },
  press: {
    pt: { title: "Imprensa", description: "Press kit, rider técnico e clipping da Napalm Cobras." },
    en: {
      title: "Press",
      description: "Press kit, technical rider and media coverage for Napalm Cobras.",
    },
    es: { title: "Prensa", description: "Press kit, rider técnico y clipping de Napalm Cobras." },
  },
  contact: {
    pt: {
      title: "Contato",
      description: "Entre em contato com a Napalm Cobras para shows e imprensa.",
    },
    en: { title: "Contact", description: "Contact Napalm Cobras for bookings and press." },
    es: { title: "Contacto", description: "Contactá a Napalm Cobras para shows y prensa." },
  },
};

const LOCALES = ["pt", "en", "es"];
const ROUTES = ["", "band", "music", "shows", "videos", "gallery", "press", "contact"];

export function buildAeoPages() {
  const pages = [];

  for (const locale of LOCALES) {
    for (const route of ROUTES) {
      const pathname = route ? `/${locale}/${route}` : `/${locale}`;
      const meta = PAGE_META[route][locale];
      const contentFn = ROUTE_CONTENT[route];

      pages.push({
        pathname,
        title: meta.title,
        description: meta.description,
        content: contentFn(locale),
      });
    }
  }

  return pages;
}
