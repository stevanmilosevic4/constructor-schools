import { Link, useNavigate, useParams } from 'react-router-dom'
import { SCHOOLS, programsOf, schoolById } from '../data/schools'
import { LINKS, QR } from '../data/config'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../lib/progress'
import { Ring } from '../components/Progress'

export default function Academics() {
  const { school: param } = useParams()
  const nav = useNavigate()
  const school = schoolById(param) ?? SCHOOLS[0]
  const programs = programsOf(school.id)
  const { user } = useAuth()
  const { bySchool } = useProgress(user?.email)
  const prog = bySchool.find((p) => p.school === school.id)!

  return (
    <div className="wrap">
      <div className="eyebrow">Academics</div>
      <h1 className="page-title" style={{ marginTop: 10 }}>What you can study</h1>
      <p className="page-sub">
        Three schools, sixteen undergraduate majors, three years, all taught in English. Pick a school, then tap a program to see what you would actually study, the careers it leads to, and what the job looks like day to day.
      </p>

      <div className="tabs" role="tablist">
        {SCHOOLS.map((s) => (
          <button key={s.id} role="tab" aria-selected={s.id === school.id} className={`tab ${s.id === school.id ? 'on' : ''}`} onClick={() => nav(`/academics/${s.id}`)}>
            <span className="dot" style={{ display: 'inline-block', width: 10, height: 10, background: s.accent, marginRight: 8 }} />{s.short}
          </button>
        ))}
      </div>

      <section className="school-hero" style={{ background: `linear-gradient(120deg, var(--navy) 55%, ${school.accent}55)`, marginTop: 22 }}>
        <div>
          <div className="eyebrow light" style={{ color: school.accent }}>{school.name}</div>
          <h2 style={{ marginTop: 10 }}>{school.pitch}</h2>
          <p>{school.intro}</p>
          <div className="btn-row" style={{ marginTop: 18 }}>
            <Link to={`/sessions?school=${school.id}`} className="btn btn-white btn-sm">Sessions for this school</Link>
            <a href={school.url} target="_blank" rel="noreferrer" className="btn btn-outline-white btn-sm">On constructor.university →</a>
          </div>
        </div>
        <div className="photo"><img src={school.photo} alt="" /></div>
      </section>

      <div className="section-head">
        <div><h2>{programs.length} undergraduate programs</h2></div>
        <div className="progress-ring" style={{ gap: 12 }}>
          <Ring value={prog.done} max={prog.needed} color={school.accent} />
          <div className="small muted" style={{ maxWidth: 180 }}>{prog.complete ? 'Rewards unlocked for this school' : `Sessions watched for this school`}</div>
        </div>
      </div>
      <div className="grid cols-3">
        {programs.map((p) => (
          <Link key={p.slug} to={`/academics/${school.id}/${p.slug}`} className="card program" style={{ borderTopColor: school.accent }}>
            <div className="deg">{p.degree} · 3 years</div>
            <h3>{p.name}</h3>
            <p>{p.tagline}</p>
            <span className="go">What you study, careers, a day in the job →</span>
          </Link>
        ))}
      </div>

      <div className="grid cols-2" style={{ marginTop: 40 }}>
        <div className="card qr-card">
          <img src={QR.quiz} alt="QR code: take the study-program quiz" />
          <div>
            <div className="eyebrow" style={{ fontSize: 11 }}>Still deciding?</div>
            <h3 style={{ marginTop: 6 }}>Take the program quiz</h3>
            <p>Two minutes, a few questions about what you enjoy, and a program suggestion from our website.</p>
            <a href={LINKS.quiz} target="_blank" rel="noreferrer" className="btn btn-navy btn-sm" style={{ marginTop: 12 }}>Take the quiz →</a>
          </div>
        </div>
        <div className="card pad">
          <div className="eyebrow" style={{ fontSize: 11 }}>Good to know</div>
          <h3 style={{ marginTop: 6, fontSize: 17 }}>Major + minor, and you can switch</h3>
          <p className="muted" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.55 }}>
            You choose a major, add a minor from any school, and can still change your major in the first year. Every program includes an internship, and the CONSTRUCTOR Track adds skills every graduate needs: argumentation, data, communication.
          </p>
          <a href={LINKS.undergrad} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{ marginTop: 12 }}>Undergraduate education on constructor.university →</a>
        </div>
      </div>
    </div>
  )
}
