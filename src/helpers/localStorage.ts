export function getLocal(key: string): string | null {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

export function setLocal(key: string, value: string | number | boolean | object): void {
  const item = JSON.stringify(value)
  localStorage.setItem(key, item)
}

export function removeLocal(key: string): void {
  localStorage.removeItem(key)
}
