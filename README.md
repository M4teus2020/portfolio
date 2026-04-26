# Portfólio — Mateus Felini

A modern, interactive portfolio showcasing skills, experience, and projects with a distinctive **Terminal/CLI aesthetic**. Built with Vue 3, TypeScript, and Tailwind CSS v4.

## 🎨 Design & Aesthetic

The portfolio features a **Terminal/CLI design philosophy** reminiscent of classic command-line interfaces, with:

- **Font**: JetBrains Mono for authentic code aesthetics
- **Default Theme**: Dark mode with optional light mode toggle
- **Accent Colors**: Four selectable color schemes (green, amber, cyan, pink)
- **Theme System**: CSS variables applied at runtime via `document.documentElement`

## 🛠 Tech Stack

- **Framework**: Vue 3 with TypeScript
- **Styling**: Tailwind CSS v4
- **Internationalization**: vue-i18n v9 (EN/PT)
- **Build Tool**: Vite
- **Quality**: ESLint, Oxlint, Prettier, TypeScript strict mode

## ✨ Features

### Sections
- **Hero** — Eye-catching introduction with status badge
- **About** — Biography with theme toggle and availability indicator
- **AI** — Custom LLM integration section
- **Stack** — Tech skills showcase with categories
- **Timeline** — Career journey with animated counter
- **Playground** — Interactive demos:
  - Currency converter (6 currencies)
  - URL slug generator
  - SQL to Laravel Eloquent parser
- **Contact** — Email integration section
- **Boot Screen** — Nostalgic terminal animation on page load

### Theme System
- **Light/Dark Toggle**: Persistent theme preference with CSS variable overrides
- **Accent Colors**: Switch between green, amber, cyan, or pink
- **Responsive Design**: Adapts from desktop to mobile (burger menu)
- **CSS Variables**: Seamlessly integrated with Tailwind v4 via `@theme inline`

### Internationalization
- **Dual Language**: Portuguese and English support
- **Type-Safe Messages**: Typed message objects in `src/i18n/locales/`
- **Composable API**: `useT()` returns fully typed locale messages
- **Locale Toggle**: `useLocale()` for switching languages

### Configuration
- **Availability Flag** (`src/config/availability.ts`): Toggle to show "looking for a role" badge and about section text
- **Easy Customization**: Modify accent colors, add languages, or create new playground demos

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 20.19.0 or ≥ 22.12.0
- npm 10+

### Installation & Development

```sh
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Type-check, build, and minify for production
npm run build

# Preview production build locally
npm preview

# Linting and formatting
npm run lint
npm run format
```

## 📁 Project Structure

```
src/
├── components/           # Vue components
│   ├── ui/              # Reusable UI components (SectionShell, TerminalPrompt, etc.)
│   ├── [Section]Section.vue  # Page sections (Hero, About, Stack, Timeline, etc.)
│   ├── App*.vue         # App-level components (TopBar, Footer, BootScreen)
│   └── Playground*.vue  # Interactive demo components
├── composables/         # Reusable Vue composables
│   ├── useTheme.ts      # Theme & accent color management
│   ├── useCountUp.ts    # Animated counter effect
│   ├── useIntersect.ts  # Scroll-triggered animations
│   └── useBootScreen.ts # Boot screen animation
├── i18n/                # Internationalization
│   ├── locales/         # Translation files (pt.ts, en.ts)
│   ├── types.ts         # Type definitions for messages
│   ├── useT.ts          # Typed i18n composable
│   └── index.ts         # i18n configuration
├── config/              # Configuration files
│   └── availability.ts  # Role availability toggle
├── App.vue              # Root component
└── main.ts              # Entry point

public/                  # Static assets
```

## 🎯 Key Files to Customize

### 1. Availability Status
Edit `src/config/availability.ts`:
```typescript
export const available = true; // Toggle role availability
```

### 2. Theme Colors
CSS variables in your tailwind config or global styles:
```css
:root {
  --bg: /* dark background */;
  --surface: /* card/surface color */;
  --text: /* text color */;
  --accent: /* accent color */;
}
```

### 3. Translations
Add new languages or update existing ones in `src/i18n/locales/`:
- `pt.ts` — Portuguese
- `en.ts` — English

### 4. Playground Demos
Modify or add interactive demos in `src/components/` (e.g., `PlaygroundSection.vue`)

## 🔧 Development Tips

### IDE Setup
- **VS Code** + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
  - Disable Vetur if installed
- **Hot Module Replacement (HMR)**: Enabled by default in dev mode

### Browser DevTools
- **Chrome/Edge/Brave**: [Vue.js DevTools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) + Custom Object Formatter
- **Firefox**: [Vue.js DevTools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/) + Custom Object Formatter

### Type Checking
TypeScript types for `.vue` files are handled by `vue-tsc`:
```sh
npm run type-check  # Full type check
```

## 📦 Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check, build & minify |
| `npm run build-only` | Build without type-checking |
| `npm run preview` | Preview production build |
| `npm run type-check` | Run TypeScript type-checking |
| `npm run lint` | Lint with ESLint & Oxlint |
| `npm run lint:oxlint` | Run Oxlint fixer |
| `npm run lint:eslint` | Run ESLint fixer |
| `npm run format` | Format code with Prettier |

## 🌐 Deployment

This is a static SPA and can be deployed to:
- **Vercel** — Zero-config deployment
- **GitHub Pages** — Static hosting
- **Netlify** — Drag-and-drop deployment
- **Any static host** — Contents of `dist/` after `npm run build`

## 📝 License

This project is personal work. See LICENSE file (if present) for details.

---

**Author**: Mateus Felini  
**Email**: mfelini7@gmail.com  
**Repository**: [GitHub](https://github.com/mfelini/portifolio)
