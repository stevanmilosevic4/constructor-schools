// The info-session programme. This file is the single source of truth for
// what appears under Sessions, on the Home countdown and in the rewards
// progress — edit it as the calendar firms up.
//
//   status   'live'      → upcoming/live webinar; shows a countdown + join link
//            'recording' → recorded session; embeds the YouTube video
//   school   which school it counts towards ('all' = welcome/admissions
//            sessions; they count towards every school's tally)
//   joinUrl  the Zoom/Teams/YouTube-live link for a live session
//   youtubeId  the recording's YouTube video id (leave '' until uploaded)
//   code     attendance code you announce during the live session. Students
//            type it in to log attendance. Change it after each session.
//   counts   false → a bonus recording that doesn't count towards rewards
//
// Dates are ISO with the Bremen offset. Times shown to students in their
// local time zone automatically.

import type { SchoolId } from './schools'

export type SessionStatus = 'live' | 'recording'

export type Session = {
  id: string
  title: string
  blurb: string
  school: SchoolId | 'all'
  status: SessionStatus
  start: string          // ISO datetime
  durationMin: number
  speakers?: string
  joinUrl?: string
  youtubeId?: string
  code?: string
  photo?: string
  counts?: boolean
}

// Minutes a recording has to be open before "I watched this" unlocks.
export const MIN_WATCH_MINUTES = 12

