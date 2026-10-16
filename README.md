# felini.dev

Portfólio de Mateus Felini, desenvolvedor full-stack (Laravel e Vue) em Ibiaçá, RS.

## Páginas

| Rota | Pra quem | O que faz |
|---|---|---|
| `/` | Recrutador | Quem é, como trabalha, trajetória e contato |
| `/sobre` | RH, gestor | A história completa |
| `/servicos` | Cliente | Sites para comércio local e sistemas sob medida, contato por WhatsApp |
| `/sites` | Cliente (crédito nos rodapés) | Leva direto a `/servicos#sites`. Não remover |
| `/projetos/<slug>` | Tech lead | Estudo de caso: problema, papel, decisões, resultado |

## Onde mexer

- Textos: `src/i18n/locales/pt.ts` (fonte) e `en.ts`. Rascunho aprovado em `COPY.md`.
- Contato, WhatsApp, currículo e foto: `src/config/site.ts`.
- Cases: `src/data/cases.ts`. Vazio, a seção Projetos fica escondida.
- Exemplos de sites em `/servicos`: `src/data/siteExamples.ts`. Vazio, a seção fica escondida.

## Stack

Vue 3, TypeScript, Vue Router, vue-i18n, Tailwind CSS v4, Vite. Deploy no GitHub Pages pelo push na `main` (o build copia `index.html` para `404.html` pra as rotas abrirem direto).

```bash
npm install
npm run dev
npm run build
```
