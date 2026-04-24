import { ref, readonly } from 'vue'

const STORAGE_KEY = 'mf-booted'

const visible = ref(false)
const phase = ref<'typing' | 'done'>('typing')

function init() {
  if (localStorage.getItem(STORAGE_KEY)) {
    visible.value = false
  } else {
    visible.value = true
    phase.value = 'typing'
  }
}

function finish() {
  localStorage.setItem(STORAGE_KEY, '1')
  phase.value = 'done'
}

function hide() {
  visible.value = false
}

function restart() {
  localStorage.removeItem(STORAGE_KEY)
  phase.value = 'typing'
  visible.value = true
}

export function useBootScreen() {
  return {
    visible: readonly(visible),
    phase: readonly(phase),
    init,
    finish,
    hide,
    restart,
  }
}
