import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { lsGet, lsRemove, lsSet } from '../lib/store'

export type Role = 'student' | 'counselor'
export type User = {
  name: string
  email: string
  role: Role
  school: string           // the high school
  country?: string
  gradYear?: number        // students only
}

export const THIS_YEAR = new Date().getFullYear()
// A "senior" is in their final year of high school: graduating this academic
// year (or next spring, if we're already past the summer).
export function isSenior(u: User | null | undefined): boolean {
  if (!u || u.role !== 'student' || !u.gradYear) return false
  const m = new Date().getMonth() // 0..11
  const seniorYear = m >= 7 ? THIS_YEAR + 1 : THIS_YEAR
  return u.gradYear <= seniorYear
}

type Ctx = {
  user: User | null
  login: (u: User) => { ok: boolean; error?: string }
  update: (patch: Partial<User>) => void
  logout: () => void
}
const AuthCtx = createContext<Ctx>(null as unknown as Ctx)
const KEY = 'user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => lsGet<User | null>(KEY, null))
  useEffect(() => { user ? lsSet(KEY, user) : lsRemove(KEY) }, [user])

  function login(u: User) {
    const name = u.name.trim(), email = u.email.trim().toLowerCase(), school = u.school.trim()
    if (name.length < 2) return { ok: false, error: 'Please enter your full name.' }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Please enter a valid email address.' }
    if (!school) return { ok: false, error: 'Please enter your high school.' }
    if (u.role === 'student' && !u.gradYear) return { ok: false, error: 'Please pick your graduation year.' }
    setUser({ ...u, name, email, school })
    return { ok: true }
  }
  function update(patch: Partial<User>) { setUser((u) => (u ? { ...u, ...patch } : u)) }
  function logout() { setUser(null) }

  return <AuthCtx.Provider value={{ user, login, update, logout }}>{children}</AuthCtx.Provider>
}

export function useAuth() { return useContext(AuthCtx) }
