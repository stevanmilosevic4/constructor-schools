// Build and download an .ics calendar file for a live session.
import type { Session } from '../data/sessions'

function icsDate(d: Date) {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}
function esc(s: string) {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
}

export function downloadIcs(s: Session) {
  const start = new Date(s.start)
  const end = new Date(start.getTime() + s.durationMin * 60000)
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Constructor University//Schools//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${s.id}@schools.weareconstructor.com`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(start)}`,
    `DTEND:${icsDate(end)}`,
    `SUMMARY:${esc('Constructor University · ' + s.title)}`,
    `DESCRIPTION:${esc(s.blurb + (s.joinUrl ? '\nJoin: ' + s.joinUrl : '') + '\nMore: https://schools.weareconstructor.com/sessions/' + s.id)}`,
    s.joinUrl ? `URL:${s.joinUrl}` : '',
    'LOCATION:Online',
    'BEGIN:VALARM', 'TRIGGER:-PT30M', 'ACTION:DISPLAY', 'DESCRIPTION:Constructor University session starts in 30 minutes', 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR',
  ].filter(Boolean)
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `constructor-${s.id}.ics`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
