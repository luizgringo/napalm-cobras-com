export interface ClippingItem {
  id: string;
  outlet: string;
  title: string;
  year?: string;
  kind: "article" | "post";
}

export const CLIPPING: ClippingItem[] = [
  {
    id: "1yOV0qcCW_funye-y3BpoJckQq79taGVG",
    outlet: "Arrepio Produções",
    title: "Napalm Cobras lança primeiro EP 'Homens Brancos de Terno'",
    year: "2023",
    kind: "article",
  },
  {
    id: "1DOewyZFBdCK2Ej0z-rSwDGK7MeH7wCNw",
    outlet: "Desacato",
    title: "'Homens Brancos de Terno' é o primeiro EP de Napalm Cobras",
    year: "2023",
    kind: "article",
  },
  {
    id: "1mLHDdJwcZjijKdxCEaioLpHPQr__PmHF",
    outlet: "Roadie Crew",
    title: "Napalm Cobras: banda de metal punk / speedrock lança EP 'Homens Brancos de Terno'",
    year: "2023",
    kind: "article",
  },
  {
    id: "1iQJdb4Ah2wcFIs8v-LUawTZyHStYSd9V",
    outlet: "Rock Notícias",
    title: "Napalm Cobras: banda de metal punk / speedrock lança EP 'Homens Brancos de Terno'",
    year: "2023",
    kind: "article",
  },
  {
    id: "1hqWqDveGIgNaQfp43Il7onFVuBti0o9D",
    outlet: "Duofox",
    title: "Napalm Cobras lança novo EP 'Homens Brancos de Terno'",
    year: "2023",
    kind: "article",
  },
  {
    id: "1l6hC0crWEUaFB9iNeRlHzpZZm1QBEjHW",
    outlet: "O Tempo",
    title: "Festival Metalpunk Overkill agrega diversas vertentes da música pesada em BH",
    kind: "article",
  },
  {
    id: "1q3E5TZSWfYfxqlxzeUUYu29_9HWGud8U",
    outlet: "SouBH · Uai",
    title: "Noite dedicada às vertentes do punk reúne shows de quatro bandas na Casa Matriz",
    kind: "article",
  },
  {
    id: "1cYKLk-mPng86Ezdza4BG_j0ebrn9Zus2",
    outlet: "Metal Never Die",
    title: "Varukers retorna a Belo Horizonte após 28 anos em show especial do Punk no Park",
    kind: "article",
  },
  {
    id: "1Bf472KRj1_2FC5-Q_E7R-6INLsXLxCYL",
    outlet: "Programa Antivírus 2000",
    title: "Hellway Train faz apresentação em Belo Horizonte",
    year: "2025",
    kind: "article",
  },
  {
    id: "1TnF0hzMQPD0IyKGedNz-mMgYRR9N2VEH",
    outlet: "@alexandreafrofreaky",
    title: "Lançamento do EP 'Homens Brancos de Terno' do power trio Napalm Cobras",
    kind: "post",
  },
];

export function clippingHref(id: string): string {
  return `https://drive.google.com/file/d/${id}/view`;
}
