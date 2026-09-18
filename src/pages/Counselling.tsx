import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { LINKS, QR, liveContacts, mailTo } from '../data/config'
import { SCHOOLS } from '../data/schools'

const TOPICS = ['Choosing a program', 'Application & documents', 'Scholarships & tuition', 'Housing & campus life', 'Visa & arriving in Germany', 'A session for my whole class']
const SLOTS = ['Weekday morning (CET)', 'Weekday afternoon (CET)', 'Weekday evening (CET)', 'Any time']

export default function Counselling() {
  const { user } = useAuth()
  const [topics, setTopics] = useState<string[]>([])
  const [school, setSchool] = useState<string>('')
  const [slot, setSlot] = useState(SLOTS[3])
  const [note, setNote] = useState('')
  const to = mailTo()

  function toggle(t: string) { setTopics((c) => (c.includes(t) ? c.filter((x) => x !== t) : [...c, t])) }

  const subject = encodeURIComponent(`Counselling session request · ${user?.name ?? ''}${user?.role === 'counselor' ? ' (counselor)' : ''}`)
  const body = encodeURIComponent(
    `Hello,\n\nI would like to schedule a counselling session.\n\nName: ${user?.name}\nEmail: ${user?.email}\n${user?.role === 'counselor' ? 'Role: Counselor' : 'Role: Student' + (user?.gradYear ? ' · graduating ' + user.gradYear : '')}\nHigh school: ${user?.school}${user?.country ? ' (' + user.country + ')' : ''}\nInterested in: ${school ? SCHOOLS.find((s) => s.id === school)?.short : 'not sure yet'}\nTopics: ${topics.length ? topics.join(', ') : 'general'}\nPreferred time: ${slot}\n\n${note}\n\nThank you,\n${user?.name}`,
  )
  const mailto = `mailto:${to}?subject=${subject}&body=${body}`

  return (
    <div className="wrap">
      <div className="eyebrow">Talk to us</div>
      <h1 className="page-title" style={{ marginTop: 10 }}>Schedule a counselling session</h1>
      <p className="page-sub">Thirty to sixty minutes, online, one-to-one with the recruitment team. Students, parents and counselors welcome. Pick what you want to talk about and we come back with a time.</p>

      <div className="grid cols-2" style={{ marginTop: 26, alignItems: 'start' }}>
        <div>
          <div className="card pad">
            <h2 style={{ fontSize: 18 }}>Request a session</h2>
            <p className="muted small" style={{ marginTop: 6, marginBottom: 16, lineHeight: 1.5 }}>This opens a pre-filled email from your mail app. Edit anything before you send.</p>
            <div className="field">
              <span>I want to talk about</span>
              <div className="chips">{TOPICS.map((t) => <button type="button" key={t} className={`chip ${topics.includes(t) ? 'on' : ''}`} onClick={() => toggle(t)}>{t}</button>)}</div>
            </div>
            <label className="field"><span>School I am interested in</span>
              <select value={school} onChange={(e) => setSchool(e.target.value)}>
                <option value="">Not sure yet</option>
                {SCHOOLS.map((s) => <option key={s.id} value={s.id}>{s.short}</option>)}
              </select>
            </label>
            <label className="field"><span>Preferred time</span>
              <select value={slot} onChange={(e) => setSlot(e.target.value)}>{SLOTS.map((s) => <option key={s}>{s}</option>)}</select>
            </label>
            <label className="field"><span>Anything else</span><textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Questions, your situation, who is joining…" /></label>
            <a href={mailto} className="btn btn-red" style={{ width: '100%' }}>Send the request</a>
          </div>

          <div className="card pad" style={{ marginTop: 14 }}>
            <div className="eyebrow" style={{ fontSize: 11 }}>Prefer to book directly?</div>
            <h3 style={{ fontSize: 17, marginTop: 6 }}>Meet us virtually</h3>
            <p className="muted" style={{ marginTop: 6, fontSize: 14, lineHeight: 1.55 }}>Pick a 30–60 minute video slot with an admissions counselor on the university website.</p>
            <a href={LINKS.meetUs} target="_blank" rel="noreferrer" className="btn btn-navy btn-sm" style={{ marginTop: 12 }}>Book on constructor.university →</a>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 14 }}>
          {liveContacts().map((c) => (
            <div key={c.name} className="card contact">
              <div className="ava">{c.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</div>
              <div>
                <h3>{c.name}</h3>
                <div className="role">{c.role}</div>
                <p>{c.note}</p>
                {c.email ? <a className="mail" href={`mailto:${c.email}`}>{c.email}</a> : <a className="mail" href={mailto}>Request a session →</a>}
              </div>
            </div>
          ))}
          <div className="card qr-card">
            <img src={QR.apply} alt="QR code: application portal" />
            <div>
              <div className="eyebrow" style={{ fontSize: 11 }}>Apply</div>
              <h3 style={{ marginTop: 6 }}>Application portal</h3>
              <p>No application fee. Rolling admission, decision in 2–4 weeks. <a href={LINKS.applyInfo} target="_blank" rel="noreferrer" style={{ color: 'var(--sky-600)', fontWeight: 700 }}>What you need →</a></p>
              <a href={LINKS.apply} target="_blank" rel="noreferrer" className="btn btn-red btn-sm" style={{ marginTop: 12 }}>apply.constructor.university →</a>
            </div>
          </div>
          <div className="card pad">
            <div className="eyebrow" style={{ fontSize: 11 }}>For counselors</div>
            <h3 style={{ fontSize: 17, marginTop: 6 }}>Sessions for your whole class</h3>
            <p className="muted" style={{ marginTop: 6, fontSize: 14, lineHeight: 1.55 }}>We run private online sessions for a school or a class, and visit schools in the region. Ask for a session tailored to your students' interests.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
