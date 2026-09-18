import { useState } from 'react'
import { Link } from 'react-router-dom'
import { THIS_YEAR, isSenior, useAuth } from '../context/AuthContext'
import { SchoolProgressList } from '../components/Progress'
import { useProgress } from '../lib/progress'
import { SESSIONS, fmtDate } from '../data/sessions'
import { SCHOOLS } from '../data/schools'
import { REWARDS } from '../data/config'
import { useToast } from '../lib/store'

export default function Profile() {
  const { user, update } = useAuth()
  const { completions, bySchool } = useProgress(user?.email)
  const { msg, show } = useToast()
  const [school, setSchool] = useState(user?.school ?? '')
  const [country, setCountry] = useState(user?.country ?? '')
  const [gradYear, setGradYear] = useState(user?.gradYear ?? THIS_YEAR + 1)
  if (!user) return null
  const senior = isSenior(user)

  function save(e: React.FormEvent) {
    e.preventDefault()
    update({ school: school.trim(), country: country.trim() || undefined, gradYear: user!.role === 'student' ? gradYear : undefined })
    show('Saved ✓')
  }

  return (
    <div className="wrap">
      <div className="eyebrow">Profile</div>
      <h1 className="page-title" style={{ marginTop: 10 }}>{user.name}</h1>
      <p className="page-sub">{user.role === 'counselor' ? 'Counselor' : `Student${user.gradYear ? ` · graduating ${user.gradYear}` : ''}${senior ? ' · final year' : ''}`} · {user.school}{user.country ? `, ${user.country}` : ''} · {user.email}</p>

      <div className="grid cols-2" style={{ marginTop: 26, alignItems: 'start' }}>
        <div>
          <div className="section-head" style={{ marginTop: 0 }}><div><h2>Progress</h2></div><Link to="/rewards" className="label" style={{ color: 'var(--sky-600)' }}>Rewards →</Link></div>
          <SchoolProgressList bySchool={bySchool} />

          <div className="section-head"><div><h2>Certificates</h2></div></div>
          {bySchool.filter((p) => p.complete).length === 0 ? (
            <div className="card pad muted small">Complete {REWARDS.sessionsNeeded} sessions from one school to unlock your Certificate of Engagement.</div>
          ) : (
            <div style={{ display: 'grid', gap: 10 }}>
              {bySchool.filter((p) => p.complete).map((p) => {
                const sch = SCHOOLS.find((s) => s.id === p.school)!
                return (
                  <div key={p.school} className="card pad" style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', flexWrap: 'wrap', borderLeft: `4px solid ${sch.accent}` }}>
                    <div><b>{REWARDS.certificate.title}</b><div className="muted small">{sch.name}</div></div>
                    <Link to={`/certificate/${p.school}`} className="btn btn-navy btn-sm">Open & print</Link>
                  </div>
                )
              })}
            </div>
          )}

          <div className="section-head"><div><h2>Completed sessions</h2></div></div>
          {completions.length === 0 ? (
            <div className="card pad muted small">Nothing yet. <Link to="/sessions" style={{ color: 'var(--sky-600)', fontWeight: 700 }}>Start with a session →</Link></div>
          ) : (
            <div style={{ display: 'grid', gap: 8 }}>
              {completions.map((c) => {
                const s = SESSIONS.find((x) => x.id === c.sessionId)
                if (!s) return null
                return (
                  <Link key={c.sessionId} to={`/sessions/${s.id}`} className="card" style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                    <div><b style={{ fontSize: 14 }}>{s.title}</b><div className="muted small">{c.how === 'code' ? 'Attended live' : 'Watched recording'} · {fmtDate(new Date(c.at).toISOString())}</div></div>
                    <span className="tag tag-green">✓</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <form className="card pad" onSubmit={save}>
          <h2 style={{ fontSize: 18, marginBottom: 14 }}>Your details</h2>
          <label className="field"><span>Name</span><input value={user.name} readOnly /></label>
          <label className="field"><span>Email</span><input value={user.email} readOnly /></label>
          <label className="field"><span>High school</span><input value={school} onChange={(e) => setSchool(e.target.value)} /></label>
          <label className="field"><span>Country</span><input value={country} onChange={(e) => setCountry(e.target.value)} /></label>
          {user.role === 'student' && (
            <label className="field"><span>Graduation year</span>
              <select value={gradYear} onChange={(e) => setGradYear(Number(e.target.value))}>
                {[0, 1, 2, 3, 4].map((i) => THIS_YEAR + i).map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </label>
          )}
          <button className="btn btn-navy" type="submit" style={{ width: '100%' }}>Save</button>
          <p className="fine">Your progress is stored on this device under your email. To change your name or email, sign out and sign in again.</p>
        </form>
      </div>
      {msg && <div className="toast"><span className="ok">●</span>{msg}</div>}
    </div>
  )
}
