import type { Locale } from '@/i18n'

export interface CaseDecision {
  chose: string
  discarded: string
  why: string
}

export interface CaseContent {
  name: string
  summary: string
  role: string
  problem: string
  myRole: string
  decisions: CaseDecision[]
  result: string
  next: string
}

export interface CaseStudy {
  slug: string
  year: string
  stack: string[]
  readingMinutes: number
  liveUrl?: string
  codeUrl?: string
  // Imagens dentro de /public, mostradas no Resultado.
  images?: { src: string; alt: Record<Locale, string> }[]
  content: Record<Locale, CaseContent>
}

// Começa vazio de propósito: a seção Projetos só aparece quando houver case bom.
export const cases: CaseStudy[] = []

export function findCase(slug: string) {
  return cases.find((c) => c.slug === slug)
}
