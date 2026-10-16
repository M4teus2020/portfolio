import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Elementos que entram com fade + subida ao chegar na tela. Seletores em vez de atributos,
// pra as views ganharem movimento sem edição.
const REVEAL = [
  '.eyebrow',
  '.band-title',
  '.band-sub',
  '.proof-item',
  '.case-link',
  '.work li',
  '.work-close',
  '.tl-item',
  '.client-row > *',
  '.contact .wrap > *',
  '.offer',
  '.ex',
  '.how > *',
  '.chapter',
  '.about-intro',
  '.edu',
  '.tools-row',
  '.case-sec',
  '.faq details',
  '.close .wrap > *',
].join(',')

const FINE = '(hover: hover) and (pointer: fine)'

// Quebra o nome do herói em letras animáveis, mantendo o <br> e o texto lido pelo leitor de tela.
function splitName(el: HTMLElement) {
  const orig = el.innerHTML
  el.setAttribute('aria-label', el.textContent?.replace(/\s+/g, ' ').trim() ?? '')
  const chars: HTMLElement[] = []
  const next = document.createDocumentFragment()
  el.childNodes.forEach((node) => {
    if (node.nodeType !== Node.TEXT_NODE) return void next.appendChild(node.cloneNode(true))
    for (const ch of node.textContent ?? '') {
      const s = document.createElement('span')
      s.textContent = ch
      s.setAttribute('aria-hidden', 'true')
      s.style.display = 'inline-block'
      chars.push(s)
      next.appendChild(s)
    }
  })
  el.replaceChildren(next)
  return {
    chars,
    restore: () => {
      el.innerHTML = orig
      el.removeAttribute('aria-label')
    },
  }
}

// Liga todo o movimento de uma página recém-montada. Devolve a função que desfaz tudo.
export function initMotion(root: HTMLElement) {
  const mm = gsap.matchMedia()

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const undo: Array<() => void> = []

    // Entrada do herói: nome letra por letra, depois o resto em cascata.
    const name = root.querySelector<HTMLElement>('[data-hero] .name')
    if (name) {
      const { chars, restore } = splitName(name)
      undo.push(restore)
      const rest = root.querySelectorAll(
        '[data-hero] .title, [data-hero] .lede, [data-hero] .facts li, [data-hero] .actions > *',
      )
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from('[data-hero] .kicker', { y: 16, opacity: 0, duration: 0.7 })
        .from(chars, { yPercent: 70, opacity: 0, rotate: 4, duration: 1.1, stagger: 0.035 }, 0.1)
        .from(rest, { y: 22, opacity: 0, duration: 0.8, stagger: 0.07 }, 0.55)
    }

    // Heróis sem o nome grande (ex.: Serviços): entrada simples em cascata.
    else if (root.querySelector('[data-hero]')) {
      gsap.from('[data-hero] .kicker, [data-hero] .title, [data-hero] .lede', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'expo.out',
      })
    }

    // Parallax do desenho do herói conforme a rolagem.
    const art = root.querySelector<HTMLElement>('[data-hero] .hero-art')
    if (art) {
      gsap.to(art, {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: { trigger: art, start: 'top 80%', end: 'bottom top', scrub: 0.6 },
      })
    }

    // Reveals por seção, em lote (escalonados quando vários entram juntos).
    const items = gsap.utils
      .toArray<HTMLElement>(REVEAL, root)
      .filter((e) => !e.closest('[data-hero]'))
    gsap.set(items, { opacity: 0, y: 28 })
    ScrollTrigger.batch(items, {
      start: 'top 92%',
      once: true,
      onEnter: (els) =>
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.09,
          ease: 'expo.out',
          overwrite: true,
          clearProps: 'transform', // devolve o transform ao CSS (hover dos cartões)
        }),
    })

    // Linha da trajetória se preenche conforme a rolagem.
    root.querySelectorAll<HTMLElement>('.tl').forEach((el) => {
      gsap.to(el, {
        '--tl': 1,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 70%', end: 'bottom 60%', scrub: 0.5 },
      })
    })

    // Números da faixa de prova contam até o valor.
    root.querySelectorAll<HTMLElement>('.proof-big').forEach((el) => {
      const m = el.textContent?.match(/^(\D*)(\d+)(.*)$/)
      if (!m) return
      const [, pre, num, post] = m
      const state = { v: 0 }
      el.textContent = `${pre}0${post}`
      ScrollTrigger.create({
        trigger: el,
        start: 'top 92%',
        once: true,
        onEnter: () =>
          gsap.to(state, {
            v: Number(num),
            duration: 1.4,
            ease: 'power3.out',
            onUpdate: () => (el.textContent = `${pre}${Math.round(state.v)}${post}`),
          }),
      })
      undo.push(() => (el.textContent = `${pre}${num}${post}`))
    })

    // Linhas de divisão das seções se desenham ao entrar.
    root.querySelectorAll<HTMLElement>('.band').forEach((el) => {
      gsap.fromTo(
        el,
        { '--rule': 0 },
        {
          '--rule': 1,
          duration: 1.3,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 94%', once: true },
        },
      )
    })

    // Só com mouse: botões magnéticos e holofote nos cartões.
    const fine = gsap.matchMedia()
    fine.add(FINE, () => {
      const offs: Array<() => void> = []
      root.querySelectorAll<HTMLElement>('.btn').forEach((b) => {
        const qx = gsap.quickTo(b, 'x', { duration: 0.5, ease: 'power3' })
        const qy = gsap.quickTo(b, 'y', { duration: 0.5, ease: 'power3' })
        const move = (e: PointerEvent) => {
          const r = b.getBoundingClientRect()
          qx((e.clientX - (r.left + r.width / 2)) * 0.22)
          qy((e.clientY - (r.top + r.height / 2)) * 0.28)
        }
        const leave = () => {
          qx(0)
          qy(0)
        }
        b.addEventListener('pointermove', move)
        b.addEventListener('pointerleave', leave)
        offs.push(() => {
          b.removeEventListener('pointermove', move)
          b.removeEventListener('pointerleave', leave)
        })
      })
      root.querySelectorAll<HTMLElement>('.case-link, .offer').forEach((c) => {
        c.classList.add('spot')
        const move = (e: PointerEvent) => {
          const r = c.getBoundingClientRect()
          c.style.setProperty('--sx', `${e.clientX - r.left}px`)
          c.style.setProperty('--sy', `${e.clientY - r.top}px`)
        }
        c.addEventListener('pointermove', move)
        offs.push(() => {
          c.removeEventListener('pointermove', move)
          c.classList.remove('spot')
        })
      })
      return () => offs.forEach((f) => f())
    })
    undo.push(() => fine.revert())

    return () => undo.forEach((f) => f())
  })

  return () => mm.revert()
}
