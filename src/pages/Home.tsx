import { Link } from 'react-router-dom'
import { isSenior, useAuth } from '../context/AuthContext'
import Countdown from '../components/Countdown'
import SessionCard from '../components/SessionCard'
import { HERO_SHAPES, Shapes } from '../components/Brand'
import { SchoolProgressList } from '../components/Progress'
import { SESSIONS, fmtDate, fmtTime, isPast, nextLive } from '../data/sessions'
import { SCHOOLS } from '../data/schools'
import { FACTS, HIGHLIGHTS } from '../data/group'
import { LINKS, QR, REWARDS } from '../data/config'
import { useProgress } from '../lib/progress'

export default function Home() {
  const { user } = useAuth()
  const { bySchool, isDone } = useProgress(user?.email)
  const firstName = user?.name.split(' ')[0] ?? 'there'
  const next = nextLive()
  const upcoming = SESSIONS.filter((s) => s.status === 'live' && !isPast(s)).sort((a, b) => +new Date(a.start) - +new Date(b.start)).slice(0, 3)
  const recordings = SESSIONS.filter((s) => s.status === 'recording').slice(0, 3)
  const senior = isSenior(user)
  const counselor = user?.role === 'counselor'

  return (
    <div className="wrap">
      <section className="hero photo rise" style={{ ['--hero-img' as string]: 'url(/photos/campus-aerial.jpg)' }}>
        <div className="hero-grid">
          <div>
            <div className="kick">{counselor ? 'For counselors' : 'For high-school students'} · Bremen, Germany</div>
            <h1>Hello,<br />{firstName}.</h1>
            <p className="sub">
              {counselor
                ? 'Everything your students need to get to know Constructor University: live sessions, recordings, every program in plain words, and the rewards they earn for showing up.'
                : 'Watch the sessions, explore the programs, and earn real rewards for it. Three sessions from one school unlock ' + (senior ? 'guaranteed housing' : '€300 off the Summer Camp') + ' and a certificate.'}
            </p>
            <div className="btn-row" style={{ marginTop: 24 }}>
              <Link to="/sessions" className="btn btn-red">Watch the sessions</Link>
              <Link to="/academics" className="btn btn-outline-white">Explore the programs</Link>
            </div>
          </div>
          <div>
            {next ? (
              <Countdown target={next.start} title={next.title} />
            ) : (
              <div className="countdown"><h4>Sessions</h4><div className="cd-title">New live dates are being scheduled. The recordings are open.</div></div>
            )}
            {next && (
              <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap', fontSize: 13, color: 'rgba(255,255,255,.8)' }}>
                <span>{fmtDate(next.start)} · {fmtTime(next.start)}</span>
                <Link to={`/sessions/${next.id}`} style={{ color: '#00B2FF', fontWeight: 700 }}>Details & calendar →</Link>
              </div>
            )}
          </div>
        </div>
        <Shapes rows={HERO_SHAPES} cell={44} className="hero-shapes" />
      </section>

      {/* FACTS */}
      <div className="stats">
        {FACTS.map((f) => (
          <div className="stat" key={f.cap}><div className="num">{f.num}</div><div className="cap">{f.cap}</div><div className="src">{f.src}</div></div>
        ))}
      </div>

      {/* PROGRESS */}
      <div className="section-head">
        <div><div className="eyebrow">Your progress</div><h2 style={{ marginTop: 8 }}>{REWARDS.sessionsNeeded} sessions from one school unlock the rewards</h2></div>
        <Link to="/rewards" className="label" style={{ color: 'var(--sky-600)' }}>How rewards work →</Link>
      </div>
      <div className="grid cols-2" style={{ alignItems: 'start' }}>
        <SchoolProgressList bySchool={bySchool} />
        <div className="card pad" style={{ borderLeft: '4px solid var(--red)' }}>
          <h3 style={{ fontSize: 18 }}>{senior ? REWARDS.senior.title : REWARDS.junior.title}</h3>
          <p className="muted" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.55 }}>{senior ? REWARDS.senior.body : REWARDS.junior.body}</p>
          <p className="muted" style={{ marginTop: 10, fontSize: 14, lineHeight: 1.55 }}><b style={{ color: 'var(--navy)' }}>Plus:</b> {REWARDS.certificate.body}</p>
          <div className="btn-row" style={{ marginTop: 14 }}>
            <Link to="/sessions" className="btn btn-navy btn-sm">Start watching</Link>
            <Link to="/counselling" className="btn btn-ghost btn-sm">Book a counselling session</Link>
          </div>
        </div>
      </div>

      {/* UPCOMING */}
      <div className="section-head">
        <div><div className="eyebrow">Live</div><h2 style={{ marginTop: 8 }}>Upcoming sessions</h2></div>
        <Link to="/sessions" className="label" style={{ color: 'var(--sky-600)' }}>All sessions →</Link>
      </div>
      <div className="grid cols-3">
        {upcoming.map((s) => <SessionCard key={s.id} s={s} done={isDone(s.id)} />)}
      </div>

      {/* SCHOOLS */}
      <div className="section-head">
        <div><div className="eyebrow">Academics</div><h2 style={{ marginTop: 8 }}>Three schools, sixteen majors, all in English</h2></div>
        <Link to="/academics" className="label" style={{ color: 'var(--sky-600)' }}>Every program →</Link>
      </div>
      <div className="grid cols-3">
        {SCHOOLS.map((s) => (
          <Link key={s.id} to={`/academics/${s.id}`} className="card program" style={{ borderTopColor: s.accent }}>
            <div className="deg">School</div>
            <h3>{s.short}</h3>
            <p>{s.pitch}</p>
            <span className="go">See the programs →</span>
          </Link>
        ))}
      </div>

      {/* RECORDINGS */}
      {recordings.length > 0 && (
        <>
          <div className="section-head">
            <div><div className="eyebrow">Library</div><h2 style={{ marginTop: 8 }}>Recordings</h2></div>
          </div>
          <div className="grid cols-3">
            {recordings.map((s) => <SessionCard key={s.id} s={s} done={isDone(s.id)} />)}
          </div>
        </>
      )}

      {/* WHY CONSTRUCTOR */}
      <div className="section-head">
        <div><div className="eyebrow">Why Constructor</div><h2 style={{ marginTop: 8 }}>Things that happened on this campus</h2></div>
        <Link to="/constructor" className="label" style={{ color: 'var(--sky-600)' }}>The whole story →</Link>
      </div>
      <div className="grid cols-3">
        {HIGHLIGHTS.slice(0, 3).map((h) => (
          <article key={h.id} className="card hl">
            <div className="media"><img src={h.image} alt="" className={h.contain ? 'contain' : ''} loading="lazy" /></div>
            <div className="body"><div className="eyebrow" style={{ fontSize: 11 }}>{h.eyebrow}</div><h3 style={{ marginTop: 8 }}>{h.title}</h3><p>{h.body}</p></div>
          </article>
        ))}
      </div>

      {/* QUIZ + APPLY */}
      <div className="grid cols-2" style={{ marginTop: 40 }}>
        <div className="card qr-card">
          <img src={QR.quiz} alt="QR code: take the study-program quiz" />
          <div>
            <div className="eyebrow" style={{ fontSize: 11 }}>Not sure which program?</div>
            <h3 style={{ marginTop: 6 }}>Take the 2-minute quiz</h3>
            <p>Scan the code or tap the button. The quiz on our website matches your interests to a Constructor University program.</p>
            <a href={LINKS.quiz} target="_blank" rel="noreferrer" className="btn btn-navy btn-sm" style={{ marginTop: 12 }}>Take the quiz →</a>
          </div>
        </div>
        <div className="card qr-card">
          <img src={QR.apply} alt="QR code: application portal" />
          <div>
            <div className="eyebrow" style={{ fontSize: 11 }}>Ready?</div>
            <h3 style={{ marginTop: 6 }}>Apply online, no fee</h3>
            <p>Rolling admission: decisions within 2 to 4 weeks. Create your account on the application portal and upload as you go.</p>
            <a href={LINKS.apply} target="_blank" rel="noreferrer" className="btn btn-red btn-sm" style={{ marginTop: 12 }}>Start your application →</a>
          </div>
        </div>
      </div>
    </div>
  )
}
