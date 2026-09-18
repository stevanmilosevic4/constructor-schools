import { ASSIGNMENTS, SPRING_CHALLENGE } from '../data/challenges'
import { SCHOOLS } from '../data/schools'
import { HERO_SHAPES, Shapes } from '../components/Brand'

export default function Challenges() {
  return (
    <div className="wrap">
      <div className="eyebrow">Student challenges</div>
      <h1 className="page-title" style={{ marginTop: 10 }}>Do something, not just watch</h1>
      <p className="page-sub">Two ways to get hands-on before you apply: the official Constructor Spring Challenge, and short assignments set by our faculty for schools in this programme.</p>

      <section className="hero" style={{ marginTop: 26, padding: 36 }}>
        <div className="hero-grid" style={{ gridTemplateColumns: '1.2fr .8fr' }}>
          <div>
            <div className="kick">Official · Free · Online · Ages 14–18</div>
            <h1 style={{ fontSize: 'clamp(28px,4.5vw,44px)', marginTop: 10 }}>{SPRING_CHALLENGE.name}</h1>
            <p className="sub">{SPRING_CHALLENGE.tagline} {SPRING_CHALLENGE.what}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
              {SPRING_CHALLENGE.tracks.map((t) => <span key={t} className="tag" style={{ background: 'rgba(255,255,255,.14)', color: '#fff' }}>{t}</span>)}
            </div>
            <div className="btn-row" style={{ marginTop: 22 }}>
              <a href={SPRING_CHALLENGE.url} target="_blank" rel="noreferrer" className="btn btn-red">Official page & registration →</a>
            </div>
          </div>
          <div className="countdown">
            <h4>At a glance</h4>
            <div style={{ display: 'grid', gap: 12, marginTop: 12, fontSize: 14, lineHeight: 1.5 }}>
              <div><b style={{ color: '#00B2FF' }}>Who</b><br />{SPRING_CHALLENGE.who}</div>
              <div><b style={{ color: '#00B2FF' }}>When</b><br />{SPRING_CHALLENGE.when}</div>
              <div><b style={{ color: '#00B2FF' }}>Format</b><br />{SPRING_CHALLENGE.format}</div>
            </div>
          </div>
        </div>
        <Shapes rows={HERO_SHAPES} cell={40} className="hero-shapes" />
      </section>

      <div className="grid cols-3" style={{ marginTop: 18 }}>
        {SPRING_CHALLENGE.awards.map((a, i) => (
          <div key={a} className="card pad" style={{ borderTop: `4px solid ${['var(--sky)', 'var(--yellow)', 'var(--green)'][i]}` }}>
            <div className="eyebrow" style={{ fontSize: 11 }}>Award</div>
            <p style={{ marginTop: 8, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.45 }}>{a}</p>
          </div>
        ))}
      </div>

      <div className="section-head">
        <div><div className="eyebrow">For your school</div><h2 style={{ marginTop: 8 }}>Assignments from the faculty</h2></div>
        <span className="label">Set by the recruitment team</span>
      </div>
      <div className="notice" style={{ marginBottom: 18 }}>
        <span>ℹ</span>
        <span>Assignments open per school throughout the year. When one is live, the card shows the deadline and a submit button. Completed assignments are mentioned on your Certificate of Engagement.</span>
      </div>
      <div className="grid cols-3">
        {ASSIGNMENTS.map((a) => {
          const sch = SCHOOLS.find((s) => s.id === a.school)
          return (
            <div key={a.id} className="card program" style={{ borderTopColor: sch?.accent ?? 'var(--navy)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
                <div className="deg">{sch ? sch.short : 'All schools'}</div>
                <span className={`tag ${a.status === 'open' ? 'tag-green' : a.status === 'closed' ? 'tag-navy' : 'tag-yellow'}`}>{a.status === 'open' ? 'Open' : a.status === 'closed' ? 'Closed' : 'Coming soon'}</span>
              </div>
              <h3>{a.title}</h3>
              <p>{a.blurb}</p>
              {a.due && <div className="small muted"><b>Due:</b> {a.due}</div>}
              {a.status === 'open' && a.url
                ? <a href={a.url} target="_blank" rel="noreferrer" className="btn btn-navy btn-sm" style={{ alignSelf: 'flex-start' }}>Open assignment →</a>
                : <span className="go" style={{ color: 'var(--grey-500)' }}>Submission link will appear here</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
