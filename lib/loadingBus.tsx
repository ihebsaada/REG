type Callback = (state: boolean) => void
let listeners: Callback[] = []

export const loadingBus = {
  emit(state: boolean) {
    listeners.forEach((l, i) => {
      l(state)
    })
  },

  subscribe(cb: Callback) {
    listeners.push(cb)

    return () => {
      listeners = listeners.filter((l) => l !== cb)
    }
  },
}
