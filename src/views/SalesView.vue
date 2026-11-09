<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { CONTACT, PHOTO_URL, WHATSAPP } from '@/config/site'
import { siteExamples } from '@/data/siteExamples'
import { useMeta } from '@/composables/useMeta'

// Página de venda da prospecção: celular primeiro (~3 telas), sem menu do portfólio.
// Só em português de propósito (o público é o comércio local).
// Sem classes que o motion/init.ts esconde até a rolagem (.ex, .close, .how): o conteúdo aparece sempre.
useMeta(() => ({
  title: 'Site para comércio local · Mateus Felini',
  description:
    'Veja o site do seu negócio antes de pagar qualquer coisa. Demonstração sem custo e sem compromisso.',
}))

// TODO: trocar WHATSAPP (src/config/site.ts) pelo número do chip novo quando ele existir.
const msg = 'Oi Mateus, vi a página de sites e quero minha demonstração.'
const href = WHATSAPP
  ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`
  : `mailto:${CONTACT.email}?body=${encodeURIComponent(msg)}`
const target = WHATSAPP ? '_blank' : undefined
const label = WHATSAPP ? 'Quero minha demonstração no WhatsApp' : 'Quero minha demonstração por e-mail'

const vitrine = ['Lume Odontologia', 'Fio Reto Barbearia']
  .map((n) => siteExamples.find((e) => e.name === n))
  .filter((e): e is NonNullable<typeof e> => !!e)

const ramos = ['Odonto', 'Restaurante', 'Pet shop', 'Barbearia e salão', 'Oficina']

const passos = [
  'Você me manda o nome do negócio.',
  'Eu monto a demonstração.',
  'Você decide.',
]

const perguntas = [
  { k: 'Tem custo?', d: 'A demonstração não. Se gostar, eu passo o orçamento do site completo, sem pressão.' },
  { k: 'O site é meu?', d: 'Sim. O endereço .com.br fica no seu nome.' },
  { k: 'Tem mensalidade?', d: 'Não. O pagamento é único e o domínio do 1º ano já está incluso.' },
  {
    k: 'Os exemplos são reais?',
    d: 'São modelos. A sua demonstração é feita com o seu negócio, com o seu logo e as suas fotos.',
  },
]

// A barra fixa do celular some quando já há um botão grande na tela.
const dockOn = ref(true)
let io: IntersectionObserver | undefined
onMounted(() => {
  const seen = new Set<Element>()
  io = new IntersectionObserver((es) => {
    es.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)))
    dockOn.value = seen.size === 0
  })
  document.querySelectorAll('[data-cta]').forEach((el) => io!.observe(el))
})
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <div class="sales">
    <div class="deep hero-bleed" data-hero>
      <section class="wrap hero">
        <h1 class="title">Veja o site do seu negócio antes de pagar qualquer coisa.</h1>
        <p class="lede">Eu monto a demonstração da sua página inicial. Você avalia e decide.</p>
        <div class="actions" data-cta>
          <a class="btn btn-solid big" :href="href" :target="target" rel="noreferrer">
            <svg class="ic" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.300 1.200-1.800 1.200-.5.1-1 .2-3.300-.7-2.800-1.100-4.600-4-4.700-4.200-.1-.2-1.100-1.500-1.100-2.800 0-1.300.7-2 1-2.300.2-.3.500-.3.700-.3h.5c.2 0 .4 0 .6.500l.8 2c.1.2.1.400 0 .5l-.4.600-.4.400c-.1.200-.3.300-.1.600.2.300.8 1.300 1.700 2.100 1.100 1 2.100 1.300 2.400 1.400.3.200.5.100.6-.1l.9-1.100c.2-.3.400-.2.600-.1l1.900.9c.3.100.5.200.5.300.1.200.1.800-.1 1.400Z"
              />
            </svg>
            {{ label }}
          </a>
        </div>
        <p class="sub">Sem custo, sem compromisso, resposta em até 1 dia.</p>
        <p class="me">
          <img v-if="PHOTO_URL" :src="PHOTO_URL" alt="Mateus Felini" />
          <span>Mateus, aqui da região</span>
        </p>
      </section>
    </div>

    <section class="wrap block" aria-labelledby="ex">
      <h2 id="ex" class="h2">Veja como fica. Toque para abrir.</h2>
      <ul class="demos">
        <li v-for="ex in vitrine" :key="ex.url">
          <a :href="ex.url" target="_blank" rel="noreferrer" class="demo">
            <img v-if="ex.image" :src="ex.image" :alt="`Exemplo: ${ex.name}`" loading="lazy" />
            <span class="ex-name">{{ ex.name }}</span>
          </a>
        </li>
      </ul>
      <p class="chips" aria-label="Ramos atendidos">
        <span v-for="r in ramos" :key="r">{{ r }}</span>
      </p>
    </section>

    <section class="wrap block" aria-labelledby="como">
      <h2 id="como" class="h2">Como funciona.</h2>
      <ol class="steps">
        <li v-for="(s, i) in passos" :key="s">
          <span class="n" aria-hidden="true">{{ i + 1 }}</span>
          {{ s }}
        </li>
      </ol>
      <p class="price">
        Site de 1 página R$&nbsp;297, completo R$&nbsp;697, pagamento único, domínio do 1º ano
        incluso.
      </p>
    </section>

    <section class="wrap block" aria-labelledby="faq">
      <h2 id="faq" class="h2">Perguntas rápidas.</h2>
      <dl class="faq">
        <div v-for="q in perguntas" :key="q.k">
          <dt>{{ q.k }}</dt>
          <dd>{{ q.d }}</dd>
        </div>
      </dl>
    </section>

    <section class="deep fecho" aria-labelledby="fecho">
      <div class="wrap fecho-in" data-cta>
        <h2 id="fecho" class="close-title">Me manda o nome do seu negócio.</h2>
        <a class="btn btn-solid big" :href="href" :target="target" rel="noreferrer">{{ label }}</a>
      </div>
    </section>

    <footer class="wrap sfoot">Mateus Felini · Sites para comércio local</footer>

    <!-- Barra fixa no celular: fundo sólido, some quando já há um botão grande na tela. -->
    <div class="dock" :class="{ off: !dockOn }">
      <a class="btn btn-solid big" :href="href" :target="target" rel="noreferrer">{{ label }}</a>
    </div>
  </div>
</template>

<style scoped>
.hero {
  padding-block: 2.5rem 2.5rem;
  display: grid;
  justify-items: center;
  text-align: center;
  gap: 1rem;
}
.title {
  margin: 0;
  font-size: clamp(2.125rem, 7vw, 4rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.04em;
  max-width: 18ch;
}
.lede {
  margin: 0;
  font-size: 1.125rem;
  max-width: 34ch;
  color: var(--muted);
}
.actions {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}
.big {
  min-height: 3.5rem;
  padding-inline: 1rem;
  font-size: 0.9375rem;
  justify-content: center;
  white-space: nowrap;
}
.actions .big {
  width: 100%;
  max-width: 26rem;
}
.ic {
  width: 1.375rem;
  height: 1.375rem;
  flex: none;
}
.sub {
  margin: 0;
  font-size: 0.9375rem;
  color: var(--muted);
}
.me {
  margin: 0.5rem 0 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}
.me img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  object-position: 47% 22%;
}

.block {
  padding-block: clamp(2rem, 6vw, 3.5rem);
  border-top: 1px solid var(--line);
}
.h2 {
  margin: 0;
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.035em;
}
.demos {
  list-style: none;
  margin: 1.5rem 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}
@media (min-width: 720px) {
  .demos {
    gap: 1.5rem;
  }
}
.demo {
  display: grid;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;
}
.demo img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: left top;
  border: 1px solid var(--line);
  border-radius: 8px;
}
.ex-name {
  font-weight: 800;
}
.chips {
  margin: 1.25rem 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.chips span {
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 0.875rem;
  color: var(--muted);
}

.steps {
  list-style: none;
  margin: 1.25rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.75rem;
}
.steps li {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  font-size: 1.125rem;
  font-weight: 600;
}
.n {
  display: grid;
  place-items: center;
  flex: none;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  border: 2px solid var(--mato);
  color: var(--mato);
  font-weight: 800;
}
.price {
  margin: 1.5rem 0 0;
  font-size: 1.125rem;
  font-weight: 700;
  max-width: 36ch;
}

.faq {
  margin: 1.25rem 0 0;
  display: grid;
  gap: 1.125rem;
  max-width: 44rem;
}
.faq dt {
  font-weight: 700;
}
.faq dd {
  margin: 0.125rem 0 0;
  color: var(--muted);
}

.fecho {
  padding-block: clamp(2.5rem, 7vw, 4rem);
}
.fecho-in {
  display: grid;
  justify-items: center;
  text-align: center;
  gap: 1.25rem;
}
.close-title {
  margin: 0;
  font-size: clamp(1.75rem, 5vw, 2.75rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.04em;
}
.fecho .big {
  width: 100%;
  max-width: 26rem;
}
.sfoot {
  padding-block: 1.5rem 6.5rem;
  color: var(--muted);
  font-size: 0.9375rem;
}

/* Barra fixa só no celular, com fundo sólido (texto não aparece por baixo). */
.dock {
  position: fixed;
  inset: auto 0 0 0;
  z-index: 40;
  padding: 0.625rem var(--gutter) calc(0.625rem + env(safe-area-inset-bottom));
  background: var(--paper);
  border-top: 1px solid var(--line);
  transition: transform 0.25s var(--ease);
}
.dock.off {
  transform: translateY(110%);
}
.dock .btn {
  width: 100%;
}
@media (min-width: 720px) {
  .dock {
    display: none;
  }
  .sfoot {
    padding-bottom: 2rem;
  }
}
</style>