export const SESSIONS: Session[] = [
  // ---------- Fall 2026 live series (update dates/links as confirmed) ----------
  {
    id: 'welcome-2026',
    title: 'Welcome to Constructor University: how admission actually works',
    blurb: 'The 40-minute overview every counselor and student should start with: who we are, what you can study, how the application works, what it costs and how scholarships are decided.',
    school: 'all',
    status: 'live',
    start: '2026-10-06T17:00:00+02:00',
    durationMin: 45,
    speakers: 'Admissions & Recruitment team',
    joinUrl: 'https://constructor.university/student-life/meet-us-virtually',
    code: 'CU-WELCOME-1006',
    photo: '/photos/campus-center.jpg',
  },
  {
    id: 'cse-1',
    title: 'From code to robots: inside the School of Computer Science & Engineering',
    blurb: 'Computer Science, Software & Data, Robotics, Electrical Engineering, Industrial Engineering — what each one is really like, told by the people who teach and study them.',
    school: 'cse',
    status: 'live',
    start: '2026-10-13T17:00:00+02:00',
    durationMin: 60,
    speakers: 'Faculty + current students',
    joinUrl: 'https://constructor.university/student-life/meet-us-virtually',
    code: 'CU-CSE-1013',
    photo: '/photos/lab-arm.jpg',
  },
  {
    id: 'sci-1',
    title: 'Lab coats and data: a day inside the School of Science',
    blurb: 'Biochemistry, chemistry, medicinal chemistry, earth science, physics and maths. Which one fits you, and what a first-year lab week looks like.',
    school: 'science',
    status: 'live',
    start: '2026-10-20T17:00:00+02:00',
    durationMin: 60,
    speakers: 'Faculty + current students',
    joinUrl: 'https://constructor.university/student-life/meet-us-virtually',
    code: 'CU-SCI-1020',
    photo: '/photos/plant-waste.jpg',
  },
  {
    id: 'bsds-1',
    title: 'Economics, psychology, politics: the School of Business, Social & Decision Sciences',
    blurb: 'Five programs, one question: how do people, companies and countries decide? What you study, and where graduates end up.',
    school: 'bsds',
    status: 'live',
    start: '2026-10-27T17:00:00+01:00',
    durationMin: 60,
    speakers: 'Faculty + current students',
    joinUrl: 'https://constructor.university/student-life/meet-us-virtually',
    code: 'CU-BSDS-1027',
    photo: '/photos/conference-hall.jpg',
  },
  {
    id: 'cse-2',
    title: 'AI, autonomous racing and where robotics is heading',
    blurb: 'The team behind Constructor\'s P2 finish in the world\'s first driverless race explains the tech — and how students get into the lab.',
    school: 'cse',
    status: 'live',
    start: '2026-11-03T17:00:00+01:00',
    durationMin: 50,
    speakers: 'Constructor Racing engineers',
    joinUrl: 'https://constructor.university/student-life/meet-us-virtually',
    code: 'CU-CSE-1103',
    photo: '/photos/airacing.jpg',
  },
  {
    id: 'sci-2',
    title: 'Medicine without medical school: medicinal chemistry, biotech and beyond',
    blurb: 'How drugs are discovered, what a biotech career looks like, and why Bremen is a good place to start one.',
    school: 'science',
    status: 'live',
    start: '2026-11-10T17:00:00+01:00',
    durationMin: 50,
    speakers: 'School of Science faculty',
    joinUrl: 'https://constructor.university/student-life/meet-us-virtually',
    code: 'CU-SCI-1110',
    photo: '/photos/werner.jpg',
  },
  {
    id: 'bsds-2',
    title: 'Building a career in business and tech from Bremen',
    blurb: 'Internships, the career fair, Demo Day and the Constructor ecosystem: how students turn a bachelor\'s into a job or a startup.',
    school: 'bsds',
    status: 'live',
    start: '2026-11-17T17:00:00+01:00',
    durationMin: 50,
    speakers: 'Career Services + alumni',
    joinUrl: 'https://constructor.university/student-life/meet-us-virtually',
    code: 'CU-BSDS-1117',
    photo: '/photos/students-employed.jpg',
  },
  {
    id: 'cse-3',
    title: 'Student panel: what it is really like to study CS, ECE and Robotics here',
    blurb: 'No faculty, just students. Ask anything: workload, projects, campus life, the labs, the food.',
    school: 'cse',
    status: 'live',
    start: '2026-11-24T17:00:00+01:00',
    durationMin: 45,
    speakers: 'Current students',
    joinUrl: 'https://constructor.university/student-life/meet-us-virtually',
    code: 'CU-CSE-1124',
    photo: '/photos/lab-students.jpg',
  },
  {
    id: 'sci-3',
    title: 'Physics, maths and data: the numbers behind everything',
    blurb: 'Physics & Data Science and Mathematics, Modeling & Data Analytics explained — and why physicists and mathematicians get hired everywhere.',
    school: 'science',
    status: 'live',
    start: '2026-12-01T17:00:00+01:00',
    durationMin: 50,
    speakers: 'School of Science faculty',
    joinUrl: 'https://constructor.university/student-life/meet-us-virtually',
    code: 'CU-SCI-1201',
    photo: '/photos/graphene.jpg',
  },
  {
    id: 'bsds-3',
    title: 'Student panel: IBA, GEM, IRPH, SMP and Psychology',
    blurb: 'Students from all five programs answer your questions live.',
    school: 'bsds',
    status: 'live',
    start: '2026-12-08T17:00:00+01:00',
    durationMin: 45,
    speakers: 'Current students',
    joinUrl: 'https://constructor.university/student-life/meet-us-virtually',
    code: 'CU-BSDS-1208',
    photo: '/photos/terrace-food.jpg',
  },
  {
    id: 'apply-2026',
    title: 'Scholarships, financing and the application: step by step',
    blurb: 'Deadlines, documents, English tests, the tuition-deferral and scholarship options — with time for questions.',
    school: 'all',
    status: 'live',
    start: '2026-12-15T17:00:00+01:00',
    durationMin: 45,
    speakers: 'Admissions & Financial Aid',
    joinUrl: 'https://constructor.university/student-life/meet-us-virtually',
    code: 'CU-APPLY-1215',
    photo: '/photos/graduation-2026.jpg',
  },

  // ---------- Recordings library (add youtubeId once uploaded) ----------
  {
    id: 'rec-campus-tour',
    title: 'Campus tour: colleges, labs, the Campus Green and the Bremen you will live in',
    blurb: 'A walk across the residential campus in Bremen-Grohn: the four colleges, the library, the labs, sports and the food.',
    school: 'all',
    status: 'recording',
    start: '2026-09-01T00:00:00+02:00',
    durationMin: 25,
    youtubeId: '',
    photo: '/photos/campus-green.jpg',
  },
  {
    id: 'rec-cse-a2rl',
    title: 'Bonus: how Constructor finished P2 in the first-ever autonomous race',
    blurb: 'The story of the Yas Marina race told by the team. Not an info session, so it does not count towards the rewards — but watch it anyway.',
    school: 'cse',
    status: 'recording',
    start: '2024-04-27T00:00:00+02:00',
    durationMin: 6,
    youtubeId: 'hzUvM25_dCU',
    photo: '/photos/a2rl-overtake.jpg',
    counts: false,
  },
]

export function sessionById(id: string | undefined): Session | undefined {
  return SESSIONS.find((s) => s.id === id)
}

export function isPast(s: Session, now = Date.now()): boolean {
  return new Date(s.start).getTime() + s.durationMin * 60000 < now
}
export function isLiveNow(s: Session, now = Date.now()): boolean {
  const t = new Date(s.start).getTime()
  return s.status === 'live' && now >= t - 15 * 60000 && now <= t + s.durationMin * 60000
}
export function nextLive(now = Date.now()): Session | undefined {
  return SESSIONS.filter((s) => s.status === 'live' && !isPast(s, now)).sort((a, b) => +new Date(a.start) - +new Date(b.start))[0]
}

const dateFmt = new Intl.DateTimeFormat(undefined, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
const timeFmt = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })
export function fmtDate(iso: string) { return dateFmt.format(new Date(iso)) }
export function fmtTime(iso: string) { return timeFmt.format(new Date(iso)) }
