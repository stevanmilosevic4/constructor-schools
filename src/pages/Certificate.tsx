import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../lib/progress'
import { schoolById } from '../data/schools'
import { fmtDate } from '../data/sessions'
import { verificationCode } from '../lib/certificate'
import { HERO_SHAPES, Logo, Ribbon, Shapes } from '../components/Brand'
import { REWARDS } from '../data/config'

export default function Certificate() {
  const { school: id } = useParams()
  const { user } = useAuth()
  const { bySchool } = useProgress(user?.email)
  const school = schoolById(id)
  const p = bySchool.find((x) => x.school === id)
  if (!user || !school || !p) return <div className="wrap"><h1 className="page-title">Certificate not found</h1></div>
  if (!p.complete) {
    return (
      <div className="wrap">
        <h1 className="page-title" style={{ fontSize: 32 }}>Not unlocked yet</h1>
        <p className="page-sub">Complete {REWARDS.sessionsNeeded} sessions from the {school.short} school to unlock this certificate. You have {p.done}.</p>
        <Link to={`/sessions?school=${school.id}`} className="btn btn-navy" style={{ marginTop: 16 }}>Sessions →</Link>
      </div>
    )
  }
  const code = verificationCode(user.email, school.id, p.sessions.map((s) => s.id))
  const issued = fmtDate(new Date().toISOString())

  return (
    <div className="wrap">
      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
        <div><div className="eyebrow">Certificate</div><h1 className="page-title" style={{ fontSize: 30, marginTop: 8 }}>Certificate of Engagement</h1></div>
        <div className="btn-row"><button className="btn btn-navy" onClick={() => window.print()}>Print / save as PDF</button></div>
      </div>

      <div className="cert">
        <Ribbon />
        <Shapes rows={HERO_SHAPES} cell={30} className="shapes" />
        <div className="cert-inner">
          <Logo size={26} />
          <div className="eyebrow" style={{ marginTop: 26 }}>Schools programme · {school.short}</div>
          <h1>Certificate of Engagement</h1>
          <div className="to">Awarded to</div>
          <div className="name">{user.name}</div>
          <p className="text">
            {user.role === 'counselor' ? 'Counselor at' : 'Student at'} <b>{user.school}</b>{user.country ? `, ${user.country}` : ''}, for completing {p.done} information sessions of the <b>{school.name}</b> at Constructor University Bremen, and engaging with its programs, faculty and students.
          </p>
          <div className="list">
            {p.sessions.map((s) => <div key={s.id}>• {s.title}</div>)}
          </div>
          <div className="foot">
            <div className="sig"><b>Admissions & Recruitment</b><span>Constructor University · Bremen, Germany</span></div>
            <div className="sig"><b>{issued}</b><span>Date of issue</span></div>
            <div className="vid">Verification {code}</div>
          </div>
        </div>
        <Ribbon />
      </div>
      <p className="no-print muted small" style={{ marginTop: 14, maxWidth: 720, lineHeight: 1.5 }}>
        The verification code is derived from your email and the sessions you completed. The admissions team can confirm it against your claim email. Completed assignments from the Challenges page can be added on request.
      </p>
    </div>
  )
}
