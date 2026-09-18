// Watch progress + rewards logic.
//
// A "completion" is one session credited to a student, either by entering
// the attendance code of a live session or by watching a recording for at
// least MIN_WATCH_MINUTES. Welcome/admissions sessions (school 'all') count
// towards every school. Three completions in one school unlock the rewards.
import { SCHOOLS, type SchoolId } from '../data/schools'
import { SESSIONS, type Session } from '../data/sessions'
import { REWARDS } from '../data/config'
import { lsGet, lsSet } from './store'
import { useCallback, useEffect, useState } from 'react'

export type Completion = { sessionId: string; at: number; how: 'code' | 'watched' }

const KEY = (email: string) => `progress:${email.trim().toLowerCase()}`

export function loadCompletions(email: string): Completion[] {
  return lsGet<Completion[]>(KEY(email), [])
}
export function saveCompletions(email: string, list: Completion[]) {
  lsSet(KEY(email), list)
  window.dispatchEvent(new CustomEvent('cuschools:progress'))
}
export function credit(email: string, sessionId: string, how: Completion['how']): Completion[] {
  const list = loadCompletions(email)
  if (list.some((c) => c.sessionId === sessionId)) return list
  const next = [...list, { sessionId, at: Date.now(), how }]
  saveCompletions(email, next)
  return next
}

export function countsFor(s: Session, school: SchoolId): boolean {
  if (s.counts === false) return false
  return s.school === 'all' || s.school === school
}

export type SchoolProgress = { school: SchoolId; done: number; needed: number; sessions: Session[]; complete: boolean }

export function schoolProgress(completions: Completion[]): SchoolProgress[] {
  const doneIds = new Set(completions.map((c) => c.sessionId))
  return SCHOOLS.map((sch) => {
    const sessions = SESSIONS.filter((s) => doneIds.has(s.id) && countsFor(s, sch.id))
    return { school: sch.id, done: sessions.length, needed: REWARDS.sessionsNeeded, sessions, complete: sessions.length >= REWARDS.sessionsNeeded }
  })
}

export function bestSchool(completions: Completion[]): SchoolProgress {
  return schoolProgress(completions).sort((a, b) => b.done - a.done)[0]
}

export function useProgress(email: string | undefined) {
  const [list, setList] = useState<Completion[]>(() => (email ? loadCompletions(email) : []))
  useEffect(() => {
    if (!email) { setList([]); return }
    setList(loadCompletions(email))
    const h = () => setList(loadCompletions(email))
    window.addEventListener('cuschools:progress', h)
    return () => window.removeEventListener('cuschools:progress', h)
  }, [email])
  const add = useCallback((sessionId: string, how: Completion['how']) => {
    if (!email) return
    setList(credit(email, sessionId, how))
  }, [email])
  return { completions: list, add, bySchool: schoolProgress(list), isDone: (id: string) => list.some((c) => c.sessionId === id) }
}

// Unlock-timer for recordings: minutes the player has been open, per session.
const TIMER_KEY = (email: string, id: string) => `watch:${email.trim().toLowerCase()}:${id}`
export function loadWatchSeconds(email: string, id: string): number { return lsGet<number>(TIMER_KEY(email, id), 0) }
export function saveWatchSeconds(email: string, id: string, secs: number) { lsSet(TIMER_KEY(email, id), secs) }
