<script setup lang="ts">
import { CONTACT, PHOTO_URL, WHATSAPP } from '@/config/site'
import { siteExamples } from '@/data/siteExamples'
import { useMeta } from '@/composables/useMeta'

// Página de venda da prospecção: celular primeiro, sem menu do portfólio.
// Só em português de propósito (o público é o comércio local).
useMeta(() => ({
  title: 'Site para comércio local · Mateus Felini',
  description:
    'Site para o seu comércio, pronto em poucos dias. Veja a prévia antes de pagar e só pague se gostar. Preço de lançamento para os 5 primeiros.',
}))

// TODO: trocar WHATSAPP (src/config/site.ts) pelo número do chip novo quando ele existir.
function wa(message: string) {
  return WHATSAPP
    ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`
    : `mailto:${CONTACT.email}?body=${encodeURIComponent(message)}`
}
const target = WHATSAPP ? '_blank' : undefined
const cta = WHATSAPP ? 'Chamar no WhatsApp' : 'Chamar por e-mail'

const msg = {
  geral: 'Oi Mateus, vi a página de sites e quero saber como funciona para o meu negócio.',
  essencial: 'Oi Mateus, vi a página de sites e quero o plano Essencial para o meu negócio.',
  completo: 'Oi Mateus, vi a página de sites e quero o plano Completo para o meu negócio.',
  medida: 'Oi Mateus, vi a página de sites e quero um orçamento de sistema sob medida.',
}

const leva = [
  { k: 'Endereço seu', d: 'O seunegocio.com.br no seu nome, com o primeiro ano já pago.' },
  {
    k: 'Pedido no WhatsApp',
    d: 'O cliente toca no botão e a mensagem já vai pronta. Você atende do jeito de sempre.',
  },
  {
    k: 'Horário e mapa',
    d: 'Quem chega sabe se está aberto e como chegar, sem perguntar no direct.',
  },
]

const planos = [
  {
    nome: 'Essencial',
    desc: 'Site de 1 página',
    cheio: 'R$ 397',
    preco: 'R$ 297',
    itens: [
      'Cardápio ou serviços',
      'Horário e mapa',
      'Botão de WhatsApp',
      'Domínio .com.br do 1º ano',
      'Configuração inclusa',
    ],
    msg: msg.essencial,
    destaque: false,
  },
  {
    nome: 'Completo',
    desc: 'Site com várias páginas',
    cheio: 'R$ 797',
    preco: 'R$ 697',
    itens: [
      'Tudo do Essencial',
      'Várias páginas para organizar o seu negócio',
      'Domínio .com.br do 1º ano',
      'Configuração inclusa',
    ],
    msg: msg.completo,
    destaque: true,
  },
]

const passos = [
  { k: 'A gente conversa.', d: 'Você me conta do negócio e eu pergunto o que importa.' },
  { k: 'Monto uma prévia.', d: 'Com seu logo, suas fotos e seu jeito. É grátis.' },
  { k: 'Você decide.', d: 'Gostou, o site entra no ar. Não gostou, não paga nada.' },
  { k: 'Entra no ar.', d: 'Com endereço .com.br seu e mapa.' },
]

const perguntas = [
  {
    k: 'Preciso entender de internet?',
    d: 'Não. Você me conta o que precisa e eu cuido da parte técnica.',
  },
  { k: 'O site é meu?', d: 'O endereço fica no seu nome.' },
  { k: 'E se eu quiser mudar algo depois?', d: 'Me chama no WhatsApp e a gente combina.' },
]
</script>

<template>
  <div class="sales">
    <div class="deep hero-bleed" data-hero>
      <section class="wrap hero">
        <p class="brandline">Mateus Felini · sites para comércio local</p>
        <p class="kicker">Site para comércio local</p>
        <h1 class="title">Seu site, pronto em poucos dias.</h1>
        <p class="lede">
          Cardápio, horário, endereço e botão de WhatsApp num lugar só. Você vê a prévia antes de
          pagar e só paga se gostar.
        </p>
        <div class="actions">
          <a class="btn btn-solid big" :href="wa(msg.geral)" :target="target" rel="noreferrer">{{
            cta
          }}</a>
        </div>
        <p class="from">Lançamento a partir de <strong>R$ 297</strong>, pagamento único.</p>
      </section>
    </div>

    <section class="wrap block" aria-labelledby="dor">
      <h2 id="dor" class="h2">Quem procura você no Google acha pouco.</h2>
      <p class="text">
        O cliente pesquisa, acha só o Instagram ou nada, pergunta o horário no direct e às vezes
        desiste. Um site com horário, endereço, cardápio e botão de WhatsApp responde isso antes
        dele perguntar.
      </p>
    </section>

    <section class="wrap block" aria-labelledby="leva">
      <h2 id="leva" class="h2">O que você leva.</h2>
      <ul class="cols">
        <li v-for="l in leva" :key="l.k">
          <h3>{{ l.k }}</h3>
          <p>{{ l.d }}</p>
        </li>
      </ul>
    </section>

    <section v-if="siteExamples.length" class="wrap block" aria-labelledby="ex">
      <h2 id="ex" class="h2">Quatro exemplos. Abre no celular e mexe.</h2>
      <p class="text note">
        São negócios inventados, feitos para mostrar o que dá para fazer no seu.
      </p>
      <ul class="examples">
        <li v-for="ex in siteExamples" :key="ex.url">
          <a :href="ex.url" target="_blank" rel="noreferrer" class="ex">
            <img v-if="ex.image" :src="ex.image" :alt="`Exemplo: ${ex.name}`" loading="lazy" />
            <span class="ex-name">{{ ex.name }}</span>
            <span class="ex-pitch">{{ ex.pitch }}</span>
            <span class="ex-open">Abrir o exemplo</span>
          </a>
        </li>
      </ul>
    </section>

    <section class="wrap block" aria-labelledby="preco">
      <h2 id="preco" class="h2">Preço de lançamento para os 5 primeiros.</h2>
      <p class="text note">
        Pagamento único. O domínio .com.br do primeiro ano e a configuração já estão no preço. Sem
        mensalidade e sem fidelidade.
      </p>
      <div class="plans">
        <article v-for="p in planos" :key="p.nome" class="plan" :class="{ star: p.destaque }">
          <p v-if="p.destaque" class="badge">Mais escolhido</p>
          <h3>{{ p.nome }}</h3>
          <p class="plan-desc">{{ p.desc }}</p>
          <p class="plan-price">
            <s>{{ p.cheio }}</s>
            <strong>{{ p.preco }}</strong>
          </p>
          <ul class="plan-list">
            <li v-for="i in p.itens" :key="i">{{ i }}</li>
          </ul>
          <a
            class="btn big"
            :class="p.destaque ? 'btn-solid' : 'btn-line'"
            :href="wa(p.msg)"
            :target="target"
            rel="noreferrer"
            >Quero este</a
          >
        </article>

        <article class="plan">
          <h3>Sob medida</h3>
          <p class="plan-desc">Sistemas para o seu negócio</p>
          <p class="plan-price"><strong class="consult">Sob consulta</strong></p>
          <ul class="plan-list">
            <li>Agendamento</li>
            <li>Pedidos</li>
            <li>Atendimento automático no WhatsApp</li>
          </ul>
          <a class="btn btn-line big" :href="wa(msg.medida)" :target="target" rel="noreferrer"
            >Pedir orçamento</a
          >
        </article>
      </div>
      <p class="fine">O preço de lançamento vale para os 5 primeiros clientes.</p>
    </section>

    <section class="wrap block" aria-labelledby="como">
      <h2 id="como" class="h2">Como funciona.</h2>
      <ol class="steps">
        <li v-for="(s, i) in passos" :key="s.k">
          <span class="n" aria-hidden="true">{{ i + 1 }}</span>
          <div>
            <h3>{{ s.k }}</h3>
            <p>{{ s.d }}</p>
          </div>
        </li>
      </ol>
    </section>

    <section class="wrap block who" aria-labelledby="quem">
      <figure class="photo">
        <img v-if="PHOTO_URL" :src="PHOTO_URL" alt="Mateus Felini" />
        <!-- TODO: foto real do Mateus (PHOTO_URL em src/config/site.ts). -->
        <div v-else class="ph" role="img" aria-label="Espaço reservado para a foto do Mateus">
          <span>Foto do Mateus<br />(a ser colocada)</span>
        </div>
      </figure>
      <div>
        <h2 id="quem" class="h2">Quem sou.</h2>
        <p class="text">
          Sou o Mateus, do interior do RS. Comecei consertando computador e instalando internet, e
          hoje faço sistemas há mais de três anos. Você fala direto comigo, sem atendente no meio.
        </p>
      </div>
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

    <section class="deep close" aria-labelledby="fecho">
      <div class="wrap close-in">
        <h2 id="fecho" class="close-title">Me manda o nome do seu negócio no WhatsApp.</h2>
        <p class="close-text">Eu respondo pessoalmente.</p>
        <a class="btn btn-solid big" :href="wa(msg.geral)" :target="target" rel="noreferrer">{{
          cta
        }}</a>
      </div>
    </section>

    <footer class="wrap sfoot">Mateus Felini · Sites para comércio local</footer>

    <!-- Barra fixa no celular: o botão acompanha a rolagem. -->
    <div class="dock">
      <a class="btn btn-solid big" :href="wa(msg.geral)" :target="target" rel="noreferrer">{{
        cta
      }}</a>
    </div>
  </div>
</template>

<style scoped>
.hero {
  padding-block: 1.25rem 3rem;
  display: grid;
  justify-items: start;
}
.brandline {
  margin: 0 0 2.5rem;
  font: 500 0.8125rem/1.2 var(--mono);
  color: var(--muted);
}
.kicker {
  margin: 0 0 1rem;
  font-weight: 600;
  color: var(--mato);
}
.title {
  margin: 0;
  font-size: clamp(2.75rem, 9vw, 5.5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.045em;
  max-width: 12ch;
}
.lede {
  margin: 1.25rem 0 0;
  font-size: clamp(1.125rem, 2.4vw, 1.3125rem);
  max-width: 40ch;
  color: var(--muted);
}
.actions {
  margin-top: 1.75rem;
  width: 100%;
}
.big {
  min-height: 3.5rem;
  padding-inline: 1.75rem;
  font-size: 1.0625rem;
  justify-content: center;
}
.actions .big {
  width: 100%;
}
@media (min-width: 720px) {
  .actions .big {
    width: auto;
  }
}
.from {
  margin: 1rem 0 0;
  color: var(--muted);
}
.from strong {
  color: var(--ink);
}

.block {
  padding-block: clamp(2.5rem, 7vw, 4.5rem);
  border-top: 1px solid var(--line);
}
.h2 {
  margin: 0;
  font-size: clamp(1.75rem, 4.5vw, 3rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.04em;
  max-width: 20ch;
}
.text {
  margin: 1.25rem 0 0;
  font-size: 1.125rem;
  max-width: 54ch;
  color: var(--muted);
}
.text.note {
  margin-top: 0.75rem;
}

.cols,
.steps,
.examples {
  list-style: none;
  margin: 2rem 0 0;
  padding: 0;
  display: grid;
  gap: 1.75rem;
}
@media (min-width: 720px) {
  .cols {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2rem 3rem;
  }
  .steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2.25rem 3rem;
  }
}
.cols h3,
.steps h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.015em;
}
.cols p,
.steps p {
  margin: 0.5rem 0 0;
  color: var(--muted);
  max-width: 38ch;
}
.steps li {
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr);
  gap: 1rem;
  align-items: start;
}
.n {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 2px solid var(--mato);
  color: var(--mato);
  font-size: 1.25rem;
  font-weight: 800;
}

.examples {
  grid-template-columns: 1fr;
}
@media (min-width: 560px) {
  .examples {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (min-width: 960px) {
  .examples {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.25rem;
  }
}
.ex {
  display: grid;
  gap: 0.375rem;
  align-content: start;
  text-decoration: none;
  color: inherit;
}
.ex img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border: 1px solid var(--line);
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: transform 0.25s var(--ease);
}
.ex:hover img {
  transform: translateY(-3px);
}
.ex-name {
  font-weight: 800;
  font-size: 1.125rem;
}
.ex-pitch {
  color: var(--muted);
  font-size: 0.9375rem;
}
.ex-open {
  font-weight: 700;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 0.25em;
  text-decoration-color: var(--broto);
}

.plans {
  margin-top: 2rem;
  display: grid;
  gap: 1rem;
  align-items: stretch;
}
@media (min-width: 900px) {
  .plans {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
  }
}
.plan {
  position: relative;
  display: grid;
  align-content: start;
  gap: 0.5rem;
  padding: 1.5rem;
  border: 1.5px solid var(--line);
  border-radius: 10px;
  background: var(--card);
}
.plan.star {
  border-color: var(--mato);
  border-width: 2px;
  box-shadow: 0 10px 30px -18px var(--mato);
}
.badge {
  position: absolute;
  top: -0.8rem;
  left: 1.25rem;
  margin: 0;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: var(--cta);
  color: var(--on-cta);
  font-size: 0.8125rem;
  font-weight: 700;
}
.plan h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
}
.plan-desc {
  margin: 0;
  color: var(--muted);
}
.plan-price {
  margin: 0.5rem 0 0;
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}
.plan-price s {
  color: var(--muted);
  font-size: 1.125rem;
}
.plan-price strong {
  font-size: 2.5rem;
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1;
}
.plan-price .consult {
  font-size: 1.75rem;
}
.plan-list {
  list-style: none;
  margin: 0.75rem 0 1.25rem;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}
.plan-list li {
  padding-left: 1.5rem;
  position: relative;
}
.plan-list li::before {
  content: '';
  position: absolute;
  left: 0.125rem;
  top: 0.45em;
  width: 0.5rem;
  height: 0.8rem;
  border: solid var(--mato);
  border-width: 0 2px 2px 0;
  transform: rotate(40deg) scale(0.85);
}
.plan .btn {
  align-self: end;
}
.fine {
  margin: 1rem 0 0;
  font-size: 0.9375rem;
  color: var(--muted);
}

.who {
  display: grid;
  gap: 1.75rem;
  align-items: center;
}
@media (min-width: 720px) {
  .who {
    grid-template-columns: 14rem minmax(0, 1fr);
    gap: 3rem;
  }
}
.photo {
  margin: 0;
}
.photo img,
.ph {
  width: min(14rem, 60%);
  aspect-ratio: 1;
  border-radius: 50%;
  object-fit: cover;
}
@media (min-width: 720px) {
  .photo img,
  .ph {
    width: 100%;
  }
}
.ph {
  display: grid;
  place-items: center;
  border: 2px dashed var(--muted);
  color: var(--muted);
  text-align: center;
  font-size: 0.875rem;
  line-height: 1.4;
}

.faq {
  margin: 2rem 0 0;
  display: grid;
  gap: 1.5rem;
  max-width: 48rem;
}
.faq dt {
  font-weight: 700;
  font-size: 1.125rem;
}
.faq dd {
  margin: 0.25rem 0 0;
  color: var(--muted);
}

.close {
  padding-block: clamp(3rem, 8vw, 5rem);
}
.close-in {
  display: grid;
  justify-items: start;
  gap: 1rem;
}
.close-title {
  margin: 0;
  font-size: clamp(1.875rem, 5vw, 3.25rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.04em;
  max-width: 18ch;
}
.close-text {
  margin: 0;
  color: var(--muted);
}
.sfoot {
  padding-block: 1.5rem 6rem;
  color: var(--muted);
  font-size: 0.9375rem;
}

/* Barra fixa só no celular. */
.dock {
  position: fixed;
  inset: auto 0 0 0;
  z-index: 40;
  padding: 0.625rem var(--gutter) calc(0.625rem + env(safe-area-inset-bottom));
  background: color-mix(in srgb, var(--paper) 92%, transparent);
  backdrop-filter: blur(8px);
  border-top: 1px solid var(--line);
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
