import { Link } from 'react-router-dom'
import { isSenior, useAuth } from '../context/AuthContext'
import { SchoolProgressList } from '../components/Progress'
import { useProgress } from '../lib/progress'
import { LINKS, REWARDS, mailTo } from '../data/config'
import { SCHOOLS } from '../data/schools'
import { verificationCode } from '../lib/certificate'

export default function Rewards() {
  const { user } = useAuth()
  const { bySchool } = useProgress(user?.email)
  const senior = isSenior(user)
  const counselor = user?.role === 'counselor'
  const complete = bySchool.filter((p) => p.complete)
  const admissions = mailTo()

  function claimHref(schoolId: string) {
    const sch = SCHOOLS.find((s) => s.id === schoolId)!
    const p = bySchool.find((x) => x.school === schoolId)!
    const code = verificationCode(user!.email, schoolId, p.sessions.map((s) => s.id))
    const reward = counselor ? 'Certificate of Engagement' : senior ? REWARDS.senior.title : REWARDS.junior.title
    const subject = encodeURIComponent(`Schools reward claim · ${user!.name} · ${sch.short}`)
    const body = encodeURIComponent(
      `Hello,\n\nI completed ${p.done} info sessions from the ${sch.name} on schools.weareconstructor.com and would like to claim: ${reward}.\n\nName: ${user!.name}\nEmail: ${user!.email}\nHigh school: ${user!.school}${user!.country ? ' (' + user!.country + ')' : ''}\n${user!.gradYear ? 'Graduation year: ' + user!.gradYear + '\n' : ''}Sessions: ${p.sessions.map((s) => s.title).join('; ')}\nVerification code: ${code}\n\nThank you,\n${user!.name}`,
    )
    return `mailto:${admissions}?subject=${subject}&body=${body}`
  }

  return (
    <div className="wrap">
      <div className="eyebrow">Rewards</div>
      <h1 className="page-title" style={{ marginTop: 10 }}>Show up three times. Get something real.</h1>
      <p className="page-sub">Complete {REWARDS.sessionsNeeded} info sessions from one school, live or recorded, and you unlock a reward and a certificate. Welcome and application sessions count for every school.</p>

      <div className="grid cols-3" style={{ marginTop: 26 }}>
        <div className="card reward" style={{ borderTop: '4px solid var(--red)' }}>
          <div className="big red">Housing</div>
          <span className="tag tag-red" style={{ marginTop: 10 }}>Final-year students</span>
          <h3>{REWARDS.senior.title}</h3>
          <p>{REWARDS.senior.body}</p>
        </div>
        <div className="card reward" style={{ borderTop: '4px solid var(--sky)' }}>
          <div className="big">€{REWARDS.junior.amount}</div>
          <span className="tag tag-sky" style={{ marginTop: 10 }}>Younger students</span>
          <h3>{REWARDS.junior.title}</h3>
          <p>{REWARDS.junior.body} <a href={LINKS.summerCamp} target="_blank" rel="noreferrer" style={{ color: 'var(--sky-600)', fontWeight: 700 }}>About the camp →</a></p>
        </div>
        <div className="card reward" style={{ borderTop: '4px solid var(--green)' }}>
          <div className="big">✓</div>
          <span className="tag tag-green" style={{ marginTop: 10 }}>Everyone</span>
          <h3>{REWARDS.certificate.title}</h3>
          <p>{REWARDS.certificate.body}</p>
        </div>
      </div>

      <div className="section-head"><div><h2>How it works</h2></div></div>
      <div className="steps">
        <div className="step"><div><b>Pick a school</b><p>Computer Science & Engineering, Natural Sciences, or Business, Social & Decision Sciences. You can work on all three.</p></div></div>
        <div className="step"><div><b>Attend live or watch the recording</b><p>Live: enter the attendance code shown on screen. Recording: keep the page open and mark it completed after the minimum watch time.</p></div></div>
        <div className="step"><div><b>Reach {REWARDS.sessionsNeeded} in one school</b><p>Your progress is tracked on this device under your email. The certificate unlocks immediately.</p></div></div>
        <div className="step"><div><b>Claim</b><p>Tap Claim below. It opens an email to the admissions team with your sessions and verification code. Housing is confirmed with your admission offer; the Summer Camp discount is applied at registration.</p></div></div>
      </div>

      <div className="section-head"><div><h2>Your progress</h2></div><Link to="/sessions" className="label" style={{ color: 'var(--sky-600)' }}>Sessions →</Link></div>
      <div className="grid cols-2" style={{ alignItems: 'start' }}>
        <SchoolProgressList bySchool={bySchool} />
        <div style={{ display: 'grid', gap: 12 }}>
          {complete.length === 0 ? (
            <div className="card pad">
              <h3 style={{ fontSize: 17 }}>Nothing to claim yet</h3>
              <p className="muted" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.55 }}>
                {counselor ? 'Counselors also earn the Certificate of Engagement.' : senior ? 'You are in your final year, so three sessions from one school mean guaranteed housing.' : `Three sessions from one school mean €${REWARDS.junior.amount} off the Summer Camp.`} Start with the welcome session; it counts for every school.
              </p>
              <Link to="/sessions/welcome-2026" className="btn btn-navy btn-sm" style={{ marginTop: 12 }}>Welcome session →</Link>
            </div>
          ) : complete.map((p) => {
            const sch = SCHOOLS.find((s) => s.id === p.school)!
            return (
              <div key={p.school} className="card pad" style={{ borderLeft: `4px solid ${sch.accent}` }}>
                <span className="tag tag-green">Unlocked</span>
                <h3 style={{ fontSize: 17, marginTop: 8 }}>{sch.short}</h3>
                <p className="muted" style={{ marginTop: 6, fontSize: 14 }}>{p.done} sessions completed.</p>
                <div className="btn-row" style={{ marginTop: 12 }}>
                  <a href={claimHref(p.school)} className="btn btn-red btn-sm">Claim {counselor ? 'certificate' : senior ? 'housing' : 'discount'}</a>
                  <Link to={`/certificate/${p.school}`} className="btn btn-ghost btn-sm">Open certificate</Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="section-head"><div><h2>The fine print</h2></div></div>
      <div className="faq">
        <details><summary>Who counts as a final-year student?</summary><p>Students graduating from high school in the current academic year. You set your graduation year when you signed in; you can change it in your profile.</p></details>
        <details><summary>What exactly is guaranteed?</summary><p>A room in one of the residential colleges on campus for your first year, confirmed with your admission offer, when you have completed three sessions from one school and submitted a complete application.</p></details>
        <details><summary>Can I combine sessions from different schools?</summary><p>The three sessions must be from one school. Welcome and application sessions count for every school, so one of those plus two from a school is enough.</p></details>
        <details><summary>Does the bonus content count?</summary><p>No. Only info sessions marked as counting towards the rewards do. Bonus videos are labelled.</p></details>
        <details><summary>I watched on another device. Where is my progress?</summary><p>Progress is stored on the device you watched on, under your email. Sign in with the same email on that device to see it, and claim from there. If something is missing, email the admissions team with the session titles and dates.</p></details>
      </div>
    </div>
  )
}
