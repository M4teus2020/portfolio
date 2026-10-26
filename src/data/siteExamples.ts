// Sites mostrados no /sites. Cliente só entra com autorização do dono.
// Exemplos são negócios fictícios feitos para mostrar o trabalho (sem cidade).
// Vazio: a seção "Feitos por mim" fica escondida.
export type Niche = 'restaurante' | 'salao' | 'oficina' | 'servicos' | 'clinica' | 'agropecuaria'

export interface SiteExample {
  name: string
  city?: string
  niche?: Niche
  exemplo?: boolean
  url: string
  image?: string
}

export const siteExamples: SiteExample[] = [
  {
    name: 'Lancheria Faísca',
    niche: 'restaurante',
    exemplo: true,
    url: 'https://faisca-exemplo.mateus-felini.workers.dev/',
    image: '/exemplos/faisca.webp',
  },
  {
    name: 'Fio Reto Barbearia',
    niche: 'salao',
    exemplo: true,
    url: 'https://fio-reto-exemplo.mateus-felini.workers.dev/',
    image: '/exemplos/fio-reto.webp',
  },
  {
    name: 'Torque Pneus & Mecânica',
    niche: 'oficina',
    exemplo: true,
    url: 'https://torque-exemplo.mateus-felini.workers.dev/',
    image: '/exemplos/torque.webp',
  },
  {
    name: 'Prumo Contabilidade',
    niche: 'servicos',
    exemplo: true,
    url: 'https://prumo-exemplo.mateus-felini.workers.dev/',
    image: '/exemplos/prumo.webp',
  },
  {
    name: 'Lume Odontologia',
    niche: 'clinica',
    exemplo: true,
    url: 'https://lume-exemplo.mateus-felini.workers.dev/',
    image: '/exemplos/lume.webp',
  },
  {
    name: 'Agropecuária Paiol',
    niche: 'agropecuaria',
    exemplo: true,
    url: 'https://paiol-exemplo.mateus-felini.workers.dev/',
    image: '/exemplos/paiol.webp',
  },
]
