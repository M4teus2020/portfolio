<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { CONTACT, PHOTO_URL, WHATSAPP } from '@/config/site'
import { siteExamples, type Niche } from '@/data/siteExamples'
import { useMeta } from '@/composables/useMeta'
import { theme, toggleTheme } from '@/motion/theme'
import LogoMark from '@/components/LogoMark.vue'
import StackMarquee from '@/components/StackMarquee.vue'
import ContourField from '@/components/ContourField.vue'

// Página de venda da prospecção (dono de comércio, no celular, vindo de mensagem fria).
// Sem menu do portfólio e só em português. Um objetivo: chamar no WhatsApp pedindo a demonstração.
// Nenhuma classe daqui está na lista REVEAL de motion/init.ts: o conteúdo aparece sem depender do scroll.
useMeta(() => ({
  title: 'Site para comércio local · Mateus Felini',
  description:
    'Veja a cara do site do seu negócio antes de pagar. Eu monto a página inicial com o seu logo e as suas fotos, sem custo e sem compromisso.',
}))

// Link personalizado da abordagem: /sites?n=Pizzaria%20Bella. Só texto (interpolação, nunca v-html),
// sem caracteres de controle ou de formatação invisível, no máximo 60 caracteres.
const route = useRoute()
const nome = computed(() => {
  const q = route.query.n
  const raw = (Array.isArray(q) ? q[0] : q) ?? ''
  return raw
    .replace(/[\p{Cc}\p{Cf}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 60)
    .trim()
})

const wa = (msg: string) =>
  WHATSAPP
    ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`
    : `mailto:${CONTACT.email}?body=${encodeURIComponent(msg)}`
const href = computed(() =>
  wa(
    nome.value
      ? `Oi Mateus, vi a página de sites e quero a demonstração para o meu negócio: ${nome.value}.`
      : 'Oi Mateus, vi a página de sites e quero a demonstração do meu negócio.',
  ),
)
const hrefSistema = wa(
  'Oi Mateus, vi a página de sites e quero conversar sobre um sistema sob medida.',
)
const target = WHATSAPP ? '_blank' : undefined
const ctaLabel = WHATSAPP ? 'Pedir minha demonstração' : 'Pedir minha demonstração por e-mail'

// Torque e Prumo na frente (os preferidos do Mateus); exemplo novo entra no fim.
const ordem = ['Torque', 'Prumo', 'Lume', 'Faísca', 'Fio Reto', 'Paiol']
const rank = (n: string) => {
  const i = ordem.findIndex((o) => n.includes(o))
  return i < 0 ? ordem.length : i
}
const modelos = [...siteExamples].sort((a, b) => rank(a.name) - rank(b.name))

// Nome curto pros botões do baralho ("Torque Pneus & Mecânica" vira "Torque").
const curto = (n: string) =>
  n
    .replace(/^(Lancheria|Agropecuária) /, '')
    .replace(/ (Barbearia|Pneus.*|Contabilidade|Odontologia)$/, '')
const ramo: Record<Niche, string> = {
  restaurante: 'Lancheria',
  salao: 'Barbearia',
  oficina: 'Oficina',
  servicos: 'Contabilidade',
  clinica: 'Odontologia',
  agropecuaria: 'Agropecuária',
  pet: 'Pet shop',
}

const ramos = [
  'Dentista',
  'Lancheria',
  'Pizzaria',
  'Pet shop',
  'Barbearia',
  'Salão de beleza',
  'Oficina',
  'Contabilidade',
  'Restaurante',
  'Agropecuária',
]

const passos = [
  {
    k: 'Você me chama no WhatsApp',
    d: 'Me manda o nome do negócio e o Instagram ou o perfil do Google, se tiver.',
  },
  {
    k: 'Eu monto a demonstração',
    d: 'Faço a página inicial com o seu logo e as suas fotos e te mando o link. Não custa nada.',
  },
  {
    k: 'Você decide',
    d: 'Gostou? Te passo o orçamento. Com a sua aprovação, faço o site completo e coloco no ar.',
  },
]

const planos = [
  {
    k: 'Site de 1 página',
    d: 'Uma página só, com o principal do seu negócio e o botão do WhatsApp.',
    v: '297',
  },
  {
    k: 'Site completo',
    d: 'Várias páginas, com espaço para serviços, cardápio, fotos e o que mais precisar mostrar.',
    v: '697',
  },
]

const duvidas = [
  {
    k: 'A demonstração tem custo?',
    d: 'Não. Eu monto a página inicial do seu negócio e te mando o link. Se gostar, passo o orçamento do site completo. Se não fizer sentido, fica por isso mesmo.',
  },
  {
    k: 'Quanto tempo leva?',
    d: 'Eu respondo em até 1 dia. O prazo da demonstração e do site eu te passo nessa conversa, porque depende do que o seu negócio precisa.',
  },
  {
    k: 'Tem mensalidade?',
    d: 'Não. Você paga uma vez. O domínio .com.br do primeiro ano e a configuração já estão no preço.',
  },
  { k: 'O site fica no meu nome?', d: 'Sim. O endereço .com.br é registrado no seu nome.' },
  {
    k: 'Esses modelos são de clientes?',
    d: 'Não. São negócios inventados que eu fiz para mostrar o trabalho. A sua demonstração é feita com o seu negócio: o seu logo, as suas fotos.',
  },
]

// Baralho do herói: depth 0 é o site da frente; 1 e 2 aparecem em leque atrás; o resto espera.
const front = ref(0)
const depth = (i: number) => (i - front.value + modelos.length) % modelos.length
const atual = computed(() => modelos[front.value])
let timer: ReturnType<typeof setInterval> | undefined
const stopAuto = () => {
  clearInterval(timer)
  timer = undefined
}
const pick = (i: number) => {
  stopAuto()
  front.value = i
}
// No celular os botões rolam de lado: mantém o ativo à vista sem mexer na rolagem da página.
const pickerEl = ref<HTMLElement>()
watch(front, (i) => {
  const el = pickerEl.value
  const b = el?.children[i] as HTMLElement | undefined
  if (el && b && el.scrollWidth > el.clientWidth)
    el.scrollTo({ left: b.offsetLeft - (el.clientWidth - b.offsetWidth) / 2, behavior: 'smooth' })
})

// Variações com ?n= não viram páginas no Google: o canônico é sempre /sites.
const CANON = 'https://felini.dev/sites'
let prevCanon: string | null = null

// Barra fixa do celular: só aparece quando nenhum botão grande está na tela.
const dockOn = ref(false)
const themeBtn = ref<HTMLButtonElement>()
let io: IntersectionObserver | undefined
onMounted(() => {
  const canon = document.querySelector('link[rel="canonical"]')
  prevCanon = canon?.getAttribute('href') ?? null
  canon?.setAttribute('href', CANON)

  const seen = new Set<Element>()
  io = new IntersectionObserver((es) => {
    es.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)))
    dockOn.value = seen.size === 0
  })
  document.querySelectorAll('[data-cta]').forEach((el) => io!.observe(el))
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && modelos.length > 1)
    timer = setInterval(() => (front.value = (front.value + 1) % modelos.length), 4200)
})
onBeforeUnmount(() => {
  if (prevCanon) document.querySelector('link[rel="canonical"]')?.setAttribute('href', prevCanon)
  io?.disconnect()
  stopAuto()
})
</script>

<template>
  <div class="sales">
    <div class="deep hero" data-hero>
      <div class="top wrap">
        <p class="who">
          <LogoMark />
          <span>Mateus Felini</span>
        </p>
        <button
          ref="themeBtn"
          type="button"
          class="tool"
          aria-label="Trocar tema claro e escuro"
          title="Trocar tema"
          :aria-pressed="theme === 'dark'"
          @click="toggleTheme(themeBtn)"
        >
          <svg class="ico" viewBox="0 0 24 24" aria-hidden="true">
            <g class="sun">
              <circle cx="12" cy="12" r="4.2" />
              <path
                d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"
              />
            </g>
            <path class="moon" d="M20.5 14.2A8.6 8.6 0 0 1 9.8 3.5a8.6 8.6 0 1 0 10.7 10.7Z" />
          </svg>
        </button>
      </div>

      <section class="hero-grid wrap">
        <div class="pitch">
          <h1 v-if="nome">
            <span class="nome">{{ nome }},</span> veja a cara do seu site antes de pagar.
          </h1>
          <h1 v-else>Veja a cara do seu site antes de pagar.</h1>
          <p class="sub">
            Eu monto a página inicial do seu negócio com o seu logo e as suas fotos, sem custo. Se
            você gostar, a gente conversa sobre o site completo.
          </p>
          <a class="btn btn-solid cta" :href="href" :target="target" rel="noopener" data-cta>
            <svg class="wa" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>
            {{ ctaLabel }}
          </a>
          <p class="assure">Sem custo e sem compromisso. Respondo em até 1 dia.</p>
        </div>

        <div class="stage">
          <div class="deck">
            <a
              v-for="(m, i) in modelos"
              :key="m.name"
              class="win"
              :class="{ back: depth(i) > 0, off: depth(i) > 2 }"
              :style="{ '--k': Math.min(depth(i), 3) }"
              :href="m.url"
              target="_blank"
              rel="noopener"
              :tabindex="depth(i) === 0 ? 0 : -1"
              :aria-hidden="depth(i) !== 0"
              :aria-label="`Abrir o site de exemplo ${m.name} em outra aba`"
            >
              <!-- shortcut: exemplo sem imageMobile usa o print de desktop cortado; capture o celular ao incluir um novo. -->
              <img
                v-if="m.imageMobile || m.image"
                :src="m.imageMobile || m.image"
                :alt="`Página inicial do site de exemplo ${m.name} no celular`"
                width="540"
                height="1200"
                :loading="i < 3 ? 'eager' : 'lazy'"
              />
              <span class="open" aria-hidden="true">
                Abrir
                <svg viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" /></svg>
              </span>
            </a>
          </div>
          <div ref="pickerEl" class="picker" role="group" aria-label="Escolher site de exemplo">
            <button
              v-for="(m, i) in modelos"
              :key="m.name"
              type="button"
              :aria-pressed="i === front"
              @click="pick(i)"
            >
              {{ curto(m.name) }}
            </button>
          </div>
          <p class="now">
            <span>{{ atual?.niche ? ramo[atual.niche] : '' }}.</span> {{ atual?.pitch }}
          </p>
        </div>

        <div class="me">
          <img v-if="PHOTO_URL" :src="PHOTO_URL" alt="" width="48" height="48" />
          <p>
            <strong>Mateus Felini</strong>
            Faço sites para o comércio aqui da região.
          </p>
        </div>
      </section>

      <div class="ramos">
        <p class="sr">Faço sites para {{ ramos.join(', ').toLowerCase() }} e outros comércios.</p>
        <StackMarquee :rows="[ramos]" />
      </div>
    </div>

    <section class="sec" aria-labelledby="t-passos">
      <div class="wrap">
        <h2 id="t-passos" class="h2">Como funciona</h2>
        <ol class="passos">
          <li v-for="(p, i) in passos" :key="p.k">
            <span class="n" aria-hidden="true">{{ i + 1 }}</span>
            <h3>{{ p.k }}</h3>
            <p>{{ p.d }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="sec" aria-labelledby="t-modelos">
      <div class="wrap">
        <div class="head">
          <h2 id="t-modelos" class="h2">Alguns modelos que eu fiz</h2>
          <p class="lede">
            São negócios inventados, só para mostrar o trabalho. A sua demonstração sai com o seu
            negócio de verdade.
          </p>
        </div>
        <ul class="modelos">
          <li v-for="(m, i) in modelos" :key="m.name" :class="{ big: i < 2 }">
            <a :href="m.url" target="_blank" rel="noopener" class="modelo">
              <span class="frame">
                <span class="bar" aria-hidden="true"><i></i><i></i><i></i></span>
                <picture v-if="m.image">
                  <source
                    v-if="m.imageMobile"
                    media="(max-width: 759px)"
                    :srcset="m.imageMobile"
                    width="540"
                    height="1200"
                  />
                  <img :src="m.image" alt="" width="960" height="720" loading="lazy" />
                </picture>
              </span>
              <span class="meta">
                <span class="m-name">{{ m.name }}</span>
                <span v-if="m.niche" class="m-ramo">{{ ramo[m.niche] }}</span>
              </span>
              <span v-if="m.pitch" class="m-pitch">{{ m.pitch }}</span>
              <span class="m-open">Abrir o site<span class="sr"> (abre em outra aba)</span></span>
            </a>
          </li>
        </ul>
        <p class="arraste" aria-hidden="true">
          Arraste para o lado para ver os {{ modelos.length }}.
        </p>
      </div>
    </section>

    <section class="sec" aria-labelledby="t-preco">
      <div class="wrap preco">
        <div class="head">
          <h2 id="t-preco" class="h2">Quanto custa</h2>
          <p class="lede">Pagamento único. Sem mensalidade.</p>
        </div>
        <div class="tabela">
          <div v-for="p in planos" :key="p.k" class="plano">
            <div>
              <h3>{{ p.k }}</h3>
              <p>{{ p.d }}</p>
            </div>
            <p class="valor"><small>R$</small>{{ p.v }}</p>
          </div>
          <p class="inclui">
            <span class="tag">Preço de lançamento</span>
            Domínio .com.br do 1º ano e a configuração já estão no preço.
          </p>
        </div>
        <p class="sistema">
          Precisa de um sistema sob medida?
          <a class="link" :href="hrefSistema" :target="target" rel="noopener"
            >Me chama que a gente vê.</a
          >
        </p>
      </div>
    </section>

    <section class="sec" aria-label="Quem faz e dúvidas">
      <div class="wrap duo">
        <div class="quem">
          <img
            v-if="PHOTO_URL"
            :src="PHOTO_URL"
            alt="Mateus Felini"
            width="900"
            height="900"
            loading="lazy"
          />
          <div>
            <h2 class="h2">Quem faz o seu site</h2>
            <p class="carta">
              Sou o Mateus. Moro aqui na região e faço sites para o comércio local. Você fala direto
              comigo, do primeiro oi até o site no ar.
            </p>
          </div>
        </div>
        <div>
          <h2 class="h2">Dúvidas</h2>
          <div class="duvidas">
            <details v-for="(q, i) in duvidas" :key="q.k" :open="i === 0">
              <summary>
                {{ q.k }}
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
              </summary>
              <p>{{ q.d }}</p>
            </details>
          </div>
        </div>
      </div>
    </section>

    <section class="deep fecho" aria-labelledby="t-fecho">
      <div class="fecho-art" aria-hidden="true">
        <ContourField :label="nome || 'Seu negócio aqui'" :rings="11" />
      </div>
      <div class="wrap fecho-in">
        <h2 id="t-fecho" class="h2 big">Me manda o nome do seu negócio.</h2>
        <p class="lede">Eu monto a demonstração e você vê como fica. Sem compromisso.</p>
        <a class="btn btn-solid cta" :href="href" :target="target" rel="noopener" data-cta>
          <svg class="wa" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
          {{ ctaLabel }}
        </a>
        <p class="assure">Respondo em até 1 dia.</p>
        <p class="assina">Mateus Felini, sites para comércio local.</p>
      </div>
    </section>

    <div class="dock" :class="{ on: dockOn }" :inert="!dockOn">
      <a class="btn btn-solid cta" :href="href" :target="target" rel="noopener">
        <svg class="wa" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
        {{ ctaLabel }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

/* ─── Herói: o mesmo grafite com brilho esmeralda e malha de pontos da home ─── */
.hero {
  position: relative;
  overflow: clip;
}
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(34rem circle at 78% 46%, rgb(22 118 83 / 0.32), transparent 65%),
    radial-gradient(60rem circle at 100% 0, rgb(63 182 133 / 0.08), transparent 60%);
  pointer-events: none;
}
.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    color-mix(in srgb, var(--on-deep) 16%, transparent) 1px,
    transparent 1px
  );
  background-size: 28px 28px;
  mask-image: linear-gradient(180deg, #000, transparent 70%);
  opacity: 0.45;
  pointer-events: none;
}
.hero > * {
  position: relative;
  z-index: 1;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: calc(env(safe-area-inset-top) + 0.75rem);
}
.who {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  margin: 0;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.tool {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border: 1px solid color-mix(in srgb, white 12%, transparent);
  border-radius: 50%;
  background: transparent;
  color: var(--on-deep);
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    transform 0.3s var(--ease);
}
.tool:hover {
  background: color-mix(in srgb, white 10%, transparent);
  border-color: var(--deep-accent);
}
.tool:active {
  transform: scale(0.92);
}
.ico {
  width: 1.125rem;
  height: 1.125rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.sun,
.moon {
  transform-box: fill-box;
  transform-origin: center;
  transition:
    transform 0.5s var(--ease),
    opacity 0.3s;
}
.tool[aria-pressed='false'] .moon {
  transform: rotate(-60deg) scale(0.4);
  opacity: 0;
}
.tool[aria-pressed='true'] .sun {
  transform: rotate(90deg) scale(0.4);
  opacity: 0;
}

.hero-grid {
  display: grid;
  gap: 1.75rem;
  padding-block: 1.5rem 2rem;
}
@media (min-width: 960px) {
  .hero-grid {
    grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
    grid-template-rows: auto auto;
    align-content: center;
    gap: 0 4rem;
    padding-block: 4rem 2.5rem;
    min-height: min(46rem, calc(100svh - 9rem));
  }
  .pitch {
    align-self: end;
  }
  .hero-grid .me {
    align-self: start;
    margin-top: 2rem;
  }
  .stage {
    grid-column: 2;
    grid-row: 1 / span 2;
    align-self: center;
  }
}
h1 {
  margin: 0;
  font-size: clamp(2.5rem, 5.8vw, 5.25rem);
  font-weight: 900;
  line-height: 0.94;
  letter-spacing: -0.045em;
  text-wrap: balance;
  max-width: 11ch;
}
@media (min-width: 960px) {
  h1 {
    max-width: 13ch;
  }
}
/* Nome do negócio (link personalizado): linha própria, menor, na cor de destaque. */
.nome {
  display: block;
  margin-bottom: 0.25em;
  font-size: 0.56em;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--deep-accent);
  overflow-wrap: anywhere;
}
.sub {
  margin: 0.875rem 0 0;
  max-width: 40ch;
  font-size: 1rem;
  line-height: 1.5;
  color: color-mix(in srgb, var(--on-deep) 78%, var(--deep));
}
.cta {
  justify-content: center;
  min-height: 3.5rem;
  padding-inline: 1.5rem;
  font-size: 1.0625rem;
  border-radius: 10px;
  box-shadow: 0 14px 30px -14px rgb(22 118 83 / 0.8);
}
.hero .cta {
  margin-top: 1.25rem;
}
.hero .cta:hover,
.fecho .cta:hover {
  background: var(--on-deep);
  border-color: var(--on-deep);
  color: var(--deep);
}
.wa {
  width: 1.25rem;
  height: 1.25rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linejoin: round;
}
.assure {
  margin: 0.625rem 0 0;
  font-size: 0.875rem;
  color: var(--muted);
  text-wrap: balance;
}
@media (min-width: 960px) {
  .sub {
    margin-top: 1.25rem;
    font-size: 1.1875rem;
  }
  .hero .cta {
    margin-top: 1.75rem;
  }
  .assure {
    margin-top: 0.875rem;
    font-size: 0.9375rem;
  }
}
.me {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--line);
  max-width: 26rem;
}
.me img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  object-position: 50% 22%;
  box-shadow:
    0 0 0 2px var(--deep),
    0 0 0 3.5px var(--deep-accent);
}
.me p {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.35;
  color: var(--muted);
}
.me strong {
  display: block;
  color: var(--ink);
}

/* Baralho de sites: celulares em leque, o da frente abre. --k = distância da frente. */
.stage {
  width: 100%;
  max-width: 44rem;
  justify-self: center;
  min-width: 0;
}
.deck {
  position: relative;
  aspect-ratio: 1 / 1.24;
}
.win {
  --k: 0;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 54%;
  display: block;
  border-radius: 28px;
  overflow: hidden;
  background: #0b100d;
  border: 6px solid #0b100d;
  outline: 1px solid color-mix(in srgb, white 16%, transparent);
  box-shadow: 0 34px 60px -24px rgb(0 0 0 / 0.8);
  text-decoration: none;
  transform: translateX(calc(var(--k) * 40%)) scale(calc(1 - var(--k) * 0.08));
  transform-origin: 0 100%;
  z-index: calc(10 - var(--k));
  filter: brightness(calc(1 - var(--k) * 0.14));
  transition:
    transform 0.8s var(--ease),
    filter 0.8s var(--ease),
    opacity 0.5s;
  animation: deal 1s var(--ease) backwards;
  animation-delay: calc(0.25s + (3 - var(--k)) * 0.1s);
}
/* Câmera do celular. */
.win::after {
  content: '';
  position: absolute;
  top: 7px;
  left: 50%;
  width: 26%;
  height: 14px;
  margin-left: -13%;
  border-radius: 999px;
  background: #0b100d;
  z-index: 2;
}
.win.back {
  pointer-events: none;
}
.win.off {
  opacity: 0;
}
@keyframes deal {
  from {
    opacity: 0;
    transform: translate(0, 6%) scale(0.92);
  }
}
.bar {
  display: none;
  align-items: center;
  gap: 0.4rem;
  height: 1.875rem;
  padding: 0 0.75rem;
  background: #17201b;
  border-bottom: 1px solid color-mix(in srgb, white 8%, transparent);
  font: 500 0.6875rem/1 var(--mono);
  color: var(--deep-muted);
  white-space: nowrap;
  overflow: hidden;
}
.win img {
  width: 100%;
  aspect-ratio: 412 / 915;
  object-fit: cover;
  object-position: top;
  border-radius: 22px;
}
@media (min-width: 960px) {
  .stage {
    max-width: 33rem;
  }
}
.open {
  position: absolute;
  right: 0.75rem;
  bottom: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  background: var(--deep);
  color: var(--on-deep);
  font-size: 0.8125rem;
  font-weight: 600;
  box-shadow: 0 6px 18px -6px rgb(0 0 0 / 0.6);
  transition:
    opacity 0.3s,
    background-color 0.2s,
    color 0.2s;
}
.win.back .open {
  opacity: 0;
}
.open svg {
  width: 0.875rem;
  height: 0.875rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.2;
  stroke-linecap: round;
}
.win:hover .open,
.win:focus-visible .open {
  background: var(--deep-accent);
  color: var(--deep);
}
/* Botões dos nomes: uma linha só; no celular rolam de lado. */
.picker {
  position: relative;
  display: flex;
  gap: 0.5rem;
  margin: 1.25rem calc(-1 * var(--gutter)) 0;
  padding-inline: var(--gutter);
  overflow-x: auto;
  scrollbar-width: none;
  overscroll-behavior-x: contain;
}
.picker::-webkit-scrollbar {
  display: none;
}
@media (min-width: 760px) {
  .picker {
    margin-inline: 0;
    padding-inline: 0;
  }
}
.picker button {
  flex: none;
  min-height: 2.5rem;
  padding: 0 1rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: transparent;
  color: var(--muted);
  font: 600 0.875rem/1 var(--sans);
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 0.25s,
    color 0.25s,
    border-color 0.25s;
}
.picker button:hover {
  color: var(--ink);
  border-color: var(--deep-accent);
}
.picker button[aria-pressed='true'] {
  background: var(--deep-accent);
  border-color: var(--deep-accent);
  color: var(--deep);
}
.now {
  margin: 0.875rem 0 0;
  min-height: 2.8em;
  font-size: 0.9375rem;
  line-height: 1.4;
  color: var(--muted);
}
.now span {
  color: var(--deep-accent);
  font-weight: 600;
}

.ramos {
  padding-bottom: 2rem;
}
.ramos :deep(.chip) {
  font-family: var(--sans);
  font-size: 0.875rem;
}

/* ─── Seções claras ─── */
.sec {
  padding-block: clamp(3.5rem, 9vw, 6.5rem);
}
.sec + .sec {
  border-top: 1px solid var(--line);
}
.h2 {
  margin: 0;
  font-size: clamp(2rem, 4.6vw, 3.5rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.04em;
  text-wrap: balance;
}
.lede {
  margin: 0.875rem 0 0;
  max-width: 46ch;
  color: var(--muted);
  font-size: 1.0625rem;
}
.head {
  margin-bottom: clamp(2rem, 5vw, 3rem);
}
@media (min-width: 900px) {
  .head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 3rem;
  }
  .head .lede {
    margin: 0;
    max-width: 36ch;
  }
}

/* Passos: uma linha liga os três números. */
.passos {
  --dot: 3rem;
  position: relative;
  display: grid;
  gap: 2rem;
  list-style: none;
  margin: clamp(2rem, 5vw, 3rem) 0 0;
  padding: 0;
}
.passos li:not(:last-child)::before {
  content: '';
  position: absolute;
  left: calc(var(--dot) / 2 - 1px);
  top: var(--dot);
  bottom: -2rem;
  width: 2px;
  background: linear-gradient(var(--mato), var(--line));
}
.passos li {
  position: relative;
  display: grid;
  grid-template-columns: var(--dot) minmax(0, 1fr);
  column-gap: 1.25rem;
}
.n {
  grid-row: span 2;
  display: grid;
  place-items: center;
  width: var(--dot);
  height: var(--dot);
  border-radius: 50%;
  background: var(--mato);
  color: var(--paper);
  font-size: 1.25rem;
  font-weight: 900;
  box-shadow: 0 0 0 6px var(--paper);
}
.passos li:last-child .n {
  background: var(--ink);
}
.passos h3 {
  margin: 0.55rem 0 0;
  font-size: 1.375rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.15;
}
.passos p {
  margin: 0.375rem 0 0;
  color: var(--muted);
  max-width: 36ch;
}
@media (min-width: 900px) {
  .passos {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 3rem;
  }
  .passos li:not(:last-child)::before {
    left: var(--dot);
    right: -3rem;
    top: calc(var(--dot) / 2 - 1px);
    bottom: auto;
    width: auto;
    height: 2px;
    background: linear-gradient(90deg, var(--mato), var(--line));
  }
  .passos li {
    grid-template-columns: 1fr;
  }
  .n {
    grid-row: auto;
    margin-bottom: 1.25rem;
  }
}

/* Modelos. Celular: fileira de celulares que rola de lado. Tablet pra cima: janelas, os dois
   preferidos grandes e os outros em grade menor. */
.modelos {
  display: flex;
  gap: 1rem;
  list-style: none;
  margin: 0 calc(-1 * var(--gutter));
  padding: 0.5rem var(--gutter) 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: var(--gutter);
  scrollbar-width: none;
}
.modelos::-webkit-scrollbar {
  display: none;
}
.modelos li {
  flex: 0 0 58%;
  min-width: 0;
  scroll-snap-align: start;
}
.arraste {
  margin: 0;
  font-size: 0.875rem;
  color: var(--muted);
}
@media (min-width: 760px) {
  .modelos {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem 1.5rem;
    margin: 0;
    padding: 0;
    overflow: visible;
  }
  .modelos .big {
    grid-column: span 2;
  }
  .arraste {
    display: none;
  }
}
@media (min-width: 900px) {
  .modelos {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 3rem 1.75rem;
  }
  .modelos li {
    grid-column: span 3;
  }
  .modelos .big {
    grid-column: span 6;
  }
}
.modelo {
  display: grid;
  gap: 0.375rem;
  text-decoration: none;
}
.frame {
  position: relative;
  display: block;
  margin-bottom: 0.625rem;
  border: 5px solid #0b100d;
  border-radius: 26px;
  overflow: hidden;
  background: #0b100d;
  box-shadow: 0 24px 44px -26px rgb(16 23 19 / 0.55);
  transition:
    transform 0.5s var(--ease),
    box-shadow 0.5s var(--ease),
    border-color 0.3s;
}
:root[data-theme='dark'] .frame {
  outline: 1px solid var(--line);
}
.frame::after {
  content: '';
  position: absolute;
  top: 6px;
  left: 37%;
  width: 26%;
  height: 12px;
  border-radius: 999px;
  background: #0b100d;
}
.frame .bar {
  display: none;
  gap: 0.3rem;
  height: 1.25rem;
  padding: 0 0.6rem;
  background: var(--paper-2);
  border-bottom-color: var(--line);
}
.frame .bar i {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
  background: var(--line);
}
.frame img {
  width: 100%;
  aspect-ratio: 412 / 915;
  object-fit: cover;
  object-position: top;
  border-radius: 21px;
  transition: transform 0.8s var(--ease);
}
@media (min-width: 760px) {
  .frame {
    border: 1px solid var(--line);
    border-radius: 12px;
    background: var(--card);
    outline: 0;
  }
  :root[data-theme='dark'] .frame {
    outline: 0;
  }
  .frame::after {
    display: none;
  }
  .frame .bar {
    display: flex;
  }
  .frame img {
    aspect-ratio: 4 / 3;
    border-radius: 0;
  }
}
.modelo:hover .frame,
.modelo:focus-visible .frame {
  transform: translateY(-4px);
  border-color: var(--mato);
  box-shadow: 0 34px 60px -32px rgb(16 23 19 / 0.55);
}
.modelo:hover .frame img {
  transform: scale(1.03);
}
.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.125rem 0.625rem;
}
.m-name {
  font-weight: 800;
  font-size: 1.0625rem;
  letter-spacing: -0.015em;
  line-height: 1.2;
}
.big .m-name {
  font-size: clamp(1.0625rem, 2vw, 1.5rem);
}
.m-ramo {
  font-size: 0.875rem;
  color: var(--mato);
  font-weight: 600;
}
.m-pitch {
  color: var(--muted);
  font-size: 0.875rem;
  line-height: 1.45;
  max-width: 44ch;
}
.m-open {
  display: none;
  font-weight: 600;
  font-size: 0.9375rem;
  color: var(--ink);
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 0.22em;
  text-decoration-color: var(--mato);
}
@media (min-width: 760px) {
  .big .m-open {
    display: inline;
  }
  .modelos li:not(.big) .m-pitch {
    display: none;
  }
}
@media (min-width: 900px) {
  .modelos li:not(.big) .m-pitch {
    display: block;
  }
}

/* Preço: uma tabela, não cartões. */
.tabela {
  border: 1px solid var(--line);
  border-radius: 22px;
  background: var(--card);
  box-shadow: 0 30px 60px -44px rgb(16 23 19 / 0.4);
  padding: 0.5rem clamp(1.25rem, 3vw, 2.25rem);
}
.plano {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 1rem 2rem;
  padding-block: 1.5rem;
  border-bottom: 1px solid var(--line);
}
.plano h3 {
  margin: 0;
  font-size: clamp(1.25rem, 2.2vw, 1.625rem);
  font-weight: 800;
  letter-spacing: -0.025em;
}
.plano p {
  margin: 0.375rem 0 0;
  color: var(--muted);
  max-width: 42ch;
  font-size: 0.9375rem;
}
.plano .valor {
  margin: 0;
  display: flex;
  align-items: flex-start;
  gap: 0.2rem;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  letter-spacing: -0.045em;
  line-height: 1;
  color: var(--ink);
  font-variant-numeric: tabular-nums;
}
.valor small {
  font-size: 0.34em;
  font-weight: 700;
  letter-spacing: 0;
  margin-top: 0.3em;
  color: var(--mato);
}
.inclui {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.875rem;
  margin: 0;
  padding-block: 1.25rem;
  font-size: 0.9375rem;
  color: var(--muted);
}
.tag {
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  background: var(--mato-soft);
  color: var(--mato);
  font-size: 0.8125rem;
  font-weight: 700;
}
.sistema {
  margin: 1.5rem 0 0;
  color: var(--muted);
}
.sistema .link {
  color: var(--ink);
  font-weight: 600;
  text-decoration-color: var(--mato);
}
@media (min-width: 900px) {
  .preco {
    display: grid;
    grid-template-columns: 18rem minmax(0, 1fr);
    column-gap: 4rem;
  }
  .preco .head {
    display: block;
    grid-row: span 2;
  }
  .preco .head .lede {
    margin-top: 0.875rem;
  }
}

/* Quem faz + dúvidas: lado a lado no desktop, sem coluna vazia. */
.duo {
  display: grid;
  gap: 4rem;
}
@media (min-width: 900px) {
  .duo {
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    gap: 5rem;
    align-items: start;
  }
}
.quem {
  display: grid;
  gap: 1.5rem;
  align-content: start;
}
.quem img {
  width: 9rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: 50% 30%;
  border-radius: 22px;
  box-shadow: 0 30px 60px -36px rgb(16 23 19 / 0.55);
}
.carta {
  margin: 1rem 0 0;
  font-family: var(--serif);
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  line-height: 1.45;
  max-width: 32ch;
}
@media (min-width: 900px) {
  .quem img {
    width: 13rem;
  }
}
.duvidas {
  margin-top: 1.75rem;
}
.duvidas details {
  border-bottom: 1px solid var(--line);
}
.duvidas details:first-child {
  border-top: 1px solid var(--line);
}
.duvidas summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 3.5rem;
  padding-block: 0.875rem;
  font-weight: 700;
  font-size: 1.125rem;
  letter-spacing: -0.01em;
  cursor: pointer;
  list-style: none;
}
.duvidas summary::-webkit-details-marker {
  display: none;
}
.duvidas summary svg {
  width: 1.125rem;
  height: 1.125rem;
  flex: none;
  fill: none;
  stroke: var(--mato);
  stroke-width: 2.2;
  stroke-linecap: round;
  transition: transform 0.35s var(--ease);
}
.duvidas details[open] summary svg {
  transform: rotate(45deg);
}
.duvidas details p {
  margin: 0 0 1.25rem;
  max-width: 58ch;
  color: var(--muted);
}

/* ─── Fecho escuro com as curvas de nível da marca ─── */
.fecho {
  position: relative;
  overflow: clip;
  padding-block: clamp(4rem, 10vw, 7rem) 2rem;
}
.fecho-art {
  position: absolute;
  right: -30%;
  top: -10%;
  width: 46rem;
  max-width: 120%;
  opacity: 0.55;
  pointer-events: none;
}
.fecho-in {
  position: relative;
}
.h2.big {
  font-size: clamp(2.5rem, 6.4vw, 5rem);
  line-height: 0.95;
  max-width: 13ch;
}
.fecho .lede {
  color: color-mix(in srgb, var(--on-deep) 75%, var(--deep));
}
.fecho .cta {
  margin-top: 2rem;
}
.assina {
  margin: clamp(3rem, 8vw, 5rem) 0 0;
  padding-top: 1.25rem;
  border-top: 1px solid var(--line);
  font-size: 0.875rem;
  color: var(--muted);
}
@media (min-width: 900px) {
  .fecho-art {
    right: -4%;
    top: 50%;
    width: 40rem;
    transform: translateY(-50%);
    opacity: 0.8;
  }
}

/* Barra fixa do celular: some quando há um botão grande na tela; o fecho deixa espaço pra ela. */
.dock {
  position: fixed;
  inset: auto 0 0 0;
  z-index: 30;
  padding: 0.75rem 1rem calc(0.75rem + env(safe-area-inset-bottom));
  background: color-mix(in srgb, var(--paper) 86%, transparent);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  border-top: 1px solid var(--line);
  transform: translateY(110%);
  transition: transform 0.45s var(--ease);
}
.dock.on {
  transform: none;
}
.dock .cta {
  width: 100%;
}
@media (max-width: 759px) {
  .hero .cta,
  .fecho .cta {
    width: 100%;
  }
  .fecho {
    padding-bottom: 6rem;
  }
}
@media (min-width: 760px) {
  .dock {
    display: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .win {
    animation: none;
  }
}
</style>
