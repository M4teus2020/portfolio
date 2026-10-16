const pt = {
  meta: {
    homeTitle: 'Mateus Felini · Desenvolvedor full-stack (Laravel e Vue)',
    homeDescription:
      'Desenvolvedor full-stack (Laravel e Vue). Três anos construindo sistemas web para o setor financeiro, de cooperativas de crédito a plataformas multi-cliente.',
    aboutTitle: 'Sobre · Mateus Felini',
    sitesTitle: 'Sites para comércio local · Mateus Felini',
    sitesDescription:
      'Site para o seu restaurante ou loja, no ar em poucos dias e cuidado todo mês.',
    notFoundTitle: 'Página não encontrada · Mateus Felini',
  },
  nav: {
    home: 'Início',
    projects: 'Projetos',
    about: 'Sobre',
    sites: 'Sites',
    contact: 'Contato',
    switchLocale: 'Read in English',
    skip: 'Pular para o conteúdo',
  },
  common: {
    resume: 'Baixar currículo',
    copyEmail: 'Copiar e-mail',
    copied: 'E-mail copiado',
  },
  home: {
    kicker: 'Desenvolvedor full-stack, Laravel e Vue',
    title: 'Construo sistemas web que empresas usam o dia inteiro.',
    lede: 'Três anos em produção no setor financeiro: cobrança, atendimento, auditoria. Do banco de dados à tela, com código que o próximo dev consegue ler.',
    facts: ['Remoto ou híbrido', 'Português nativo, inglês avançado'],
    ctaTimeline: 'Ver trajetória',
    proof: [
      { big: '3+ anos', small: 'em produção, desde abril de 2023' },
      { big: '150 mil+', small: 'registros por dia na plataforma em que trabalho hoje' },
      { big: 'IA no método', small: 'não no lugar dele: Claude Code com testes e revisão' },
    ],
    projects: {
      title: 'Projetos',
      sub: 'Problema, decisão e resultado. Um de cada vez, bem contado.',
      read: 'Ler o case',
    },
    work: {
      title: 'Como eu trabalho.',
      items: [
        {
          k: 'Entendo o negócio antes do código.',
          d: 'Sistema financeiro não perdoa regra mal entendida. Pergunto até saber por que a regra existe.',
        },
        {
          k: 'Teste primeiro, agente depois.',
          d: 'Escrevo o teste, deixo o Claude Code propor a implementação e reviso. O teste é a especificação que o agente não consegue contornar.',
        },
        {
          k: 'Performance é parte da entrega.',
          d: 'Query lenta, N+1 e relatório que trava viram tarefa, não detalhe pra depois.',
        },
        {
          k: 'Segurança desde o primeiro SQL.',
          d: 'Comecei em PHP puro, escrevendo SQL à mão. Desconfiar de toda entrada virou hábito.',
        },
      ],
      close:
        'IA não toma decisão de engenharia por mim. Ela tira a parte repetitiva do caminho e sobra tempo pro que importa.',
    },
    timeline: {
      title: 'Trajetória.',
      items: [
        {
          years: '2024 até hoje',
          company: 'Soluct Soluções em Sistemas',
          text: 'Full-stack (Laravel e Vue) numa plataforma multi-cliente de operações financeiras: integrações, dashboards e fluxos que as equipes usam o dia todo.',
        },
        {
          years: '2023 a 2024',
          company: 'HGV Sistemas',
          text: 'Primeiro emprego como dev: PHP, MySQL e SQL Server em sistemas para o setor financeiro. Saí promovido, com ferramentas internas que aceleraram o time.',
        },
      ],
      more: 'A história inteira está em Sobre',
    },
    contact: {
      title: 'Vamos conversar?',
      text: 'Respondo e-mail em até um dia útil.',
    },
  },
  about: {
    title: 'Do balcão da loja ao sistema financeiro.',
    intro:
      'Sou o Mateus. Trabalho com desenvolvimento web desde 2023, sempre em sistemas que mexem com dinheiro de alguém: cobrança, atendimento, auditoria. Gosto desse tipo de software justamente porque erro ali tem custo, e isso obriga a fazer direito.',
    chapters: [
      {
        mark: 'Antes',
        title: 'Antes do código',
        text: 'Antes de programar, trabalhei numa loja de informática e fazia de tudo: manutenção de computador e celular, vendas, instalação de internet. Foi ali que aprendi como funciona um negócio pequeno por dentro, e é por isso que hoje também faço sites para o comércio local.',
      },
      {
        mark: '2023',
        title: 'HGV Sistemas',
        text: 'Meu primeiro emprego como dev. PHP sem framework, SQL escrito à mão, sistemas para o setor financeiro. Ali aprendi o peso de mexer com dado financeiro: encontrei e reportei uma falha de segurança crítica no sistema, e criei um gerador de código que acabou com o copia e cola no início de cada funcionalidade. Também ajudei a integrar os devs que chegaram depois de mim.',
      },
      {
        mark: '2024',
        title: 'Soluct',
        text: 'Saí da HGV por escolha: queria uma stack moderna e mais espaço pra crescer, e aceitei recomeçar por isso. Na Soluct trabalho com Laravel, Vue e TypeScript numa plataforma multi-cliente de operações financeiras, com integrações (WhatsApp, telefonia, e-mail, boletos), filas, relatórios e otimização de performance.',
      },
      {
        mark: 'Hoje',
        title: 'IA no método',
        text: 'Uso IA como parte do método: Claude Code, agentes e testes automatizados no mesmo fluxo. Fora do trabalho, montei com essa abordagem um processo para criar sites para restaurantes e lojas.',
      },
    ],
    bringTitle: 'O que eu levo para um time',
    bring: [
      'Entendo regra de negócio e faço a pergunta que falta.',
      'Cuido de performance e segurança sem precisar de ticket pra isso.',
      'Escrevo código pensando em quem vai mantê-lo.',
      'Uso IA com critério: rápido sem ser descuidado.',
    ],
    toolsTitle: 'Ferramentas',
    tools: [
      {
        h: 'Uso todo dia',
        items:
          'PHP, Laravel, Vue 3, TypeScript, PostgreSQL, MySQL, Redis, Docker, Git, GitHub Actions, Linux',
      },
      { h: 'Testes', items: 'PHPUnit, Pest, Vitest' },
      { h: 'IA', items: 'Claude Code, agentes e MCPs, GitHub Copilot, Ollama' },
      { h: 'Arquitetura', items: 'Multi-tenant, Clean Architecture, SOLID, DDD' },
    ],
    eduTitle: 'Formação',
    edu: 'Análise e Desenvolvimento de Sistemas, Universidade de Passo Fundo (trancado)',
    ctaTalk: 'Falar comigo',
  },
  sites: {
    pinLabel: 'Seu negócio aqui',
    kicker: 'Sites para comércio local',
    title: 'Seu negócio aparecendo no Google, com a cara dele.',
    lede: 'Faço o site do seu restaurante ou loja, coloco no ar e cuido dele todo mês. Você continua atendendo pelo WhatsApp, só que agora mais gente te acha.',
    whatsapp: 'Chamar no WhatsApp',
    whatsappFallback: 'Mandar um e-mail',
    whatsappMessage: 'Oi Mateus, vi o site e quero saber como funciona.',
    whyTitle: 'Por que ter site',
    why: [
      { k: 'Te acham no Google.', d: 'Quem procura "pizzaria perto de mim" cai em quem aparece.' },
      {
        k: 'Cardápio, horário e endereço num lugar só.',
        d: 'Sem depender do cliente rolar o Instagram.',
      },
      {
        k: 'O pedido continua chegando no WhatsApp.',
        d: 'O site leva o cliente até você, não muda seu jeito de atender.',
      },
    ],
    howTitle: 'Como funciona',
    how: [
      { k: 'A gente conversa.', d: 'Você me conta do negócio, eu pergunto o que importa.' },
      {
        k: 'Monto uma prévia.',
        d: 'Com seu logo, suas fotos e seu jeito. Você vê antes de decidir.',
      },
      { k: 'O site entra no ar.', d: 'Com endereço próprio (seunegocio.com.br) e mapa.' },
      {
        k: 'Eu cuido todo mês.',
        d: 'Mudou horário, prato ou promoção? Me manda que eu atualizo.',
      },
    ],
    examplesTitle: 'Feitos aqui perto.',
    priceTitle: 'Preço',
    price: 'Preço justo, combinado na conversa. Sem fidelidade longa.',
    faqTitle: 'Perguntas rápidas',
    faq: [
      {
        q: 'Preciso entender de internet?',
        a: 'Não. Você me manda as fotos e as informações, eu faço o resto.',
      },
      { q: 'Quanto tempo leva?', a: 'Poucos dias depois da conversa.' },
      { q: 'E se eu quiser mudar algo?', a: 'Me chama no WhatsApp. Faz parte da mensalidade.' },
      { q: 'O site é meu?', a: 'O endereço (seunegocio.com.br) fica no seu nome.' },
    ],
    closeTitle: 'Bora colocar seu negócio no mapa?',
    closeLine: 'Tudo pelo WhatsApp, esteja seu negócio onde estiver.',
  },
  caseStudy: {
    back: 'Voltar para o início',
    next: 'Próximo case',
    live: 'Ver no ar',
    code: 'Código',
    year: 'Ano',
    role: 'Meu papel',
    stack: 'Stack',
    reading: 'Leitura',
    minutes: 'min',
    sections: {
      problem: 'Problema',
      role: 'Meu papel',
      decisions: 'Decisões',
      result: 'Resultado',
      next: 'Próximo passo',
    },
    chose: 'Escolhi',
    discarded: 'Descartei',
    why: 'Por quê',
  },
  notFound: {
    title: 'Essa página não existe.',
    text: 'O endereço pode ter mudado. Volte pro início e siga por lá.',
    cta: 'Ir para o início',
  },
  footer: {
    line: 'Desenvolvedor full-stack, Laravel e Vue.',
  },
}

export type Messages = typeof pt
export default pt
