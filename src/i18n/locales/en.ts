import type { Messages } from '../types'

const en: Messages = {
  nav: {
    about: 'About',
    stack: 'Stack',
    ai: 'AI',
    timeline: 'Timeline',
    play: 'Playground',
    contact: 'Contact',
  },
  hero: {
    role: 'Full-stack Developer',
    location: 'Rio Grande do Sul — Brazil',
    name: 'Mateus Felini',
    tagline: 'I build full-stack products with Laravel & Vue.',
    sub: "Three years shipping interfaces that don't freeze, APIs that don't fall over, and code other people can still read next quarter.",
    cta: 'See timeline',
    cta2: 'Get in touch',
  },
  about: {
    kicker: 'About',
    title: 'Mid-level full-stack engineer, 3 years on the road.',
    body: "I work mostly with Laravel and Vue — that pair lets me ship features end-to-end quickly and with confidence. I care about readable code, tests that actually matter, and architecture decisions next-year-me won't hate.",
    facts: [
      ['Experience', '3 years'],
      ['Based in', 'RS · Brazil'],
      ['Favorite stack', 'Laravel + Vue'],
      ['Work type', 'Full-time · Contract · Remote'],
    ],
    now: 'Right now',
    nowItemsBase: [
      'Exploring TDD combined with AI agents — tests drive the pair programming',
      'Going deep on hexagonal architecture in PHP',
      'Reading about DDD applied to legacy systems',
    ],
    nowItemLooking: 'Looking for the next role — global-remote or BR',
  },
  stack: {
    kicker: 'Stack',
    title: 'Tools I reach for daily.',
    groups: [
      { h: 'Backend', items: ['Laravel', 'PHP 8.3', 'Node', 'Postgres', 'MySQL', 'Redis', 'Docker'] },
      { h: 'Frontend', items: ['Vue 3', 'Nuxt', 'Inertia', 'TypeScript', 'TailwindCSS', 'Vite'] },
      { h: 'Infra & Ops', items: ['AWS', 'GitHub Actions', 'Linux', 'nginx'] },
      { h: 'AI / Agents', items: ['Claude Code', 'GitHub Copilot', 'Anthropic API', 'OpenAI API'] },
      { h: 'Practices', items: ['TDD', 'Clean Architecture', 'Code Review', 'Pair Programming'] },
    ],
  },
  ai: {
    kicker: 'AI in the loop',
    title: 'How I work with AI.',
    sub: "I'm not a \"dev who uses ChatGPT\" — AI is part of my setup, like Git. I use Claude Code and GitHub Copilot as thinking partners, not crutches.",
    items: [
      {
        k: 'Claude Code as a senior pair',
        d: "I use Claude Code for large refactors, legacy-code archaeology and architecture sketching.",
      },
      {
        k: 'Copilot in the flow',
        d: 'GitHub Copilot as turbo-autocomplete — test boilerplate, Laravel resources, Vue prop typing. Zero friction, hands never leave the keyboard.',
      },
      {
        k: 'TDD + agent = fast loop',
        d: "I write the test first, let the agent propose the implementation, refine. Tests act as executable spec — the agent can't fake a green run.",
      },
      {
        k: 'Assisted review before PR',
        d: "I run diffs through an agent before opening a PR — catches naming inconsistencies, forgotten N+1s, leftover TODOs. Smells I'd miss at 6pm on a Friday.",
      },
      {
        k: 'Absurdly fast prototyping',
        d: "Mock endpoints, realistic seeds, interactive playgrounds and POCs ship in minutes. What used to be \"I'll look into it this weekend\" becomes \"let me show you now\".",
      },
      {
        k: 'LLM features in production',
        d: "I've integrated LLMs in real flows: structured document extraction, ticket auto-summary, cadastro enrichment. Prompt engineering and knowing the model's limits are part of the job.",
      },
    ],
    quote: '"AI doesn\'t replace engineering judgment. It replaces the boring half of it — so I can spend energy on what matters."',
  },
  timeline: {
    kicker: 'Timeline',
    title: "Where I've been.",
    items: [
      {
        year: 'Jun 2024 — now',
        role: 'Full-stack Developer',
        company: 'Soluct Soluções em Sistemas',
        location: 'Tapejara, RS · Hybrid',
        bullets: [
          'Started on front-end and grew into full-stack (Vue 3 + Laravel), shipping internal management systems for the financial sector and credit unions.',
          'Engineered CRMs, analytics dashboards and onboarding flows — focus on end-user operational efficiency.',
          'Advanced modules for document management and integration with third-party APIs.',
          'TypeScript + Vue Router on a typed, scalable front-end architecture connected to robust Laravel back-ends.',
        ],
      },
      {
        year: 'Apr 2023 — Jun 2024',
        role: 'Web Developer',
        company: 'HGV Sistemas',
        location: 'Tapejara, RS · On-site',
        bullets: [
          'Development and maintenance of internal management systems for financial institutions and credit unions.',
          'Control tools, reports and data panels in PHP 7 with MVC on an in-house framework.',
          'Full software-lifecycle work — from secure information processing to sector-specific business rules.',
        ],
      },
    ],
  },
  play: {
    kicker: 'Playground',
    title: 'Interactive demos.',
    sub: 'Small experiments. Click around. (Growing — more demos coming soon.)',
    items: [
      { t: 'FX converter', d: 'Currency conversion with local rates.' },
      { t: 'Slug generator', d: 'Input → URL-friendly slug, in real-time.' },
      { t: 'SQL → Eloquent', d: 'Paste a SELECT, get an Eloquent query.' },
    ],
    outputLabel: 'Output',
  },
  contact: {
    kicker: 'Contact',
    title: "Let's chat?",
    sub: 'I reply within 24h on business days. Email preferred, carrier pigeon accepted.',
    name: 'Name',
    email: 'Email',
    msg: 'Message',
    send: 'Send message',
    or: 'or reach me at',
    placeholderName: 'What should I call you?',
    placeholderEmail: 'you@company.com',
    placeholderMsg: 'Share a bit about the project, context and timeline.',
    sent: 'Message sent. Talk soon!',
  },
  footer: {
    built: 'Built in 2026 by Mateus Felini — Laravel + Vue, as always.',
  },
}

export default en
