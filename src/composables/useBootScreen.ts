import { ref, readonly } from 'vue'

const STORAGE_KEY = 'mf-booted'

const visible = ref(false)
const phase = ref<'typing' | 'done'>('typing')

function init() {
  try {
    if (localStorage.getItem(STORAGE_KEY)) {
      visible.value = false
    } else {
      visible.value = true
      phase.value = 'typing'
    }
  } catch {
    visible.value = false
  }
}

function finish() {
  try {
    localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // ignore write errors
  }
  phase.value = 'done'
}

function hide() {
  visible.value = false
}

function restart() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
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
