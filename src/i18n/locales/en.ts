import type { Messages } from './pt'

const en: Messages = {
  meta: {
    homeTitle: 'Mateus Felini · Full-stack developer (Laravel and Vue)',
    homeDescription:
      'Full-stack developer (Laravel and Vue). Three years building web systems for the financial sector: collections, customer service and auditing.',
    aboutTitle: 'About · Mateus Felini',
    servicesTitle: 'Services · Mateus Felini',
    servicesDescription:
      'Websites for local businesses and custom systems (dashboards, automations and integrations with WhatsApp, boleto payments and email).',
    notFoundTitle: 'Page not found · Mateus Felini',
  },
  nav: {
    home: 'Home',
    projects: 'Projects',
    about: 'About',
    services: 'Services',
    contact: 'Contact',
    switchLocale: 'Ler em português',
    switchTheme: 'Switch between light and dark theme',
    menu: 'Open menu',
    close: 'Close menu',
    skip: 'Skip to content',
  },
  common: {
    copyEmail: 'Copy email',
    copied: 'Email copied',
  },
  home: {
    kicker: 'Full-stack developer, Laravel and Vue',
    title: 'I build web systems that companies use all day long.',
    lede: 'Three years in production in the financial sector: collections, customer service, auditing. From the database to the screen, with code the next developer can actually read.',
    facts: ['Native Portuguese, advanced English'],
    labels: {
      stack: 'stack',
      delivered: 'shipped',
      work: 'method',
      timeline: 'timeline',
      contact: 'contact',
      scroll: 'scroll',
    },
    ctaTalk: 'Get in touch',
    ctaTimeline: 'See experience',
    proof: [
      { big: '3+ years', small: 'in production, since April 2023' },
      { big: '150k+', small: 'records a day on the platform I work on today' },
      {
        big: '4 integrations',
        small: 'WhatsApp, telephony, email and boleto payments in production',
      },
    ],
    projects: {
      title: 'Projects',
      sub: 'Problem, decision and result. One at a time, told well.',
      read: 'Read the case',
    },
    delivered: {
      title: "What I've shipped.",
      items: [
        {
          k: 'Email that turns into a ticket on its own.',
          d: 'I led a module that reads emails through Microsoft Graph and creates tickets for the team, with a kanban per client and a visual node-based rules engine (conditions on the text and attachments).',
        },
        {
          k: 'Calls straight from the browser.',
          d: 'I built the core of a web dialer integrated with a telephony API: agents call customers without leaving the system.',
        },
        {
          k: 'Reports that stopped hanging.',
          d: 'I rewrote heavy queries with CTEs and removed N+1 with eager loading on a platform handling over 150,000 records a day.',
        },
        {
          k: 'A critical hole closed before it became a problem.',
          d: 'I found and reported a flaw that allowed running SQL from the front end of a financial system.',
        },
      ],
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
          d: 'I start with tests whenever I can: I write the test, let Claude Code propose the implementation and review it. The test is the spec the agent cannot talk its way around.',
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
      title: 'Experience.',
      items: [
        {
          years: '2024 to now',
          company: 'Soluct Soluções em Sistemas',
          text: 'Full-stack (Laravel and Vue) on a multi-tenant financial operations platform: integrations, dashboards and workflows teams use all day.',
        },
        {
          years: '2023 to 2024',
          company: 'HGV Sistemas',
          text: 'First developer job: PHP, MySQL and SQL Server on systems for the financial sector. Promoted more than once, and left internal tools that sped the team up.',
        },
      ],
      more: 'The full story is in About',
    },
    client: {
      title: 'Have a project?',
      text: 'I also build websites for local businesses and custom systems.',
      cta: 'See services',
    },
    contact: {
      title: 'Shall we talk?',
      text: 'I answer email within one business day.',
    },
  },
  about: {
    title: 'I started out fixing computers and installing internet.',
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
        text: 'I moved to Soluct by choice: I wanted a modern stack. At Soluct I work with Laravel, Vue and TypeScript on a multi-tenant financial operations platform, with integrations (WhatsApp, telephony, email, boleto payments), queues, reports and performance work.',
      },
      {
        mark: 'Now',
        title: 'AI in the method',
        text: 'AI is part of my method: Claude Code, agents and automated tests in the same flow. Outside work, I used that approach to build a process that creates websites for restaurants and shops.',
      },
    ],
    bringTitle: 'How I work',
    bring: [
      'I understand business rules and ask the missing question.',
      'I take care of performance and security without needing a ticket for it.',
      'I write code with whoever comes next in mind.',
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
  services: {
    kicker: 'Services',
    title: "From your shop's website to your company's systems.",
    lede: 'You work directly with me, from the first conversation until everything runs. Pick where to start:',
    pinLabel: 'Your business here',
    whatsapp: 'Message me on WhatsApp',
    whatsappFallback: 'Send an email',
    offers: [
      {
        id: 'sites',
        k: 'Websites for local businesses.',
        d: 'Your business on Google, looking like you.',
        cta: 'See websites',
      },
      {
        id: 'sistemas',
        k: 'Custom systems.',
        d: 'The system your team needs, without spreadsheets and rework.',
        cta: 'See systems',
      },
    ],
    sites: {
      kicker: 'Websites for local businesses',
      title: 'Your business on Google, looking like you.',
      lede: 'I build the website for your restaurant or shop, put it online and look after it every month. You keep taking orders on WhatsApp, only now more people find you.',
      ledeFromClient:
        'Saw the website you came from? I built it. I build one for your restaurant or shop, put it online and look after it every month.',
      identity: "I'm Mateus, a developer for more than three years. You talk directly to me.",
      whatsappMessage: 'Hi Mateus, I saw the website and want to know how it works.',
      whyTitle: 'Why have a website',
      why: [
        {
          k: 'Easier to find you on Google.',
          d: 'Whoever searches "pizza near me" finds the places with address, hours and menu online.',
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
        {
          k: 'I build a preview.',
          d: 'With your logo, your photos, your style. You see it before deciding.',
        },
        { k: 'The site goes live.', d: 'With its own address (yourbusiness.com.br) and a map.' },
        {
          k: 'I look after it every month.',
          d: 'New hours, dish or promotion? Send it to me and I update it.',
        },
      ],
      examplesTitle: 'Made by me.',
      priceTitle: 'Price',
      price: 'A fair price, agreed in conversation. No long lock-in.',
    },
    systems: {
      kicker: 'Custom systems',
      title: 'When the spreadsheet can no longer keep up.',
      lede: 'Or when your team loses hours moving information from one place to another. I build the system that takes that work out of the way.',
      whatsappMessage: 'Hi Mateus, I saw your website and want to talk about a system.',
      whatTitle: 'What I build',
      what: [
        {
          k: 'Management dashboards.',
          d: 'Sales, collections and customer service in one place, updated on their own.',
        },
        {
          k: 'Automations.',
          d: 'The repetitive task someone does every day becomes an automatic routine: reports, reminders, work distribution.',
        },
        {
          k: 'Integrations.',
          d: 'Your system talking to WhatsApp, boleto payments, email and whatever else the company already uses.',
        },
        {
          k: 'Internal portals.',
          d: 'Sign-ups, approvals and tracking in a system built around how your team works.',
        },
      ],
      trustTitle: 'Why trust me',
      trust:
        'For more than three years I have built systems for the financial sector, where mistakes cost money. Today I work on a platform that processes over 150,000 records a day, with WhatsApp, telephony, email and boleto payment integrations. For example, I built a system that turns emails into tickets for the team with automatic rules, and a dialer that calls customers straight from the browser.',
      howTitle: 'How it works',
      how: [
        { k: 'We talk.', d: 'I understand the problem and how the work gets done today.' },
        { k: 'Written proposal.', d: 'What will be built, how long it takes and what it costs.' },
        { k: 'Delivered in parts.', d: 'You start using it early and tell me what to adjust.' },
        { k: 'I stay with you.', d: 'Once it is done, I handle adjustments and improvements.' },
      ],
      tech: 'Built with Laravel and Vue: mature technology, easy to maintain, and easy to find another developer for if you ever need one.',
      priceTitle: 'Price',
      price:
        'Every system is its own project: the price comes from our conversation, with a written proposal.',
    },
    faqTitle: 'Quick questions',
    faq: [
      {
        q: 'Do I need to understand technology?',
        a: 'No. Tell me what you need, I take care of the technical side.',
      },
      {
        q: 'Do you work with companies anywhere?',
        a: 'Yes. Everything can be done remotely, over WhatsApp and video calls.',
      },
      {
        q: 'How long does it take?',
        a: 'Website: a few days after we talk. System: it depends on the size, and the deadline goes in the proposal.',
      },
      {
        q: 'Can we start small?',
        a: 'Yes. I start with the problem that weighs most today and the rest grows later.',
      },
      {
        q: 'What if I want to change something later?',
        a: 'Message me on WhatsApp. For websites it is part of the monthly fee; for systems, we agree on it in the proposal.',
      },
      {
        q: 'Is the website mine?',
        a: 'The address (yourbusiness.com.br) is registered in your name.',
      },
    ],
    closeTitle: 'Shall we talk about your project?',
    closeMessage: 'Hi Mateus, I saw your website and want to talk about a project.',
    closeLine: 'I reply on WhatsApp, wherever your business is.',
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
