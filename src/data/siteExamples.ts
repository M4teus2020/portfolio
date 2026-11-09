// Sites mostrados no /sites. Cliente só entra com autorização do dono.
// Exemplos são negócios fictícios feitos para mostrar o trabalho (sem cidade).
// Vazio: a seção "Feitos por mim" fica escondida.
export type Niche = 'restaurante' | 'salao' | 'oficina' | 'servicos' | 'clinica' | 'agropecuaria' | 'pet'

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
  // Print da 1ª tela em largura de celular (412x915), usado na moldura de celular do /sites.
  imageMobile?: string
}

const todos: SiteExample[] = [
  {
    name: 'Tosta Lancheria',
    niche: 'restaurante',
    exemplo: true,
    url: 'https://tosta-exemplo.mateus-felini.workers.dev/',
    image: '/exemplos/tosta.webp',
    imageMobile: '/exemplos/tosta-mobile.webp',
    pitch: 'O cliente escolhe o lanche, o jeito e a hora, e o pedido sai escrito no WhatsApp.',
  },
  {
    name: 'Sacode Banho e Tosa',
    niche: 'pet',
    exemplo: true,
    url: 'https://sacode-exemplo.mateus-felini.workers.dev/',
    image: '/exemplos/sacode.webp',
    imageMobile: '/exemplos/sacode-mobile.webp',
    pitch: 'O dono escolhe porte, serviço e dia, e o banho do pet sai marcado no WhatsApp.',
  },
  {
    name: 'Lancheria Faísca',
    hidden: true, // Mateus 2026-11-09: fora da vitrine (catálogo novo)
    niche: 'restaurante',
    exemplo: true,
    url: 'https://faisca-exemplo.mateus-felini.workers.dev/',
    image: '/exemplos/faisca.webp',
    imageMobile: '/exemplos/faisca-mobile.webp',
    pitch: 'O cliente monta o pedido e ele chega pronto no WhatsApp.',
  },
  {
    name: 'Fio Reto Barbearia',
    hidden: true, // Mateus 2026-11-09: vitrine só com o catálogo novo
    niche: 'salao',
    exemplo: true,
    url: 'https://fio-reto-exemplo.mateus-felini.workers.dev/',
    image: '/exemplos/fio-reto.webp',
    imageMobile: '/exemplos/fio-reto-mobile.webp',
    pitch: 'O cliente escolhe serviço, dia e turno e a hora marcada chega no WhatsApp.',
  },
  {
    name: 'Torque Pneus & Mecânica',
    hidden: true, // Mateus 2026-11-09: vitrine só com o catálogo novo
    niche: 'oficina',
    exemplo: true,
    url: 'https://torque-exemplo.mateus-felini.workers.dev/',
    image: '/exemplos/torque.webp',
    imageMobile: '/exemplos/torque-mobile.webp',
    pitch: 'O cliente vê os serviços e pede orçamento direto no WhatsApp.',
  },
  {
    name: 'Prumo Contabilidade',
    hidden: true, // Mateus 2026-11-09: vitrine só com o catálogo novo
    niche: 'servicos',
    exemplo: true,
    url: 'https://prumo-exemplo.mateus-felini.workers.dev/',
    image: '/exemplos/prumo.webp',
    imageMobile: '/exemplos/prumo-mobile.webp',
    pitch: 'O cliente conta o caso dele e já sabe qual é o próximo passo.',
  },
  {
    name: 'Lume Odontologia',
    hidden: true, // Mateus 2026-11-09: fora da vitrine (catálogo novo)
    niche: 'clinica',
    exemplo: true,
    url: 'https://lume-exemplo.mateus-felini.workers.dev/',
    image: '/exemplos/lume.webp',
    imageMobile: '/exemplos/lume-mobile.webp',
    pitch: 'O paciente mostra onde incomoda e pede horário sem precisar ligar.',
  },
  {
    name: 'Agropecuária Paiol',
    hidden: true, // Mateus 2026-11-09: fora da vitrine (catálogo novo)
    niche: 'agropecuaria',
    exemplo: true,
    url: 'https://paiol-exemplo.mateus-felini.workers.dev/',
    image: '/exemplos/paiol.webp',
    imageMobile: '/exemplos/paiol-mobile.webp',
    pitch: 'O cliente marca o que cria ou planta e a lista de orçamento chega pronta.',
  },
]

export const siteExamples: SiteExample[] = todos.filter((e) => !e.hidden)
