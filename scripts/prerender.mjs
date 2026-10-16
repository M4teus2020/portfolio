// Gera uma página HTML por rota com as metas certas, para o cartão do link
// (WhatsApp, LinkedIn) e para o Google, que não rodam o JS do SPA.
// O GitHub Pages serve /sobre a partir de sobre.html, sem redirecionar.
// Textos iguais aos de src/i18n/locales/pt.ts (meta): mudou lá, muda aqui.
import { readFileSync, writeFileSync, copyFileSync } from 'node:fs'

const SITE = 'https://felini.dev'
const base = readFileSync('dist/index.html', 'utf8')

const services = {
  title: 'Serviços · Mateus Felini',
  description:
    'Sites para comércio local e sistemas sob medida (painéis, automações e integrações com WhatsApp, boleto e e-mail).',
  path: '/servicos',
  image: '/og-servicos.png',
}

const pages = {
  sobre: {
    title: 'Sobre · Mateus Felini',
    description:
      'Do balcão de uma loja de informática a sistemas para o setor financeiro: a trajetória de Mateus Felini, desenvolvedor full-stack (Laravel e Vue).',
    path: '/sobre',
    image: '/og.png',
  },
  servicos: services,
  // /sites é o destino do crédito nos rodapés dos clientes: mesmo cartão de /servicos.
  sites: services,
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function render(meta) {
  const url = SITE + meta.path
  return base
    .replace(/<title>.*?<\/title>/s, `<title>${esc(meta.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/s, `$1${esc(meta.description)}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/s, `$1${esc(meta.title)}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/s, `$1${esc(meta.description)}$2`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/s, `$1${url}$2`)
    .replace(/(<meta\s+property="og:image"\s+content=")[^"]*(")/s, `$1${SITE}${meta.image}$2`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/s, `$1${url}$2`)
}

for (const [file, meta] of Object.entries(pages)) {
  const html = render(meta)
  if (html === base) throw new Error(`prerender: nada trocado em ${file}`)
  writeFileSync(`dist/${file}.html`, html)
}

// Rotas sem página própria (/projetos/<slug>, 404) caem no SPA.
copyFileSync('dist/index.html', 'dist/404.html')
console.log(`prerender: ${Object.keys(pages).join(', ')} + 404`)
