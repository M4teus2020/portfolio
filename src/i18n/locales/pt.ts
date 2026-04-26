import type { Messages } from '../types'

const pt: Messages = {
  nav: {
    about: 'Sobre',
    stack: 'Stack',
    ai: 'IA',
    timeline: 'Trajetória',
    play: 'Playground',
    contact: 'Contato',
  },
  hero: {
    role: 'Dev Full-stack',
    location: 'Rio Grande do Sul — Brasil',
    name: 'Mateus Felini',
    tagline: 'Construo produtos full-stack com Laravel & Vue.',
    sub: 'Três anos entregando interfaces que não travam, APIs que não caem e código que outras pessoas conseguem ler depois.',
    cta: 'Ver trajetória',
    cta2: 'Fale comigo',
  },
  about: {
    kicker: 'Sobre mim',
    title: 'Engenheiro full-stack, pleno, com 3 anos de estrada.',
    body: 'Trabalho principalmente com Laravel e Vue — essa dupla me deixa entregar features de ponta-a-ponta rápido e com confiança. Gosto de código legível, testes que importam e decisões de arquitetura que o time do próximo ano não vai me odiar.',
    facts: [
      ['Carreira', '3 anos'],
      ['Base', 'RS · Brasil'],
      ['Stack favorita', 'Laravel + Vue'],
      ['Tipo de trabalho', 'CLT · Contract · Remoto'],
    ],
    now: 'No momento',
    nowItemsBase: [
      'Explorando TDD combinado com agentes de IA — testes guiam o pair programming',
      'Aprofundando em arquitetura hexagonal em PHP',
      'Lendo sobre DDD aplicado a sistemas legados',
    ],
    nowItemLooking: 'Procurando a próxima posição — remoto global ou BR',
  },
  stack: {
    kicker: 'Stack',
    title: 'Ferramentas que uso todo dia.',
    groups: [
      { h: 'Backend', items: ['Laravel', 'PHP 8.3', 'Node', 'Postgres', 'MySQL', 'Redis', 'Docker'] },
      { h: 'Frontend', items: ['Vue 3', 'Nuxt', 'Inertia', 'TypeScript', 'TailwindCSS', 'Vite'] },
      { h: 'Infra & Ops', items: ['AWS', 'GitHub Actions', 'Linux', 'nginx'] },
      { h: 'IA / Agentes', items: ['Claude Code', 'GitHub Copilot', 'Anthropic API', 'OpenAI API'] },
      { h: 'Disciplina', items: ['TDD', 'Clean Architecture', 'Code Review', 'Pair Programming'] },
    ],
  },
  ai: {
    kicker: 'IA no fluxo',
    title: 'Como eu trabalho com IA.',
    sub: 'Não sou um "dev que usa ChatGPT" — IA virou parte do meu setup, igual Git. Uso Claude Code e GitHub Copilot como parceiros de pensamento, não como muleta.',
    items: [
      {
        k: 'Claude Code como pair sênior',
        d: 'Uso Claude Code para refatorações grandes, exploração de código legado e desenho de arquitetura. Ele puxa o contexto do repo inteiro — ideal para "por que esse controller está assim?" ou "vamos extrair essa lógica para um service".',
      },
      {
        k: 'Copilot no dia-a-dia',
        d: 'GitHub Copilot como autocomplete turbinado — boilerplate de testes, resources do Laravel, tipagens de props no Vue. Fricção zero no fluxo, nunca tiro as mãos do teclado.',
      },
      {
        k: 'TDD + agente = ciclo rápido',
        d: 'Escrevo o teste primeiro, deixo o agente sugerir a implementação, ajusto. Os testes funcionam como especificação executável — o agente não consegue "enganar" o resultado.',
      },
      {
        k: 'Revisão assistida antes do PR',
        d: 'Passo o diff por um agente antes de abrir PR — pega inconsistências de naming, N+1 queries esquecidas e aquele TODO que ficou no código. Smells que eu deixaria escapar às 18h de sexta.',
      },
      {
        k: 'Prototipação absurdamente rápida',
        d: 'Mock de endpoints, seeds realistas, playgrounds interativos e POCs saem em minutos. O que antes era "vou ver no fim de semana" vira "deixa eu te mostrar agora".',
      },
      {
        k: 'Features com LLM em produto',
        d: 'Já integrei LLMs em fluxos reais: extração estruturada de documentos, resumo automático de tickets, enriquecimento de cadastro. Entender prompt-engineering e limites do modelo faz parte do job.',
      },
    ],
    quote: '"IA não substitui decisão de engenharia. Substitui a parte chata dela — e me deixa gastar energia no que importa."',
  },
  timeline: {
    kicker: 'Trajetória',
    title: 'Onde estive.',
    items: [
      {
        year: 'jun 2024 — hoje',
        role: 'Desenvolvedor Full-stack',
        company: 'Soluct Soluções em Sistemas',
        location: 'Tapejara, RS · Híbrido',
        bullets: [
          'Comecei como front-end e evoluí para full-stack (Vue 3 + Laravel), entregando sistemas de gestão interna para o setor financeiro e cooperativas de crédito.',
          'Engenharia de CRMs, dashboards analíticos e fluxos de cadastro — foco em eficiência operacional do usuário final.',
          'Módulos avançados de gestão documental e integração com APIs externas de terceiros.',
          'TypeScript + Vue Router em arquitetura tipada e escalável, conectada a back-ends Laravel.',
        ],
      },
      {
        year: 'abr 2023 — jun 2024',
        role: 'Desenvolvedor Web',
        company: 'HGV Sistemas',
        location: 'Tapejara, RS · Presencial',
        bullets: [
          'Desenvolvimento e manutenção de sistemas de gestão interna para instituições financeiras e cooperativas de crédito.',
          'Ferramentas de controle, relatórios e painéis em PHP 7 com MVC sobre framework interno.',
          'Atuação no ciclo completo — do processamento seguro das informações às regras de negócio do setor.',
        ],
      },
    ],
  },
  play: {
    kicker: 'Playground',
    title: 'Demos interativos.',
    sub: 'Experimentos pequenos. Clique para brincar. (Em expansão — mais demos em breve.)',
    items: [
      { t: 'Conversor de moedas', d: 'Conversão entre moedas com cotações locais.' },
      { t: 'Gerador de slug', d: 'Input → slug amigável, em tempo real.' },
      { t: 'SQL → Eloquent', d: 'Cola um SELECT, devolve uma query Eloquent.' },
    ],
    outputLabel: 'Saída',
  },
  contact: {
    kicker: 'Contato',
    title: 'Vamos trocar uma ideia?',
    sub: 'Respondo em até 24h em dias úteis. Prefiro email, mas aceito pombo-correio.',
    name: 'Nome',
    email: 'E-mail',
    msg: 'Mensagem',
    send: 'Enviar mensagem',
    or: 'ou me chame em',
    placeholderName: 'Como devo te chamar?',
    placeholderEmail: 'voce@empresa.com',
    placeholderMsg: 'Conte um pouco do projeto, contexto e prazo.',
    sent: 'Mensagem enviada. Vou responder logo!',
  },
  footer: {
    built: 'Feito em 2026 por Mateus Felini — Laravel + Vue, como sempre.',
  },
}

export default pt
