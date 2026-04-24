export type Accent = 'green' | 'amber' | 'cyan' | 'pink'
export type Theme = 'dark' | 'light'

export const AVAILABILITY = {
  available: false,
  accent: 'green' as Accent,
  defaultTheme: 'dark' as Theme,
} as const
