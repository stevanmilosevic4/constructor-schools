import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { THIS_YEAR, useAuth, type Role } from '../context/AuthContext'
import { Logo, Ribbon } from '../components/Brand'
import { REWARDS } from '../data/config'

const YEARS = [0, 1, 2, 3, 4].map((i) => THIS_YEAR + i)

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [role, setRole] = useState<Role>('student')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [school, setSchool] = useState('')
  const [country, setCountry] = useState('')
  const [gradYear, setGradYear] = useState<number>(YEARS[1])
  const [err, setErr] = useState<string | null>(null)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const res = login({ name, email, role, school, country: country.trim() || undefined, gradYear: role === 'student' ? gradYear : undefined })
    if (!res.ok) { setErr(res.error ?? 'Could not sign in'); return }
    nav('/')
  }

  return (
    <div className="login-screen">
      <aside className="login-aside">
        <div>
          <Logo size={30} onDark />
          <div style={{ marginTop: 10 }}><Ribbon onNavy style={{ width: 120 }} /></div>
        </div>
        <div>
          <div className="kick" style={{ color: '#00B2FF', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', fontSize: 12 }}>For high schools · Counselors & students</div>
          <h1 style={{ marginTop: 14 }}>Your window into<br />Constructor University.</h1>
          <p className="lead">Live info sessions, recordings, every undergraduate program explained in plain words, student challenges, and a direct line to the recruitment team.</p>
          <div className="pills">
            <span className="pill">Bremen, Germany</span>
            <span className="pill">100% in English</span>
            <span className="pill">#1 private university in Germany</span>
            <span className="pill">120+ nationalities</span>
          </div>
        </div>
        <div style={{ color: 'rgba(255,255,255,.6)', fontSize: 13 }}>Constructing the future · constructor.university</div>
      </aside>

      <section className="login-main">
        <div className="login-box">
          <div className="login-mbrand"><Logo size={24} /></div>
          <div className="eyebrow">Welcome</div>
          <h2>Sign in to start.</h2>
          <p className="hint">We only use this to track which sessions you watch, so your rewards and certificate are yours. No password.</p>

          <form onSubmit={submit}>
            {err && <div className="form-err">{err}</div>}
            <div className="field">
              <span>I am a</span>
              <div className="radio-row">
                {(['student', 'counselor'] as Role[]).map((r) => (
                  <label key={r} className={role === r ? 'on' : ''}>
                    <input type="radio" name="role" checked={role === r} onChange={() => setRole(r)} />
                    {r === 'student' ? 'High-school student' : 'Counselor / teacher'}
                  </label>
                ))}
              </div>
            </div>
            <label className="field"><span>Full name</span><input value={name} onChange={(e) => { setName(e.target.value); setErr(null) }} placeholder="e.g. Ana Petrović" autoFocus /></label>
            <label className="field"><span>Email</span><input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErr(null) }} placeholder="you@school.edu" /></label>
            <label className="field"><span>High school</span><input value={school} onChange={(e) => { setSchool(e.target.value); setErr(null) }} placeholder="Name of your school" /></label>
            <div className="grid cols-2" style={{ gap: 12 }}>
              <label className="field"><span>Country</span><input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="optional" /></label>
              {role === 'student' && (
                <label className="field"><span>Graduation year</span>
                  <select value={gradYear} onChange={(e) => setGradYear(Number(e.target.value))}>
                    {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </label>
              )}
            </div>
            <button type="submit" className="btn btn-red" style={{ width: '100%', marginTop: 4 }}>Enter</button>
          </form>

          <div className="fine">
            Watch {REWARDS.sessionsNeeded} sessions from one school and you unlock <b>{REWARDS.senior.title.toLowerCase()}</b> (final-year students), <b>{REWARDS.junior.title}</b> (everyone else) and a <b>{REWARDS.certificate.title}</b>. Your details stay with the Constructor University recruitment team.
          </div>
        </div>
      </section>
    </div>
  )
}
