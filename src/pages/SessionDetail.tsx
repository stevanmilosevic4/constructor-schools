import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Countdown from '../components/Countdown'
import { MIN_WATCH_MINUTES, fmtDate, fmtTime, isLiveNow, isPast, sessionById } from '../data/sessions'
import { schoolById } from '../data/schools'
import { downloadIcs } from '../lib/ics'
import { loadWatchSeconds, saveWatchSeconds, useProgress } from '../lib/progress'
import { useToast } from '../lib/store'
import { REWARDS } from '../data/config'

export default function SessionDetail() {
  const { id } = useParams()
  const s = sessionById(id)
  const { user } = useAuth()
  const { isDone, add, bySchool } = useProgress(user?.email)
  const { msg, show } = useToast()
  const [code, setCode] = useState('')
  const [err, setErr] = useState<string | null>(null)

  // Recording watch timer: counts while the page is open and visible.
  const email = user?.email ?? ''
  const [secs, setSecs] = useState(() => (s && email ? loadWatchSeconds(email, s.id) : 0))
  const secsRef = useRef(secs)
  secsRef.current = secs
  const needSecs = MIN_WATCH_MINUTES * 60
  const past = s ? isPast(s) : false
  const canWatch = s ? s.status === 'recording' || past : false
  const hasVideo = Boolean(s?.youtubeId)

  useEffect(() => {
    if (!s || !email || !canWatch || !hasVideo) return
    const tick = setInterval(() => {
      if (document.visibilityState !== 'visible') return
      const next = Math.min(needSecs, secsRef.current + 1)
      setSecs(next)
      if (next % 10 === 0 || next === needSecs) saveWatchSeconds(email, s.id, next)
    }, 1000)
    return () => { clearInterval(tick); saveWatchSeconds(email, s.id, secsRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s?.id, email, canWatch, hasVideo])

  if (!s) return <div className="wrap"><h1 className="page-title">Session not found</h1><Link to="/sessions" className="btn btn-ghost" style={{ marginTop: 16 }}>All sessions</Link></div>

  const school = s.school === 'all' ? null : schoolById(s.school)
  const done = isDone(s.id)
  const live = isLiveNow(s)
  const upcoming = s.status === 'live' && !past
  const counts = s.counts !== false
  const unlocked = secs >= needSecs

  function submitCode(e: React.FormEvent) {
    e.preventDefault()
    if (!s) return
    if (!s.code) { setErr('This session has no attendance code.'); return }
    if (code.trim().toUpperCase() !== s.code.toUpperCase()) { setErr('That code does not match. It is shown on screen during the session — check your notes.'); return }
    add(s.id, 'code')
    show('Attendance logged ✓')
    setErr(null)
  }
  function markWatched() {
    if (!s) return
    add(s.id, 'watched')
    show('Session completed ✓')
  }

  const progressFor = school ? bySchool.find((p) => p.school === school.id) : bySchool.sort((a, b) => b.done - a.done)[0]

  return (
    <div className="wrap">
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <span className={`tag ${live ? 'tag-live' : upcoming ? 'tag-sky' : 'tag-navy'}`}>{live ? 'Live now' : upcoming ? 'Live · upcoming' : 'Recording'}</span>
        <span className="tag" style={{ background: school?.soft ?? 'var(--navy-soft)', color: 'var(--navy)' }}>{school ? school.short : 'All schools · Admissions'}</span>
        {done && <span className="tag tag-green">✓ Completed</span>}
        {!counts && <span className="tag tag-yellow">Bonus · no credit</span>}
      </div>
      <h1 className="page-title" style={{ marginTop: 12, fontSize: 'clamp(28px,4.5vw,44px)' }}>{s.title}</h1>
      <p className="page-sub">{s.blurb}</p>
      <div className="muted" style={{ marginTop: 10, fontSize: 14, fontWeight: 700 }}>
        {upcoming ? `${fmtDate(s.start)} · ${fmtTime(s.start)} · ${s.durationMin} min` : `${s.durationMin} min`}{s.speakers ? ` · ${s.speakers}` : ''}
      </div>

      <div className="grid cols-2" style={{ marginTop: 26, alignItems: 'start', gridTemplateColumns: '1.4fr .9fr' }}>
        <div>
          {upcoming ? (
            <div className="hero" style={{ padding: 28 }}>
              <Countdown target={s.start} title={live ? 'The session is live. Join now.' : 'Starts in'} kicker="Live session" />
              <div className="btn-row" style={{ marginTop: 18 }}>
                {s.joinUrl && <a className="btn btn-red" href={s.joinUrl} target="_blank" rel="noreferrer">{live ? 'Join now' : 'Join link'}</a>}
                <button className="btn btn-outline-white" onClick={() => downloadIcs(s)}>Add to calendar (.ics)</button>
              </div>
              <p style={{ color: 'rgba(255,255,255,.75)', fontSize: 13, marginTop: 14, lineHeight: 1.5 }}>
                During the session we show an <b style={{ color: '#fff' }}>attendance code</b>. Enter it on this page to log the session towards your rewards. Missed it? The recording will appear here afterwards.
              </p>
            </div>
          ) : (
            <div className="video-frame">
              {hasVideo ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${s.youtubeId}?rel=0`}
                  title={s.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="video-placeholder">
                  <div>
                    <div className="big">▶</div>
                    <div style={{ fontWeight: 700, marginTop: 8 }}>Recording coming soon</div>
                    <div style={{ color: 'rgba(255,255,255,.7)', fontSize: 13, marginTop: 6 }}>Recordings are uploaded a few days after the live session.</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gap: 14 }}>
          {counts ? (
            <div className={`card pad gate ${done ? 'done' : ''}`}>
              {done ? (
                <>
                  <h3 style={{ fontSize: 17 }}>Logged ✓</h3>
                  <p className="muted small" style={{ marginTop: 6, lineHeight: 1.5 }}>This session counts towards {school ? school.short : 'every school'}.</p>
                </>
              ) : upcoming ? (
                <form onSubmit={submitCode}>
                  <h3 style={{ fontSize: 17 }}>Attendance code</h3>
                  <p className="muted small" style={{ marginTop: 6, marginBottom: 12, lineHeight: 1.5 }}>Shown on screen during the live session.</p>
                  {err && <div className="form-err">{err}</div>}
                  <label className="field"><span>Code</span><input value={code} onChange={(e) => { setCode(e.target.value); setErr(null) }} placeholder="CU-XXXX-0000" style={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '.08em' }} /></label>
                  <button className="btn btn-navy" type="submit" style={{ width: '100%' }}>Log my attendance</button>
                </form>
              ) : hasVideo ? (
                <>
                  <h3 style={{ fontSize: 17 }}>Watch to complete</h3>
                  <p className="muted small" style={{ marginTop: 6, lineHeight: 1.5 }}>Keep this page open while you watch. After {MIN_WATCH_MINUTES} minutes you can mark the session as completed.</p>
                  <div className="gate-bar"><div style={{ width: `${Math.round((secs / needSecs) * 100)}%` }} /></div>
                  <div className="muted small" style={{ marginTop: 6 }}>{Math.floor(secs / 60)}:{String(secs % 60).padStart(2, '0')} / {MIN_WATCH_MINUTES}:00</div>
                  <button className="btn btn-navy" style={{ width: '100%', marginTop: 12 }} disabled={!unlocked} onClick={markWatched}>{unlocked ? 'I watched this session' : 'Keep watching…'}</button>
                  {s.code && (
                    <form onSubmit={submitCode} style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--line)' }}>
                      <p className="muted small" style={{ marginBottom: 8 }}>Were you there live? Enter the attendance code instead.</p>
                      {err && <div className="form-err">{err}</div>}
                      <label className="field"><span>Code</span><input value={code} onChange={(e) => { setCode(e.target.value); setErr(null) }} placeholder="CU-XXXX-0000" /></label>
                      <button className="btn btn-ghost btn-sm" type="submit">Log attendance</button>
                    </form>
                  )}
                </>
              ) : (
                <form onSubmit={submitCode}>
                  <h3 style={{ fontSize: 17 }}>Were you there live?</h3>
                  <p className="muted small" style={{ marginTop: 6, marginBottom: 12, lineHeight: 1.5 }}>Enter the attendance code from the session. Otherwise, come back when the recording is up.</p>
                  {err && <div className="form-err">{err}</div>}
                  <label className="field"><span>Code</span><input value={code} onChange={(e) => { setCode(e.target.value); setErr(null) }} placeholder="CU-XXXX-0000" /></label>
                  <button className="btn btn-navy" type="submit" style={{ width: '100%' }}>Log my attendance</button>
                </form>
              )}
            </div>
          ) : (
            <div className="card pad"><h3 style={{ fontSize: 17 }}>Bonus content</h3><p className="muted small" style={{ marginTop: 6, lineHeight: 1.5 }}>Worth watching, but not an info session — it does not count towards the rewards.</p></div>
          )}

          {progressFor && (
            <div className="card pad">
              <div className="eyebrow" style={{ fontSize: 11 }}>{school ? school.short : 'Best school'}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
                <span style={{ fontSize: 34, fontWeight: 900, color: 'var(--navy)' }}>{progressFor.done}</span>
                <span className="muted">of {REWARDS.sessionsNeeded} sessions</span>
              </div>
              <p className="muted small" style={{ marginTop: 6, lineHeight: 1.5 }}>{progressFor.complete ? 'Rewards unlocked. Claim them on the Rewards page.' : `${REWARDS.sessionsNeeded - progressFor.done} more to unlock the rewards.`}</p>
              <Link to="/rewards" className="btn btn-ghost btn-sm" style={{ marginTop: 10 }}>Rewards →</Link>
            </div>
          )}

          {school && (
            <div className="card pad">
              <div className="eyebrow" style={{ fontSize: 11 }}>Explore</div>
              <h3 style={{ fontSize: 16, marginTop: 8 }}>{school.name}</h3>
              <p className="muted small" style={{ marginTop: 6, lineHeight: 1.5 }}>{school.pitch}</p>
              <Link to={`/academics/${school.id}`} className="btn btn-ghost btn-sm" style={{ marginTop: 10 }}>See the programs →</Link>
            </div>
          )}
        </div>
      </div>

      {msg && <div className="toast"><span className="ok">●</span>{msg}</div>}
    </div>
  )
}
