import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import SessionCard from '../components/SessionCard'
import { SESSIONS, isPast } from '../data/sessions'
import { SCHOOLS } from '../data/schools'
import { useProgress } from '../lib/progress'
import { REWARDS } from '../data/config'

export default function Sessions() {
  const { user } = useAuth()
  const { isDone } = useProgress(user?.email)
  const [params, setParams] = useSearchParams()
  const school = params.get('school') ?? 'all'

  const filtered = SESSIONS.filter((s) => school === 'all' || s.school === 'all' || s.school === school)
  const live = filtered.filter((s) => s.status === 'live' && !isPast(s)).sort((a, b) => +new Date(a.start) - +new Date(b.start))
  const recordings = filtered.filter((s) => s.status === 'recording' || (s.status === 'live' && isPast(s)))

  return (
    <div className="wrap">
      <div className="eyebrow">Info sessions</div>
      <h1 className="page-title" style={{ marginTop: 10 }}>Sessions</h1>
      <p className="page-sub">
        Live webinars with faculty, students and admissions, plus the recordings. Attend live and enter the attendance code, or watch a recording to the end.
        Every {REWARDS.sessionsNeeded} sessions from one school unlock your rewards. Welcome and application sessions count for every school.
      </p>

      <div className="chips" style={{ marginTop: 22 }}>
        <button className={`chip ${school === 'all' ? 'on' : ''}`} onClick={() => setParams({})}>All schools</button>
        {SCHOOLS.map((s) => (
          <button key={s.id} className={`chip ${school === s.id ? 'on' : ''}`} onClick={() => setParams({ school: s.id })}>
            <span className="dot" style={{ background: s.accent }} />{s.short}
          </button>
        ))}
      </div>

      <div className="section-head">
        <div><h2>Live & upcoming</h2></div>
        <span className="label">Shown in your local time</span>
      </div>
      {live.length === 0 ? (
        <div className="card pad muted">No live sessions scheduled for this filter yet. New dates are announced here and by email.</div>
      ) : (
        <div className="grid cols-3">{live.map((s) => <SessionCard key={s.id} s={s} done={isDone(s.id)} />)}</div>
      )}

      <div className="section-head">
        <div><h2>Recordings</h2></div>
        <span className="label">Watch any time</span>
      </div>
      {recordings.length === 0 ? (
        <div className="card pad muted">Recordings appear here a few days after each live session.</div>
      ) : (
        <div className="grid cols-3">{recordings.map((s) => <SessionCard key={s.id} s={s} done={isDone(s.id)} />)}</div>
      )}
    </div>
  )
}
