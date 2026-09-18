import { Link, useParams } from 'react-router-dom'
import { programBySlug, programsOf, schoolById } from '../data/schools'
import { SESSIONS, isPast } from '../data/sessions'
import { HERO_SHAPES, Shapes } from '../components/Brand'
import SessionCard from '../components/SessionCard'
import { LINKS, QR } from '../data/config'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../lib/progress'

export default function Program() {
  const { slug } = useParams()
  const p = programBySlug(slug)
  const { user } = useAuth()
  const { isDone } = useProgress(user?.email)
  if (!p) return <div className="wrap"><h1 className="page-title">Program not found</h1><Link to="/academics" className="btn btn-ghost" style={{ marginTop: 16 }}>All programs</Link></div>
  const school = schoolById(p.school)!
  const siblings = programsOf(p.school).filter((x) => x.slug !== p.slug)
  const sessions = SESSIONS.filter((s) => s.school === p.school && (s.status === 'recording' || !isPast(s))).slice(0, 3)

  return (
    <div className="wrap">
      <section className="prog-hero">
        <div className="eyebrow light" style={{ color: school.accent }}>{school.name}</div>
        <h1 style={{ marginTop: 12 }}>{p.name}</h1>
        <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
          <span className="tag" style={{ background: 'rgba(255,255,255,.14)', color: '#fff' }}>{p.degree}</span>
          <span className="tag" style={{ background: 'rgba(255,255,255,.14)', color: '#fff' }}>3 years · 180 ECTS</span>
          <span className="tag" style={{ background: 'rgba(255,255,255,.14)', color: '#fff' }}>Taught in English</span>
          <span className="tag" style={{ background: 'rgba(255,255,255,.14)', color: '#fff' }}>Bremen, Germany</span>
        </div>
        <p className="tagline">{p.tagline}</p>
        <div className="btn-row" style={{ marginTop: 20 }}>
          <a href={LINKS.apply} target="_blank" rel="noreferrer" className="btn btn-red">Apply for this program</a>
          <a href={p.url} target="_blank" rel="noreferrer" className="btn btn-outline-white">Official program page →</a>
        </div>
        <Shapes rows={HERO_SHAPES} cell={40} className="hero-shapes" />
      </section>

      <div className="grid cols-2" style={{ marginTop: 26, alignItems: 'start' }}>
        <div className="card pad">
          <div className="eyebrow" style={{ fontSize: 11 }}>What you actually study</div>
          <ul className="bullets" style={{ marginTop: 14 }}>{p.study.map((b) => <li key={b}>{b}</li>)}</ul>
        </div>
        <div className="card pad">
          <div className="eyebrow" style={{ fontSize: 11 }}>This is you if…</div>
          <ul className="bullets green" style={{ marginTop: 14 }}>{p.fit.map((b) => <li key={b}>{b}</li>)}</ul>
          <div className="eyebrow" style={{ fontSize: 11, marginTop: 22 }}>Where it takes you</div>
          <div className="careers" style={{ marginTop: 12 }}>{p.careers.map((c) => <span key={c}>{c}</span>)}</div>
        </div>
      </div>

      <div className="section-head"><div><div className="eyebrow">A day in the job</div><h2 style={{ marginTop: 8 }}>What the work looks like</h2></div></div>
      <div className="card pad"><p className="quote">{p.day}</p></div>

      {sessions.length > 0 && (
        <>
          <div className="section-head">
            <div><div className="eyebrow">Hear it live</div><h2 style={{ marginTop: 8 }}>Sessions from this school</h2></div>
            <Link to={`/sessions?school=${school.id}`} className="label" style={{ color: 'var(--sky-600)' }}>All →</Link>
          </div>
          <div className="grid cols-3">{sessions.map((s) => <SessionCard key={s.id} s={s} done={isDone(s.id)} />)}</div>
        </>
      )}

      <div className="grid cols-2" style={{ marginTop: 40 }}>
        <div className="card qr-card">
          <img src={QR.quiz} alt="QR code: take the study-program quiz" />
          <div>
            <div className="eyebrow" style={{ fontSize: 11 }}>Not sure it is the one?</div>
            <h3 style={{ marginTop: 6 }}>Take the program quiz</h3>
            <p>Scan or tap. Two minutes, and a suggestion from the university website.</p>
            <a href={LINKS.quiz} target="_blank" rel="noreferrer" className="btn btn-navy btn-sm" style={{ marginTop: 12 }}>Take the quiz →</a>
          </div>
        </div>
        <div className="card pad">
          <div className="eyebrow" style={{ fontSize: 11 }}>Talk it through</div>
          <h3 style={{ marginTop: 6, fontSize: 17 }}>Book a counselling session</h3>
          <p className="muted" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.55 }}>Thirty minutes with the recruitment team, online. Bring your questions about {p.name}, the application and scholarships.</p>
          <Link to="/counselling" className="btn btn-ghost btn-sm" style={{ marginTop: 12 }}>Schedule →</Link>
        </div>
      </div>

      {siblings.length > 0 && (
        <>
          <div className="section-head"><div><h2>More from {school.short}</h2></div></div>
          <div className="grid cols-3">
            {siblings.map((x) => (
              <Link key={x.slug} to={`/academics/${school.id}/${x.slug}`} className="card program" style={{ borderTopColor: school.accent }}>
                <div className="deg">{x.degree}</div><h3>{x.name}</h3><p>{x.tagline}</p><span className="go">Open →</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
