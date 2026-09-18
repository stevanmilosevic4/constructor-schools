# schools.weareconstructor.com

Constructor University's hub for high schools: live info sessions and recordings,
every undergraduate program explained for a 16-year-old, the Constructor story,
rewards for attending, student challenges, and a direct line to the recruitment
team. Same stack and spirit as `a2rl.weareconstructor.com` (Vite + React,
no backend), fully in Constructor University branding.

## Run

```bash
cd schools
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build to dist/
npm run preview
```

## Deploy

**Vercel (same as a2rl):** import this repository, set **Root Directory** to
`schools`, framework Vite (picked up from `vercel.json`), and point
`schools.weareconstructor.com` at the project. Nothing else to configure.

**On the VPS instead:** `npm run build` and serve `schools/dist` as a static
site (nginx `try_files $uri /index.html` for the SPA routes).

## Editing content (no code needed)

Everything a person will read lives in `src/data/`:

| File | What it holds |
| --- | --- |
| `sessions.ts` | The session programme. Live dates, join links, YouTube ids for recordings, attendance codes. `school` decides which school a session counts for (`'all'` counts for every school). `counts: false` marks bonus videos. |
| `schools.ts` | The three schools and all 16 undergraduate majors: what you study, careers, "a day in the job", "this is you if…", official URL. |
| `group.ts` | Constructor University / Constructor Group facts, highlights with photos, campus life and gallery. |
| `challenges.ts` | Constructor Spring Challenge info and the assignment slots (set `status: 'open'` and a `url` to open one). |
| `config.ts` | Links (apply, quiz, meet us, summer camp), contacts and emails, the rewards rules (`sessionsNeeded`, housing / €300 / certificate copy). |

Photos live in `public/photos/`, the wordmark in `public/brand/`, the QR codes
in `public/qr/` (regenerate with `npx qrcode -t svg -o quiz.svg <url>` if a link changes).

## How the rewards work (what the code enforces)

- A session is **credited** when a student enters the live attendance code, or
  keeps a recording open for `MIN_WATCH_MINUTES` (12) and confirms.
- **3 credited sessions from one school** (welcome/admissions sessions count for
  every school) unlock: guaranteed housing (final-year students), €300 off the
  Summer Camp (younger students), and the printable Certificate of Engagement.
- "Final year" is derived from the graduation year the student picks at sign-in.
- **Claim** opens a pre-filled email to admissions with the sessions and a
  verification code (`src/lib/certificate.ts` derives it from email + sessions,
  so the team can re-check it).

Progress is stored in the browser (`localStorage`, keyed by email). The seam
for a backend is `src/lib/store.ts` + `src/lib/progress.ts` — swap those to
Supabase or the VPS API and the recruitment team sees progress centrally.
Attendance codes are in the data file, so they are visible to anyone who reads
the bundle; rotate them per session, and move them server-side with the backend.

## Before launch

- When schools@constructor.university is active, set `live: true` on it in `src/data/config.ts` (it is hidden until then).
- Confirm dates, join links and attendance codes in `src/data/sessions.ts`.
- Add `youtubeId`s as recordings are uploaded.
- Confirm the program list against constructor.university/programs/undergraduate-education.
