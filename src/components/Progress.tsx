import { Link } from 'react-router-dom'
import { SCHOOLS } from '../data/schools'
import type { SchoolProgress } from '../lib/progress'
import { REWARDS } from '../data/config'

export function Ring({ value, max, color = 'var(--navy)' }: { value: number; max: number; color?: string }) {
  const r = 36, c = 2 * Math.PI * r
  const pct = Math.min(1, value / max)
  return (
    <div className="pr-track">
      <svg width="84" height="84" viewBox="0 0 84 84">
        <circle cx="42" cy="42" r={r} fill="none" stroke="var(--grey-200)" strokeWidth="8" />
        <circle cx="42" cy="42" r={r} fill="none" stroke={color} strokeWidth="8" strokeDasharray={`${c * pct} ${c}`} strokeLinecap="butt" />
      </svg>
      <div className="n">{value}/{max}</div>
    </div>
  )
}

export function SchoolProgressList({ bySchool, compact = false }: { bySchool: SchoolProgress[]; compact?: boolean }) {
  return (
    <div className="school-progress">
      {bySchool.map((p) => {
        const sch = SCHOOLS.find((s) => s.id === p.school)!
        return (
          <div className="sp-row" key={p.school}>
            <div className="swatch" style={{ background: sch.accent }} />
            <div>
              <div className="name">{sch.short}</div>
              {!compact && (
                <div className="sub">
                  {p.complete ? 'Complete — rewards unlocked' : `${p.needed - p.done} more to unlock rewards`}
                  {' · '}<Link to={`/sessions?school=${sch.id}`} style={{ color: 'var(--sky-600)', fontWeight: 700 }}>sessions →</Link>
                </div>
              )}
            </div>
            <div className="dots" aria-label={`${p.done} of ${REWARDS.sessionsNeeded}`}>
              {Array.from({ length: REWARDS.sessionsNeeded }).map((_, i) => <span key={i} className={i < p.done ? 'on' : ''} />)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
