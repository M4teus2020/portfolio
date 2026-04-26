export interface StackGroup {
  h: string
  items: string[]
}

export interface AiItem {
  k: string
  d: string
}

export interface TimelineItem {
  year: string
  role: string
  company: string
  location: string
  bullets: string[]
}

export interface PlayItem {
  t: string
  d: string
}

export interface Messages {
  nav: {
    about: string
    stack: string
    ai: string
    timeline: string
    play: string
    contact: string
  }
  hero: {
    role: string
    location: string
    name: string
    tagline: string
    sub: string
    cta: string
    cta2: string
  }
  about: {
    kicker: string
    title: string
    body: string
    facts: [string, string][]
    now: string
    nowItemsBase: string[]
    nowItemLooking: string
  }
  stack: {
    kicker: string
    title: string
    groups: StackGroup[]
  }
  ai: {
    kicker: string
    title: string
    sub: string
    items: AiItem[]
    quote: string
  }
  timeline: {
    kicker: string
    title: string
    items: TimelineItem[]
  }
  play: {
    kicker: string
    title: string
    sub: string
    items: PlayItem[]
    outputLabel: string
  }
  contact: {
    kicker: string
    title: string
    sub: string
    name: string
    email: string
    msg: string
    send: string
    or: string
    placeholderName: string
    placeholderEmail: string
    placeholderMsg: string
    sent: string
  }
  footer: {
    built: string
  }
}
