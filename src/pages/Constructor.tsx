import { Link } from 'react-router-dom'
import { CAMPUS, CAMPUS_LIFE, FACTS, GROUP_PILLARS, HIGHLIGHTS } from '../data/group'
import { HERO_SHAPES, Shapes } from '../components/Brand'
import { LINKS } from '../data/config'

export default function Constructor() {
  return (
    <div className="wrap">
      <section className="hero photo" style={{ ['--hero-img' as string]: 'url(/photos/campus-green.jpg)' }}>
        <div className="hero-grid">
          <div>
            <div className="kick">Why Constructor · Bremen, Germany · Est. 2001</div>
            <h1 style={{ fontSize: 'clamp(32px,5.5vw,56px)' }}>A university that also builds, invests and races.</h1>
            <p className="sub">Constructor University is the #1 private university in Germany and part of Constructor Group, a global ecosystem of education, technology and capital. That combination is the point: you study, research, intern and launch inside the same network.</p>
            <div className="btn-row" style={{ marginTop: 22 }}>
              <Link to="/academics" className="btn btn-red">See the programs</Link>
              <a href={LINKS.site} target="_blank" rel="noreferrer" className="btn btn-outline-white">constructor.university →</a>
            </div>
          </div>
          <div className="stats" style={{ marginTop: 0 }}>
            {FACTS.map((f) => (
              <div className="stat" key={f.cap} style={{ background: 'rgba(0,10,26,.45)', borderColor: 'rgba(255,255,255,.14)' }}>
                <div className="num" style={{ color: '#fff' }}>{f.num}</div><div className="cap" style={{ color: 'rgba(255,255,255,.7)' }}>{f.cap}</div><div className="src" style={{ color: 'rgba(255,255,255,.5)' }}>{f.src}</div>
              </div>
            ))}
          </div>
        </div>
        <Shapes rows={HERO_SHAPES} cell={44} className="hero-shapes" />
      </section>

      <div className="section-head"><div><div className="eyebrow">Constructor Group</div><h2 style={{ marginTop: 8 }}>One ecosystem: knowledge, technology, capital</h2></div></div>
      <div className="grid cols-4">
        {GROUP_PILLARS.map((p) => (
          <div key={p.k} className="card pillar"><div className="k">{p.k}</div><h3>{p.title}</h3><p>{p.body}</p></div>
        ))}
      </div>

      <div className="section-head"><div><div className="eyebrow">Proof</div><h2 style={{ marginTop: 8 }}>Things that happened on this campus</h2></div></div>
      <div className="grid cols-3">
        {HIGHLIGHTS.map((h) => (
          <article key={h.id} className="card hl">
            <div className="media"><img src={h.image} alt="" className={h.contain ? 'contain' : ''} loading="lazy" /></div>
            <div className="body"><div className="eyebrow" style={{ fontSize: 11 }}>{h.eyebrow}</div><h3 style={{ marginTop: 8 }}>{h.title}</h3><p>{h.body}</p></div>
          </article>
        ))}
      </div>

      <div className="section-head"><div><div className="eyebrow">Student life</div><h2 style={{ marginTop: 8 }}>What it is like to live here</h2></div></div>
      <div className="grid cols-3">
        {CAMPUS_LIFE.map((c) => (
          <div key={c.t} className="card pad"><h3 style={{ fontSize: 17 }}>{c.t}</h3><p className="muted" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.55 }}>{c.p}</p></div>
        ))}
      </div>

      <div className="section-head"><div><div className="eyebrow">Campus</div><h2 style={{ marginTop: 8 }}>Bremen-Grohn, five minutes from everything</h2></div><span className="label">scroll →</span></div>
      <div className="gallery">
        {CAMPUS.map((c) => (
          <figure key={c.img}><img src={c.img} alt={c.cap} loading="lazy" /><figcaption>{c.cap}</figcaption></figure>
        ))}
      </div>

      <div className="split" style={{ marginTop: 40 }}>
        <img src="/photos/a2rl-overtake.jpg" alt="Constructor's autonomous race car overtaking at Yas Marina" />
        <div>
          <div className="eyebrow">Physical AI</div>
          <h2 style={{ marginTop: 10, fontSize: 26 }}>The campus where a race car drives itself</h2>
          <p className="lead" style={{ marginTop: 12 }}>Constructor Racing, born in the university\'s robotics labs, finished P2 in the world\'s first autonomous race and made the first autonomous overtake on an F1 circuit. Students work in those labs from their first year.</p>
          <div className="btn-row" style={{ marginTop: 16 }}>
            <Link to="/sessions/rec-cse-a2rl" className="btn btn-navy btn-sm">Watch the story</Link>
            <a href={LINKS.a2rl} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">Constructor × A2RL →</a>
          </div>
        </div>
      </div>

      <div className="card navy pad" style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div>
          <div className="eyebrow light">Next step</div>
          <h2 style={{ marginTop: 8, fontSize: 24 }}>Convinced? Watch a session, then talk to us.</h2>
          <p style={{ color: 'rgba(255,255,255,.75)', marginTop: 8, maxWidth: 560, lineHeight: 1.55 }}>Three sessions from one school unlock guaranteed housing or a Summer Camp discount, and a certificate. A counselling session answers the rest.</p>
        </div>
        <div className="btn-row">
          <Link to="/sessions" className="btn btn-red">Sessions</Link>
          <Link to="/counselling" className="btn btn-white">Talk to us</Link>
        </div>
      </div>
    </div>
  )
}
