<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { CONTACT, PHOTO_URL, WHATSAPP } from '@/config/site'
import { siteExamples } from '@/data/siteExamples'
import { useMeta } from '@/composables/useMeta'

// Página de venda da prospecção: celular primeiro, sem menu do portfólio.
// Só em português de propósito (o público é o comércio local).
// Classes evitam os nomes que o motion/init.ts esconde até a rolagem (.ex, .close, .how):
// aqui o conteúdo aparece sempre, mesmo sem a animação.
useMeta(() => ({
  title: 'Site para comércio local · Mateus Felini',
  description:
    'Seus clientes te acham no Google e chamam no WhatsApp. Eu monto uma demonstração da sua página inicial, sem custo, e você avalia antes de comprar.',
}))

// TODO: trocar WHATSAPP (src/config/site.ts) pelo número do chip novo quando ele existir.
function wa(message: string) {
  return WHATSAPP
    ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`
    : `mailto:${CONTACT.email}?body=${encodeURIComponent(message)}`
}
const target = WHATSAPP ? '_blank' : undefined
const cta = WHATSAPP ? 'Chamar no WhatsApp' : 'Chamar por e-mail'
const ctaDemo = 'Peça sua demonstração sem compromisso'

const msg = {
  geral: 'Oi Mateus, vi a página de sites e quero uma demonstração para o meu negócio.',
  essencial: 'Oi Mateus, vi a página de sites e quero o plano Essencial para o meu negócio.',
  completo: 'Oi Mateus, vi a página de sites e quero o plano Completo para o meu negócio.',
  medida: 'Oi Mateus, vi a página de sites e quero um orçamento de sistema sob medida.',
}

// Os dois exemplos mais fortes por enquanto (ver docs/proposta-exemplos-v3.md).
const vitrine = ['Lume Odontologia', 'Fio Reto Barbearia']
  .map((n) => siteExamples.find((e) => e.name === n))
  .filter((e): e is NonNullable<typeof e> => !!e)
const phone = vitrine[0]

const leva = [
  { k: 'Ser encontrado', d: 'Seu negócio aparece no Google com nome, endereço e fotos de verdade.' },
  { k: 'Ver o que você vende', d: 'Cardápio, serviços ou produtos num lugar só, sem pedir no direct.' },
  { k: 'Chamar no WhatsApp', d: 'Um toque e a mensagem já vai pronta. Você atende do jeito de sempre.' },
  { k: 'Saber como chegar', d: 'Horário, mapa e se está aberto agora. Menos pergunta repetida.' },
]

const nichos = [
  {
    k: 'Odontologia',
    d: 'Tratamentos, apresentação da clínica, localização e botão de agendamento pelo WhatsApp.',
  },
  { k: 'Restaurante e lanchonete', d: 'Cardápio sempre à vista, horário e pedido direto no WhatsApp.' },
  {
    k: 'Pet shop',
    d: 'Serviços, produtos, localização e contato direto, sem o cliente ter que perguntar.',
  },
  { k: 'Barbearia e salão', d: 'Serviços com duração, horários e agendamento pelo WhatsApp.' },
  {
    k: 'Oficina',
    d: 'Serviços, marcas atendidas, endereço e pedido de orçamento pelo WhatsApp.',
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
  {
    k: 'Você me chama.',
    d: 'Eu pesquiso o seu negócio e vejo o que faria diferença para os seus clientes.',
  },
  {
    k: 'Demonstração sem custo.',
    d: 'Monto a página inicial com a sua cara e te mostro. Você só avalia.',
  },
  { k: 'Orçamento claro.', d: 'Se gostou, eu passo o valor do site completo. Sem pressão.' },
  {
    k: 'Site no ar.',
    d: 'Com a sua aprovação, o site completo entra no ar com endereço .com.br seu.',
  },
]

const perguntas = [
  {
    k: 'A demonstração tem custo?',
    d: 'Não. A demonstração da página inicial é sem custo e sem compromisso. O orçamento do site completo só vem se você quiser seguir.',
  },
  {
    k: 'Quanto tempo leva?',
    d: 'A demonstração fica pronta em poucos dias. Depois da sua aprovação, o site completo costuma entrar no ar em poucos dias também, e o prazo exato vai no orçamento.',
  },
  {
    k: 'Preciso entender de internet?',
    d: 'Não. Você me conta o que precisa e eu cuido da parte técnica.',
  },
  { k: 'O site é meu?', d: 'O endereço fica no seu nome.' },
  { k: 'E se eu quiser mudar algo depois?', d: 'Me chama no WhatsApp e a gente combina.' },
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
        <div class="hero-text">
          <p class="brandline">Mateus Felini · sites para comércio local</p>
          <h1 class="title">Seu cliente te acha no Google e chama no WhatsApp.</h1>
          <p class="lede">
            Eu pesquiso o seu negócio, monto uma demonstração da sua página inicial e você avalia
            antes de comprar qualquer coisa.
          </p>
          <div class="actions" data-cta>
            <a class="btn btn-solid big" :href="wa(msg.geral)" :target="target" rel="noreferrer">{{
              ctaDemo
            }}</a>
          </div>
          <p class="from">
            Demonstração sem custo. Sites a partir de <strong>R$ 297</strong>, pagamento único.
          </p>
        </div>
        <div v-if="phone" class="phone-wrap">
          <a
            class="phone"
            :href="phone.url"
            target="_blank"
            rel="noreferrer"
            :aria-label="`Abrir o exemplo ${phone.name}`"
          >
            <span class="screen" :style="{ backgroundImage: `url(${phone.image})` }">
              <iframe
                :src="phone.url"
                title="Exemplo de site"
                loading="lazy"
                tabindex="-1"
                aria-hidden="true"
              ></iframe>
            </span>
          </a>
          <p class="phone-cap">Site de exemplo. Toque para abrir e mexer.</p>
        </div>
      </section>
    </div>

    <section class="wrap block" aria-labelledby="leva">
      <h2 id="leva" class="h2">O que o seu cliente passa a fazer.</h2>
      <ul class="cols">
        <li v-for="l in leva" :key="l.k">
          <h3>{{ l.k }}</h3>
          <p>{{ l.d }}</p>
        </li>
      </ul>
    </section>

    <section class="wrap block" aria-labelledby="nicho">
      <h2 id="nicho" class="h2">O que a página faz pelo seu ramo.</h2>
      <ul class="niches">
        <li v-for="n in nichos" :key="n.k">
          <h3>{{ n.k }}</h3>
          <p>{{ n.d }}</p>
        </li>
      </ul>
    </section>

    <section v-if="vitrine.length" class="wrap block" aria-labelledby="ex">
      <h2 id="ex" class="h2">Veja de perto. Abre no celular e mexe.</h2>
      <p class="text note">
        São negócios inventados, feitos para mostrar o que dá para fazer no seu.
      </p>
      <ul class="demos">
        <li v-for="ex in vitrine" :key="ex.url">
          <a :href="ex.url" target="_blank" rel="noreferrer" class="demo">
            <img v-if="ex.image" :src="ex.image" :alt="`Exemplo: ${ex.name}`" loading="lazy" />
            <span class="ex-name">{{ ex.name }}</span>
            <span class="ex-pitch">{{ ex.pitch }}</span>
            <span class="ex-open">Abrir o exemplo</span>
          </a>
        </li>
      </ul>
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

    <section class="wrap block who" aria-labelledby="quem">
      <figure class="photo">
        <span v-if="PHOTO_URL" class="avatar"><img :src="PHOTO_URL" alt="Mateus Felini" /></span>
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

    <section class="deep fecho" aria-labelledby="fecho">
      <div class="wrap fecho-in" data-cta>
        <h2 id="fecho" class="close-title">Me manda o nome do seu negócio no WhatsApp.</h2>
        <p class="close-text">Eu respondo pessoalmente e começo pela demonstração.</p>
        <a class="btn btn-solid big" :href="wa(msg.geral)" :target="target" rel="noreferrer">{{
          ctaDemo
        }}</a>
      </div>
    </section>

    <footer class="wrap sfoot">Mateus Felini · Sites para comércio local</footer>

    <!-- Barra fixa no celular: fundo sólido, some quando já há um botão grande na tela. -->
    <div class="dock" :class="{ off: !dockOn }">
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
  gap: 2.5rem;
  align-items: center;
}
.hero-text {
  display: grid;
  justify-items: start;
}
@media (min-width: 900px) {
  .hero {
    grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
    padding-block: 2rem 4rem;
  }
}
.brandline {
  margin: 0 0 2rem;
  font: 500 0.8125rem/1.2 var(--mono);
  color: var(--muted);
}
.title {
  margin: 0;
  font-size: clamp(2.25rem, 7vw, 4.25rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.04em;
  max-width: 16ch;
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

/* Celular com um site real dentro: a prova visual logo no topo. */
.phone-wrap {
  justify-self: center;
  display: grid;
  gap: 0.75rem;
  justify-items: center;
}
.phone {
  display: block;
  width: min(15.5rem, 70vw);
  aspect-ratio: 9 / 18;
  padding: 0.5rem;
  border-radius: 2rem;
  background: #1b1f1d;
  border: 2px solid var(--deep-line);
  box-shadow: 0 30px 60px -25px rgb(0 0 0 / 0.7);
}
.screen {
  display: block;
  position: relative;
  height: 100%;
  border-radius: 1.5rem;
  overflow: hidden;
  background: #fff center left / auto 100% no-repeat;
}
/* O site real roda em 390px de largura e é encolhido para caber na moldura. */
.screen iframe {
  position: absolute;
  inset: 0 auto auto 0;
  width: 390px;
  height: 780px;
  border: 0;
  transform: scale(0.585);
  transform-origin: 0 0;
  pointer-events: none;
  background: #fff;
}
.phone-cap {
  margin: 0;
  font: 500 0.8125rem/1.2 var(--mono);
  color: var(--muted);
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
.niches,
.demos {
  list-style: none;
  margin: 2rem 0 0;
  padding: 0;
  display: grid;
  gap: 1.75rem;
}
@media (min-width: 720px) {
  .cols {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem 3rem;
  }
  .steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2.25rem 3rem;
  }
  .niches {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2rem 3rem;
  }
  .demos {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
  }
}
.cols h3,
.steps h3,
.niches h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.015em;
}
.cols p,
.steps p,
.niches p {
  margin: 0.5rem 0 0;
  color: var(--muted);
  max-width: 38ch;
}
.niches li {
  padding-top: 1rem;
  border-top: 2px solid var(--mato);
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

.demo {
  display: grid;
  gap: 0.375rem;
  align-content: start;
  text-decoration: none;
  color: inherit;
}
.demo img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border: 1px solid var(--line);
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: transform 0.25s var(--ease);
}
.demo:hover img {
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
.avatar,
.ph {
  display: block;
  width: min(14rem, 60%);
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
}
/* Foto de espelho: aproxima no rosto (terço de cima, um pouco à esquerda). */
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.7);
  transform-origin: 47% 33%;
}
@media (min-width: 720px) {
  .avatar,
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

.fecho {
  padding-block: clamp(3rem, 8vw, 5rem);
}
.fecho-in {
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
