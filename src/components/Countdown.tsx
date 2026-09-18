import { useEffect, useState } from 'react'

export function useCountdown(targetIso: string) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const target = new Date(targetIso).getTime()
  const diff = Math.max(0, target - now)
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
    past: target - now <= 0,
  }
}
const pad = (n: number) => String(n).padStart(2, '0')
const colors = ['cd-c1', 'cd-c2', 'cd-c3', 'cd-c4']

export default function Countdown({ target, title, kicker = 'Next live session' }: { target: string; title: string; kicker?: string }) {
  const { days, hours, mins, secs, past } = useCountdown(target)
  const cells = [{ n: days, l: 'Days' }, { n: hours, l: 'Hours' }, { n: mins, l: 'Mins' }, { n: secs, l: 'Secs' }]
  return (
    <div className="countdown">
      <h4>{past ? 'Live now' : kicker}</h4>
      <div className="cd-title">{title}</div>
      <div className="cd-row">
        {cells.map((c, i) => (
          <div className="cd-cell" key={c.l}>
            <div className="cd-num">{past ? '00' : pad(c.n)}</div>
            <div className="cd-label">{c.l}</div>
            <div className={`cd-bar ${colors[i]}`} />
          </div>
        ))}
      </div>
    </div>
  )
}
