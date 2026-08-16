const KEY = 'echo:data'

export function loadFromStorage<T>(): T | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

export function saveToStorage<T>(data: T): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
    return true
  } catch (e) {
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      console.error('Armazenamento cheio. Exporte e limpe notas antigas.')
      return false
    }
    throw e
  }
}
