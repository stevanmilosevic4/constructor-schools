import { Link } from 'react-router-dom'
import { fmtDate, fmtTime, isLiveNow, isPast, type Session } from '../data/sessions'
import { schoolById } from '../data/schools'

export default function SessionCard({ s, done }: { s: Session; done?: boolean }) {
  const school = s.school === 'all' ? null : schoolById(s.school)
  const live = isLiveNow(s)
  const past = isPast(s)
  const upcoming = s.status === 'live' && !past
  return (
    <Link to={`/sessions/${s.id}`} className="card session">
      <div className="media">
        {s.photo && <img src={s.photo} alt="" loading="lazy" />}
        <span className={`tag badge ${live ? 'tag-live' : upcoming ? 'tag-sky' : 'tag-navy'}`}>
          {live ? 'Live now' : upcoming ? 'Live · upcoming' : 'Recording'}
        </span>
        {!upcoming && <span className="play">▶</span>}
        <div className="when">{upcoming ? `${fmtDate(s.start)} · ${fmtTime(s.start)}` : `${s.durationMin} min`}</div>
      </div>
      <div className="body">
        <span className="tag" style={{ background: school?.soft ?? 'var(--navy-soft)', color: 'var(--navy)', alignSelf: 'flex-start', marginBottom: 10 }}>
          {school ? school.short : 'All schools · Admissions'}
        </span>
        <h3>{s.title}</h3>
        <p>{s.blurb}</p>
        <div className="meta">
          {s.speakers && <span>{s.speakers}</span>}
          {s.counts === false && <span>· Bonus (no credit)</span>}
          {done && <span className="watched">✓ Completed</span>}
        </div>
      </div>
    </Link>
  )
}
