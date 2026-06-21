export interface Flyer {
  src: string;
  title: string;
  year?: string;
  venue?: string;
  lineup?: string;
}

const FLYERS_DIR = "/assets/images/flyers";

export const FLYERS: Flyer[] = [
  {
    src: `${FLYERS_DIR}/2026-06-13.webp`,
    title: "Punk no Park · Sociedade Armada",
    year: "2026",
    venue: "Trash & Quengo · Inconfidentes, Contagem/MG",
    lineup: "Sociedade Armada, Efecto, Sagrada Escritura do Gueto, Napalm Cobras, Estado de Fúria",
  },
  {
    src: `${FLYERS_DIR}/2026-05-15.webp`,
    title: "Punk no Park · The Varukers",
    year: "2026",
    venue: "Espaço Y · Calafate, Belo Horizonte/MG",
    lineup: "The Varukers (UK), Manger Cadavre?, Asfixia Social, Napalm Cobras, Drástiko",
  },
  {
    src: `${FLYERS_DIR}/2026-02-28.webp`,
    title: "Pixploitation Fest Vol. III",
    year: "2026",
    venue: "Trash Bar & Quengo · Inconfidentes, Contagem/MG",
    lineup: "Zumbis do Espaço, Folsoms, Napalm Cobras",
  },
  {
    src: `${FLYERS_DIR}/2025-11-11.webp`,
    title: "Cadeia Fest",
    year: "2025",
    venue: "Usina de Cultura · Ipiranga, Belo Horizonte/MG",
    lineup:
      "Sagrada Escritura do Gueto, Napalm Cobras, Garagem Dinossauro, Last Warning, Sentence, Zero à Esquerda",
  },
  {
    src: `${FLYERS_DIR}/2025-07-20.jpg`,
    title: "Witch Hammer + Napalm Cobras",
    year: "2025",
    venue: "Trash Bar & Quengo · Inconfidentes, Contagem/MG",
    lineup: "Witch Hammer, Napalm Cobras (special guest)",
  },
  {
    src: `${FLYERS_DIR}/2025-07-12.webp`,
    title: "Festival de Inferno · Mostra Grampo 10 anos",
    year: "2025",
    venue: "Mina Chico Rei · Antônio Dias, Ouro Preto/MG",
    lineup: "Excoria, Napalm Cobras, Final Trágico, Os Decreptos, Vultor, Tunnel",
  },
  {
    src: `${FLYERS_DIR}/2024-12-07.jpg`,
    title: "Punk no Park · Dead Fish",
    year: "2024",
    venue: "Galpão 54 · Lagoinha, Belo Horizonte/MG",
    lineup: "Dead Fish, Zander, Surra, Last Warning, Napalm Cobras",
  },
  {
    src: `${FLYERS_DIR}/2024-08-24.webp`,
    title: "Pixploitation Fest",
    year: "2024",
    venue: "Av. do Contorno · Barro Preto, Belo Horizonte/MG",
    lineup:
      "Cigarras (CWB), O Abelha, Reverb All Stars, O Melda, Napalm Cobras, Dead Men's Band, Roger Pixixo",
  },
  {
    src: `${FLYERS_DIR}/2024-07-27.jpg`,
    title: "1ª Turboparty Curitiba",
    year: "2024",
    venue: "Janaíno Vegan do Largo · Curitiba/PR",
    lineup: "Napalm Cobras (BH), Redlightz Bar, L.A.I.",
  },
  {
    src: `${FLYERS_DIR}/2024-06-24.webp`,
    title: "Gobierno No!",
    year: "2024",
    venue: "Viaduto Sta. Tereza · Centro, Belo Horizonte/MG",
    lineup:
      "Ratas Rabiosas (SP), Lixo Sintétiko (RS), Napalm Cobras, Garagem Dinossauro, Drástiko, Spirit",
  },
  {
    src: `${FLYERS_DIR}/2024-04-06.webp`,
    title: "Metalpunk Overkill · Master",
    year: "2024",
    venue: "Caverna Rock Pub · Barro Preto, Belo Horizonte/MG",
    lineup:
      "Master (EUA), Escarnium, Podridão, Matrak Attakk (FRA/ITA), Preceptor, Beyond the Grave, Napalm Cobras",
  },
  {
    src: `${FLYERS_DIR}/2024-03-30.jpg`,
    title: "Turbojugend Party BH · Vol. 1",
    year: "2024",
    venue: "Casa Fúnebre Bar · Taquaril, Belo Horizonte/MG",
    lineup: "O Abelha, Napalm Cobras, Payback, GG. Di Martino, No Wall Noise Band (SP)",
  },
  {
    src: `${FLYERS_DIR}/2024-03-17.jpg`,
    title: "O Underground",
    year: "2024",
    venue: "Alma Brasileira · Sta. Inês, Belo Horizonte/MG",
    lineup: "Drunk of War (Recife), Consciência Suburbana, Kaos Attack, Napalm Cobras, O.D.D",
  },
  {
    src: `${FLYERS_DIR}/2024-02-29.webp`,
    title: "Velho de Câncer + Napalm Cobras",
    year: "2024",
    venue: "Casa Matriz · Centro, Belo Horizonte/MG",
    lineup: "Velho de Câncer (POA), Napalm Cobras (BH)",
  },
  {
    src: `${FLYERS_DIR}/2024-01-21.webp`,
    title: "11ª Velada Libertária",
    year: "2024",
    venue: "Instituto Helena Greco · Sta. Tereza, Belo Horizonte/MG",
    lineup: "Zabandidos de la 18 (Equador), Declínio Social, Final Trágico, Napalm Cobras",
  },
  {
    src: `${FLYERS_DIR}/2024-01-18.jpg`,
    title: "Fast and Loud Festival",
    year: "2024",
    venue: "Trash Bar · Inconfidentes, Contagem/MG",
    lineup: "Hellway Train, Old Audrey's Funeral, Napalm Cobras (lançamento do single The Hog)",
  },
  {
    src: `${FLYERS_DIR}/2023-11-05.webp`,
    title: "Som de Garagem IX",
    year: "2023",
    venue: "Dom Pedroll · Divinópolis/MG",
    lineup: "Evil Syndicate (Manaus), Napalm Cobras (BH)",
  },
  {
    src: `${FLYERS_DIR}/2023-10-21.jpg`,
    title: "Garagem Fest",
    year: "2023",
    venue: "Casa Fúnebre · Saudade, Belo Horizonte/MG",
    lineup: "Napalm Cobras, Cracked Skull, Garagem Dinossauro, Distúrbio Sub-Humano, Possuídos",
  },
  {
    src: `${FLYERS_DIR}/2023-10-12.jpg`,
    title: "Napalm Cobras · Chama Independente",
    year: "2023",
    lineup: "Napalm Cobras",
  },
  {
    src: `${FLYERS_DIR}/2023-08-26.jpg`,
    title: "Pixploitation 5 · Aniversário do Roger Pixixo",
    year: "2023",
    venue: "Casa Matriz · Centro, Belo Horizonte/MG",
    lineup: "Colt Cobra (Vila Velha), O Abelha, Napalm Cobras, Roger Pixixo",
  },
  {
    src: `${FLYERS_DIR}/2023-08-16.png`,
    title: "Festival de Inverno UFOP · Rock Generator",
    year: "2023",
    venue: "Praça Antônio Dias · Ouro Preto/MG",
    lineup: "Vítimas de Cronos, Napalm Cobras, Márcio Aranha e a Teia, Fidaionice",
  },
  {
    src: `${FLYERS_DIR}/2023-07-10.jpg`,
    title: "Aniversário Brutal Fest 666",
    year: "2023",
    venue: "Transilvânia Bar · Água Branca, Contagem/MG",
    lineup: "Vultor, Desgraça Social, Napalm Cobras, Dischavizer, Kaos Attack, Final Trágico",
  },
  {
    src: `${FLYERS_DIR}/2023-05-01.png`,
    title: "Rock in Beer · Lançamento do EP",
    year: "2023",
    venue: "Av. Francisco Sá · Prado, Belo Horizonte/MG",
    lineup: "Napalm Cobras, Drástiko",
  },
  {
    src: `${FLYERS_DIR}/2023-03-23.jpg`,
    title: "Napalm Cobras + Giovanna Moraes",
    year: "2023",
    venue: "A Obra · Savassi, Belo Horizonte/MG",
    lineup: "Napalm Cobras, Giovanna Moraes",
  },
  {
    src: `${FLYERS_DIR}/2022-12-07.jpg`,
    title: "Bebedeira Natalina",
    year: "2022",
    venue: "Casa Matriz · Centro, Belo Horizonte/MG",
    lineup: "Marrones, Flying Cats, Napalm Cobras (estreia)",
  },
];
