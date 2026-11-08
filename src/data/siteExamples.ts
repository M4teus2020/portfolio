// Sites mostrados no /sites. Cliente só entra com autorização do dono.
// Exemplos são negócios fictícios feitos para mostrar o trabalho (sem cidade).
// Vazio: a seção "Feitos por mim" fica escondida.
export type Niche = 'restaurante' | 'salao' | 'oficina' | 'servicos' | 'clinica' | 'agropecuaria'

export interface SiteExample {
  name: string
  city?: string
  niche?: Niche
  exemplo?: boolean
  // Uma frase do que o site faz pelo negócio (usada em /sites).
  pitch?: string
  // Fora da vitrine pública (reversível: tire o flag para voltar).
  hidden?: boolean
  url: string
  image?: string
}

const todos: SiteExample[] = [
  {
    name: 'Lancheria Faísca',
    niche: 'restaurante',
    exemplo: true,
    url: 'https://faisca-exemplo.mateus-felini.workers.dev/',
    image: '/exemplos/faisca.webp',
    pitch: 'O cliente monta o pedido e ele chega pronto no WhatsApp.',
  },
  {
    name: 'Fio Reto Barbearia',
    niche: 'salao',
    exemplo: true,
    url: 'https://fio-reto-exemplo.mateus-felini.workers.dev/',
    image: '/exemplos/fio-reto.webp',
    pitch: 'O cliente escolhe serviço, dia e turno e a hora marcada chega no WhatsApp.',
  },
  {
    name: 'Torque Pneus & Mecânica',
    niche: 'oficina',
    exemplo: true,
    url: 'https://torque-exemplo.mateus-felini.workers.dev/',
    image: '/exemplos/torque.webp',
    hidden: true, // auditoria 2026-11-07: herói abstrato, nota 6,0
  },
  {
    name: 'Prumo Contabilidade',
    niche: 'servicos',
    exemplo: true,
    url: 'https://prumo-exemplo.mateus-felini.workers.dev/',
    image: '/exemplos/prumo.webp',
    hidden: true, // auditoria 2026-11-07: cara de template, nota 5,0
  },
  {
    name: 'Lume Odontologia',
    niche: 'clinica',
    exemplo: true,
    url: 'https://lume-exemplo.mateus-felini.workers.dev/',
    image: '/exemplos/lume.webp',
    pitch: 'O paciente mostra onde incomoda e pede horário sem precisar ligar.',
  },
  {
    name: 'Agropecuária Paiol',
    niche: 'agropecuaria',
    exemplo: true,
    url: 'https://paiol-exemplo.mateus-felini.workers.dev/',
    image: '/exemplos/paiol.webp',
    pitch: 'O cliente marca o que cria ou planta e a lista de orçamento chega pronta.',
  },
]

export const siteExamples: SiteExample[] = todos.filter((e) => !e.hidden)
