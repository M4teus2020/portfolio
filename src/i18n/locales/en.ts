import type { Messages } from './pt'

const en: Messages = {
  meta: {
    homeTitle: 'Mateus Felini · Full-stack developer (Laravel and Vue)',
    homeDescription:
      'Full-stack developer (Laravel and Vue). Three years building web systems for the financial sector, from credit unions to multi-tenant platforms.',
    aboutTitle: 'About · Mateus Felini',
    sitesTitle: 'Websites for local businesses · Mateus Felini',
    sitesDescription:
      'A website for your restaurant or shop, live in a few days and looked after every month.',
    notFoundTitle: 'Page not found · Mateus Felini',
  },
  nav: {
    home: 'Home',
    projects: 'Projects',
    about: 'About',
    sites: 'Websites',
    contact: 'Contact',
    switchLocale: 'Ler em português',
    skip: 'Skip to content',
  },
  common: {
    resume: 'Download résumé',
    copyEmail: 'Copy email',
    copied: 'Email copied',
  },
  home: {
    kicker: 'Full-stack developer, Laravel and Vue',
    title: 'I build web systems that companies use all day long.',
    lede: 'Three years in production in the financial sector: collections, customer service, auditing. From the database to the screen, with code the next developer can actually read.',
    facts: ['Remote or hybrid', 'Native Portuguese, advanced English'],
    ctaTimeline: 'See my path',
    proof: [
      { big: '3+ years', small: 'in production, since April 2023' },
      { big: '150k+', small: 'records a day on the platform I work on today' },
      { big: 'AI in the method', small: 'not instead of it: Claude Code with tests and review' },
    ],
    projects: {
      title: 'Projects',
      sub: 'Problem, decision and result. One at a time, told well.',
      read: 'Read the case',
    },
    work: {
      title: 'How I work.',
      items: [
        {
          k: 'I understand the business before the code.',
          d: 'Financial software does not forgive a misread rule. I keep asking until I know why the rule exists.',
        },
        {
          k: 'Test first, agent second.',
          d: 'I write the test, let Claude Code propose the implementation and review it. The test is the spec the agent cannot talk its way around.',
        },
        {
          k: 'Performance is part of shipping.',
          d: 'Slow queries, N+1 and reports that hang become tasks, not something for later.',
        },
        {
          k: 'Security from the first SQL line.',
          d: 'I started in plain PHP, writing SQL by hand. Distrusting every input became a habit.',
        },
      ],
      close:
        'AI does not make engineering decisions for me. It clears the repetitive part out of the way and leaves time for what matters.',
    },
    timeline: {
      title: 'Path.',
      items: [
        {
          years: '2024 to now',
          company: 'Soluct Soluções em Sistemas',
          text: 'Full-stack (Laravel and Vue) on a multi-tenant financial operations platform: integrations, dashboards and workflows teams use all day.',
        },
        {
          years: '2023 to 2024',
          company: 'HGV Sistemas',
          text: 'First developer job: PHP, MySQL and SQL Server on systems for the financial sector. Left after promotions, with internal tools that sped the team up.',
        },
      ],
      more: 'The full story is in About',
    },
    contact: {
      title: 'Shall we talk?',
      text: 'I answer email within one business day.',
    },
  },
  about: {
    title: 'From the shop counter to financial systems.',
    intro:
      "I'm Mateus. I've worked in web development since 2023, always on systems that handle someone's money: collections, customer service, auditing. I like this kind of software precisely because mistakes there cost something, and that forces you to do it right.",
    chapters: [
      {
        mark: 'Before',
        title: 'Before code',
        text: 'Before programming, I worked at a computer shop and did a bit of everything: computer and phone repair, sales, internet installs. That is where I learned how a small business works from the inside, and why I also build websites for local businesses today.',
      },
      {
        mark: '2023',
        title: 'HGV Sistemas',
        text: 'My first developer job. PHP with no framework, hand-written SQL, systems for the financial sector. I learned the weight of handling financial data there: I found and reported a critical security flaw in the system, and built a code generator that ended the copy and paste at the start of every feature. I also helped onboard the developers who joined after me.',
      },
      {
        mark: '2024',
        title: 'Soluct',
        text: 'I left HGV by choice: I wanted a modern stack and more room to grow, and I was willing to start over for it. At Soluct I work with Laravel, Vue and TypeScript on a multi-tenant financial operations platform, with integrations (WhatsApp, telephony, email, bank slips), queues, reports and performance work.',
      },
      {
        mark: 'Now',
        title: 'AI in the method',
        text: 'AI is part of my method: Claude Code, agents and automated tests in the same flow. Outside work, I used that approach to build a process that creates websites for restaurants and shops.',
      },
    ],
    bringTitle: 'What I bring to a team',
    bring: [
      'I understand business rules and ask the missing question.',
      'I take care of performance and security without needing a ticket for it.',
      'I write code with whoever maintains it next in mind.',
      'I use AI with judgment: fast without being careless.',
    ],
    toolsTitle: 'Tools',
    tools: [
      {
        h: 'Every day',
        items:
          'PHP, Laravel, Vue 3, TypeScript, PostgreSQL, MySQL, Redis, Docker, Git, GitHub Actions, Linux',
      },
      { h: 'Testing', items: 'PHPUnit, Pest, Vitest' },
      { h: 'AI', items: 'Claude Code, agents and MCPs, GitHub Copilot, Ollama' },
      { h: 'Architecture', items: 'Multi-tenant, Clean Architecture, SOLID, DDD' },
    ],
    eduTitle: 'Education',
    edu: 'Systems Analysis and Development, University of Passo Fundo (on hold)',
    ctaTalk: 'Get in touch',
  },
  sites: {
    pinLabel: 'Your business here',
    kicker: 'Websites for local businesses',
    title: 'Your business showing up on Google, looking like itself.',
    lede: 'I build the website for your restaurant or shop, put it online and look after it every month. You keep taking orders on WhatsApp, only now more people find you.',
    whatsapp: 'Message me on WhatsApp',
    whatsappFallback: 'Send an email',
    whatsappMessage: 'Hi Mateus, I saw the website and want to know how it works.',
    whyTitle: 'Why have a website',
    why: [
      {
        k: 'People find you on Google.',
        d: 'Whoever searches "pizza near me" lands on whoever shows up.',
      },
      {
        k: 'Menu, hours and address in one place.',
        d: 'No more customers scrolling through Instagram.',
      },
      {
        k: 'Orders still arrive on WhatsApp.',
        d: 'The website brings the customer to you, it does not change how you serve.',
      },
    ],
    howTitle: 'How it works',
    how: [
      { k: 'We talk.', d: 'You tell me about the business, I ask what matters.' },
      { k: 'I build a preview.', d: 'With your logo, your photos, your style. You see it before deciding.' },
      { k: 'The site goes live.', d: 'With its own address (yourbusiness.com.br) and a map.' },
      {
        k: 'I look after it every month.',
        d: 'New hours, dish or promotion? Send it to me and I update it.',
      },
    ],
    examplesTitle: 'Made nearby.',
    priceTitle: 'Price',
    price: 'A fair price, agreed in conversation. No long lock-in.',
    faqTitle: 'Quick questions',
    faq: [
      {
        q: 'Do I need to understand the internet?',
        a: 'No. Send me the photos and information, I do the rest.',
      },
      { q: 'How long does it take?', a: 'A few days after we talk.' },
      { q: 'What if I want to change something?', a: 'Message me on WhatsApp. It is part of the monthly fee.' },
      { q: 'Is the website mine?', a: 'The address (yourbusiness.com.br) is registered in your name.' },
    ],
    closeTitle: 'Ready to put your business on the map?',
    closeLine: 'All over WhatsApp, wherever your business is.',
  },
  caseStudy: {
    back: 'Back to home',
    next: 'Next case',
    live: 'See it live',
    code: 'Code',
    year: 'Year',
    role: 'My role',
    stack: 'Stack',
    reading: 'Reading',
    minutes: 'min',
    sections: {
      problem: 'Problem',
      role: 'My role',
      decisions: 'Decisions',
      result: 'Result',
      next: 'Next step',
    },
    chose: 'Chose',
    discarded: 'Discarded',
    why: 'Why',
  },
  notFound: {
    title: 'This page does not exist.',
    text: 'The address may have changed. Head back home and continue from there.',
    cta: 'Go home',
  },
  footer: {
    line: 'Full-stack developer, Laravel and Vue.',
  },
}

export default en
