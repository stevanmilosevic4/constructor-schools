// Links, contacts and the rewards rules. One place to edit.

export const LINKS = {
  site: 'https://constructor.university',
  undergrad: 'https://constructor.university/programs/undergraduate-education',
  apply: 'https://apply.constructor.university/',
  applyInfo: 'https://constructor.university/admission-aid/application-information-undergraduate',
  quiz: 'https://constructor.university/take-quiz-and-find-perfect-study-program-you',
  meetUs: 'https://constructor.university/student-life/meet-us-virtually',
  summerCamp: 'https://constructor.university/talent-school/summer-camp',
  springChallenge: 'https://constructor.university/lp/constructor-challenge',
  a2rl: 'https://a2rl.weareconstructor.com',
}

// QR codes are pre-rendered SVGs in /public/qr (generated from the URLs
// above). Regenerate if a URL changes:  npx qrcode -t svg -o quiz.svg <url>
export const QR = {
  quiz: '/qr/quiz.svg',
  apply: '/qr/apply.svg',
}

export type Contact = {
  name: string
  role: string
  email: string      // leave '' to hide the email line
  region?: string
  note: string
  live?: boolean     // false → hidden everywhere until the mailbox exists (default true)
}

export const CONTACTS: Contact[] = [
  {
    name: 'Stevan Milosevic',
    role: 'Regional Manager · Recruitment',
    email: 'smilosevic@constructor.university',
    note: 'Your first point of contact for counselors and schools: sessions for your students, campus visits, application questions.',
  },
  {
    name: 'Study inquiries',
    role: 'Admissions · Constructor University Bremen',
    email: 'study@constructor.university',
    note: 'Application status, documents, deadlines, scholarships and tuition questions.',
  },
  {
    name: 'Schools programme',
    role: 'Constructor University · for high schools',
    email: 'schools@constructor.university',
    note: 'The dedicated mailbox for this programme: session requests, assignments, reward claims.',
    live: false,     // ← flip to true once schools@constructor.university is active
  },
]

/** Contacts that are live and have an email — used for mailto: links. */
export const liveContacts = () => CONTACTS.filter((c) => c.live !== false && c.email)
/** Where reward claims and counselling requests are sent (all live addresses). */
export const mailTo = () => liveContacts().map((c) => c.email).join(',')

export const REWARDS = {
  sessionsNeeded: 3,          // per school
  senior: {
    title: 'Guaranteed on-campus housing',
    body: 'Final-year students who complete three sessions from one school and then apply get a guaranteed room in one of the residential colleges for their first year.',
  },
  junior: {
    title: '€300 off the Summer Camp',
    body: 'Not graduating this year? Complete three sessions from one school and get €300 off the Constructor University Summer Camp in Bremen (ages 16–19, 24 July – 4 August 2026 edition; 2027 dates to be announced).',
    amount: 300,
  },
  certificate: {
    title: 'Certificate of Engagement',
    body: 'Everyone who completes three sessions from one school receives a Certificate of Engagement from Constructor University, printable from your profile, with a verification code the admissions team can check.',
  },
}

export const SITE = {
  name: 'Constructor University · Schools',
  domain: 'schools.weareconstructor.com',
  tagline: 'Info sessions, programs and challenges for high schools',
}
