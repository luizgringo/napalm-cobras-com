/**
 * Brazilian Portuguese (pt) translation dictionary for the Napalm Cobras website.
 *
 * @remarks
 * This is the canonical/base dictionary: its shape defines the {@link Lang}
 * type that all other locales must conform to. Keys are grouped by site area.
 */

/**
 * Brazilian Portuguese translations, grouped by site area.
 */
export const pt = {
  /** Navigation menu labels. */
  nav: {
    home: "Início",
    band: "Banda",
    music: "Música",
    shows: "Shows",
    videos: "Vídeos",
    gallery: "Galeria",
    press: "Imprensa",
    contact: "Contato",
  },
  /** SEO/meta strings: site name, tagline and home page title/description. */
  meta: {
    siteName: "Napalm Cobras",
    tagline: "Metalpunk de Belo Horizonte",
    homeTitle: "Napalm Cobras — Metalpunk de Belo Horizonte",
    homeDesc:
      'Banda de Metalpunk formada em Belo Horizonte em 2021. Ouça o EP "Homens Brancos de Terno" e veja os próximos shows.',
  },
  /** Home page copy: hero, CTAs and the studio/stage/tour/feed rooms. */
  home: {
    eyebrow: "Belo Horizonte / Brasil — desde 2021",
    heroLine1: "Napalm",
    heroLine2: "Cobras",
    heroSub: "𖤐 BH • MG • BR 𖤐 Sometimes Metal, sometimes Punk",
    listenNow: "Ouvir agora",
    nextShows: "Próximos shows",
    latestRelease: "Último lançamento",
    epTitle: "Homens Brancos de Terno",
    epYear: "EP · 2023",
    meetBand: "Conheça a banda",
    membersTitle: "A formação",
    watchLive: "Assistir ao vivo",
    liveCaption: "Metalpunk Overkill · ao vivo · Goblin TV",
    scrollHint: "Veja a banda em ação",
    snake: {
      enable: "Ativar animação da cobra",
      disable: "Desativar animação da cobra",
    },
    rooms: {
      studio: {
        label: "Studio",
        title: "Direto do estúdio",
        subtitle:
          "Coloque os fones e dê play. Navegue pela discografia — EP, singles e álbum ao vivo, tudo no mesmo player.",
        cta: "EP completo no Bandcamp",
      },
      stage: {
        label: "Stage",
        title: "Palco / ao vivo",
        subtitle:
          "Set completo registrado pela Goblin TV em uma única tomada. Sem corte, sem rede, sem pedido de desculpas.",
      },
      tour: {
        label: "Tour",
        title: "Próximas datas",
        subtitle: "Onde a banda vai aterrissar. Datas atualizadas via Bandsintown.",
        cta: "Ver agenda completa",
        tickets: "Ingressos",
        emptyTitle: "Sem shows próximos",
        emptyText:
          "Nenhuma data confirmada no momento. Confira a agenda completa ou veja os flyers dos shows passados.",
        pastFlyers: "Ver flyers de shows passados",
      },
      feed: {
        label: "Feed",
        title: "Direto do Instagram",
        subtitle: "Bastidores, shows e novidades em tempo real. Siga e fique por dentro.",
        follow: "Seguir no Instagram",
        followers: "seguidores",
      },
    },
  },
  /** Band page copy: bio, members, line-up labels and timeline. */
  band: {
    title: "A Banda",
    intro:
      "Banda de Metalpunk formada em Belo Horizonte em 2021, a Napalm Cobras une o peso do Metal à urgência do Punk em um som rápido, direto e visceral. Suas letras tratam de indignação, inquietação e o desejo de viver perigosamente.",
    bio: [
      'A Napalm Cobras é uma banda de Metalpunk fundada em 2021 em Belo Horizonte, Minas Gerais, por Uander Trajano (ex-Drunk Demons e Evil Matchers) nos vocais e no baixo, Luiz "Gringo" Bueno (ex-Evil Matchers, Crackodiles e Dead Goblins) na guitarra e voz, e Fred Souza (ex-Fake) na bateria. A banda apresenta uma sonoridade intensa, rápida e direta, forjada na interseção entre Metal e Punk, com letras que abordam indignação, inquietação e o desejo de viver perigosamente.',
      'Em 2022, Lucas Chavo (Estática, Evil Idols) assumiu a bateria no lugar de Fred Souza. No mesmo ano, a Napalm Cobras gravou seu primeiro EP, "Homens Brancos de Terno", no Estúdio Moai (BH), sob a supervisão de Fabricio Borges e Débora Coimbra. A mixagem ficou por conta de Felipe Sad, enquanto a masterização foi realizada por Joona Lukala no estúdio Noise for Fiction, em Tuulissuo, Lieto, na Finlândia. O resultado consolidou o peso e a energia que se tornaram marca registrada da banda. Ainda em dezembro de 2022, a Napalm Cobras fez seu show de estreia na Casa Matriz, em Belo Horizonte, ao lado dos Flying Cats.',
      'Em 2023, a banda ampliou seus horizontes: tocou pela primeira vez no tradicional Festival de Inverno de Ouro Preto, participou da festa Glam Slam Party ao lado dos escandinavos Hardcore Superstars e dividiu o palco com o Evil Syndicate, de Manaus. No mesmo ano, lançou seu primeiro videoclipe, "Parei de Beber Socialmente", registrado ao vivo e produzido pela Encontracena.',
      "Em 2024, a Napalm Cobras gravou e lançou seu primeiro disco ao vivo durante o festival Metalpunk Overkill, em Belo Horizonte, dividindo o palco com a lendária banda americana Master. No mesmo ano, fez sua primeira turnê fora de Minas, passando por Curitiba (PR), e participou do Punk no Park ao lado de nomes como Dead Fish e Zander, no Galpão 54.",
      'Em 2025, o single "The Hog" ganhou um videoclipe em homenagem à lenda do rock brasileiro Muzzarelas, gravado no Estúdio MOAI por Fabricio Borges e editado pela Encontracena, com estreia em junho. Ao longo do ano, a banda dividiu o palco com o Witchhammer e marcou presença na Pixploitation Fest. Apresentou-se também no Cadeia Rock Fest, na Usina de Cultura (BH) — festival gratuito de rock/metal/punk com forte posicionamento antifascista — e participou do documentário do Coletivo Bloco 31, financiado pela Política Nacional Aldir Blanc (PNAB), sobre a identidade cultural de Contagem e as vozes das periferias.',
      'Em 2026, Humberto "Beto" Monteiro assumiu a bateria no lugar de Lucas Chavo, e a trajetória seguiu em alta. Em fevereiro, a banda tocou na Pixploitation Fest Vol. III no Trash Bar & Quengo Gastronomia (Contagem), ao lado dos veteranos do horror punk Zumbis do Espaço e do The Folsoms. Em maio, dividiu o palco com a lendária banda punk inglesa The Varukers — de volta ao Brasil após 28 anos —, ao lado de Manger Cadavre? (SP), Asfixia Social (SP) e Drastiko (BH), no Espaço Y (BH), numa edição do Punk no Park com ingresso solidário e arrecadação destinada à cozinha solidária dos catadores de papel. Em junho, participou de nova edição do Punk no Park em Contagem, ao lado da clássica banda de punk hardcore Sociedade Armada, além de Sagrada Escritura do Gueto, Estado de Fúria e Efecto.',
      "A Napalm Cobras já se apresentou em casas tradicionais de Belo Horizonte como A Obra e a Casa Matriz, além de palcos regionais como Trash Bar & Quengo Gastronomia, Espaço Y e Usina de Cultura. Reconhecida pela entrega energética e pelo posicionamento independente e autêntico, a banda mantém forte conexão com a cena underground de Contagem e colabora com produtores e artistas locais como o Estúdio MOAI, o Metalpunk Overkill, o Coletivo Bloco 31 e a Punho Cerrado Distro.",
    ],
    membersTitle: "Integrantes",
    formerLabel: "Antes",
    historyTitle: "Trajetória",
    members: [
      { name: "Uander Trajano", role: "Vocais & Baixo" },
      { name: "Luiz Gringo", role: "Guitarra & Voz" },
      { name: "Humberto Monteiro", role: "Bateria" },
    ],
    timeline: [
      {
        year: "2021",
        text: 'Formação em Belo Horizonte por Uander Trajano, Luiz "Gringo" Bueno e Fred Souza — Metalpunk na interseção entre Metal e Punk.',
      },
      {
        year: "2022",
        text: 'Lucas Chavo (Estática, Evil Idols) assume a bateria no lugar de Fred Souza; gravação do primeiro EP "Homens Brancos de Terno" no Estúdio Moai (BH), com masterização de Joona Lukala no Noise for Fiction (Finlândia); show de estreia em dezembro na Casa Matriz, ao lado dos Flying Cats.',
      },
      {
        year: "2023",
        text: 'Lançamento de "Homens Brancos de Terno" e do primeiro videoclipe ("Parei de Beber Socialmente", via Encontracena); estreia no Festival de Inverno de Ouro Preto e palco com o Evil Syndicate (Manaus).',
      },
      {
        year: "2024",
        text: 'Disco ao vivo gravado no Metalpunk Overkill, dividindo o palco com o lendário Master (EUA); primeira turnê fora do estado, em Curitiba (PR); Punk no Park com Dead Fish e Zander; single "Longo Caminho Para Casa".',
      },
      {
        year: "2025",
        text: 'Videoclipe do single "The Hog" em homenagem a Muzzarelas (Estúdio MOAI / Encontracena); shows ao lado do Witchhammer e na Pixploitation Fest; Cadeia Rock Fest na Usina de Cultura (BH) e documentário do Coletivo Bloco 31 (PNAB).',
      },
      {
        year: "2026",
        text: 'Humberto "Beto" Monteiro assume a bateria no lugar de Lucas Chavo; Pixploitation Fest Vol. III no Trash Bar & Quengo Gastronomia com Zumbis do Espaço e The Folsoms; palco com os ingleses The Varukers (Punk no Park) ao lado de Manger Cadavre?, Asfixia Social e Drastiko, no Espaço Y; e Punk no Park em Contagem com a Sociedade Armada.',
      },
    ],
  },
  /** Music page copy: streaming, tracklist, credits and discography. */
  music: {
    title: "Música",
    intro:
      'Do EP de estreia "Homens Brancos de Terno" ao single "Longo Caminho Para Casa": ouça a Napalm Cobras no Bandcamp, Spotify e nos principais serviços de streaming.',
    listenOn: "Ouvir em",
    tracklistTitle: "Faixas",
    discographyTitle: "Discografia",
    creditsTitle: "Ficha técnica",
    creditsEmpty: "Ficha técnica em breve.",
    listenAllTitle: "Onde ouvir",
    listenAllSubtitle: "Ouça a Napalm Cobras na sua plataforma preferida.",
    discography: [
      { title: "Ao Vivo No Metalpunk Overkill", meta: "Álbum · 2024" },
      { title: "Homens Brancos de Terno", meta: "EP · 2023" },
      { title: "Metalpunk Overkill (Ao Vivo)", meta: "Ao Vivo · 2024" },
      { title: "Longo Caminho Para Casa", meta: "Single · 2024" },
      { title: "The Hog", meta: "Single · 2025" },
    ],
  },
  /** Shows page copy: schedule, Bandsintown fallback and booking. */
  shows: {
    title: "Shows",
    intro: "Próximas datas e histórico de shows via Bandsintown. Para booking, fale conosco.",
    fallback: "Não foi possível carregar os shows. Acesse o Bandsintown diretamente.",
    openBandsintown: "Abrir no Bandsintown",
    booking: "Booking & contratação",
  },
  /** Videos page copy: featured live video, gallery and clip kind labels. */
  videos: {
    title: "Vídeos",
    intro: "Show ao vivo, clipes e registros do circuito.",
    featured: "Em destaque",
    featuredCaption:
      "Metalpunk Overkill — show ao vivo registrado pela Goblin TV em 2024, ao lado do lendário Master (EUA). Set completo.",
    moreOnYoutube: "Mais no YouTube",
    allTitle: "Clipes & Registros",
    kinds: {
      clip: "Clipe oficial",
      live: "Show completo",
      session: "Encontracena",
    },
  },
  /** Gallery page copy: flyer archive and lightbox controls. */
  gallery: {
    title: "História & Flyers",
    intro:
      "A trajetória da banda contada pelos flyers de shows e eventos. Arquivo do circuito underground mineiro e além.",
    placeholder: "Flyer em breve",
    close: "Fechar",
    prev: "Anterior",
    next: "Próximo",
  },
  /** Press page copy: press kit documents, clipping and booking. */
  press: {
    title: "Imprensa & Contratação",
    intro:
      "Material para imprensa, contratantes e produtores. Para entrevistas e cessão de material adicional, entre em contato.",
    pressReleaseTitle: "Press Release",
    pressReleaseDesc: "Texto completo de apresentação da banda.",
    riderTitle: "Rider Técnico",
    riderDesc: "Especificação completa de palco, retornos e backline.",
    stageMapTitle: "Mapa de Palco",
    stageMapDesc: "Diagrama de posicionamento em palco.",
    download: "Abrir documento",
    open: "Abrir pasta",
    clippingTitle: "Clipping",
    clippingIntro: "A banda na imprensa e na mídia.",
    read: "Ver matéria",
  },
  /** Contact page copy: booking, follow and email labels. */
  contact: {
    title: "Contato",
    intro: "Para booking, imprensa, parcerias e colaborações.",
    booking: "Booking",
    follow: "Acompanhe",
    emailLabel: "E-mail",
  },
  /** Footer copy: rights notice and location line. */
  footer: {
    rights: "Todos os direitos reservados.",
    builtIn: "Belo Horizonte / MG",
  },
  /** 404 page copy. */
  notFound: {
    eyebrow: "Erro 404",
    title: "Página não encontrada",
    text: "A página que você procura saiu de turnê, mudou de endereço ou nunca existiu. Volte ao início e siga o som.",
    home: "Voltar ao início",
    music: "Ouvir a banda",
  },
};

/**
 * Shape of a complete translation dictionary, inferred from {@link pt}.
 *
 * @remarks
 * Every locale dictionary (e.g. `en`, `es`) must satisfy this type, ensuring
 * all locales expose the same keys.
 */
export type Lang = typeof pt;
