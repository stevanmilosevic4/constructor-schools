// Persistence seam. Today everything lives in localStorage (per device).
// Swap these four functions for a backend (Supabase / the VPS API) when
// the recruitment team needs to see progress centrally — nothing else
// in the app needs to change.
import { useEffect, useState } from 'react'

const PREFIX = 'cuschools.'

export function lsGet<T>(key: string, fallback: T): T {
  try {
    const s = localStorage.getItem(PREFIX + key)
    return s ? (JSON.parse(s) as T) : fallback
  } catch {
    return fallback
  }
}
export function lsSet<T>(key: string, value: T) {
  try { localStorage.setItem(PREFIX + key, JSON.stringify(value)) } catch { /* storage blocked */ }
}
export function lsRemove(key: string) {
  try { localStorage.removeItem(PREFIX + key) } catch { /* ignore */ }
}

export function usePersisted<T>(key: string, initial: T) {
  const [val, setVal] = useState<T>(() => lsGet<T>(key, initial))
  useEffect(() => { lsSet(key, val) }, [key, val])
  return [val, setVal] as const
}

export function useToast() {
  const [msg, setMsg] = useState<string | null>(null)
  function show(m: string) {
    setMsg(m)
    window.setTimeout(() => setMsg(null), 2600)
  }
  return { msg, show }
}
