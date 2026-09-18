import { twMerge } from 'tailwind-merge'

export function cn(...classes: Array<string | false | null | undefined>) {
  return twMerge(classes.filter(Boolean).join(' '))
}

export function readStored<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}

export function writeStored<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function initials(name?: string) {
  return (name || 'PrepKite').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
}
