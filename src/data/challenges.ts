// Student challenges: the Constructor Spring Challenge (official, from
// constructor.university/lp/constructor-challenge) and the assignment slots
// the recruitment team sets for schools. Fill `assignments` as they go live.

export const SPRING_CHALLENGE = {
  name: 'Constructor Spring Challenge',
  url: 'https://constructor.university/lp/constructor-challenge',
  tagline: 'A free international online competition for high-school students aged 14 to 18.',
  what: 'You solve creative problems in mathematics, programming, science, economics and decision-making, at your own pace, from anywhere. Problems range from beginner-friendly to advanced, so you do not need to be a competition veteran to take part.',
  who: 'High-school students aged 14–18, worldwide. Free to enter.',
  when: 'The 2026 edition ran 15 April – 15 May 2026. The 2027 dates will be announced here and on the official page.',
  format: 'Online. No time limit inside the window: register, open the problems, submit when ready.',
  awards: ['Certificate of participation for everyone who submits', 'Awards and special offers from Constructor University for top results', 'Real problem-solving experience you can put on an application'],
  tracks: ['Mathematics', 'Programming', 'Science', 'Economics', 'Decision-making'],
}

export type Assignment = {
  id: string
  school: 'cse' | 'science' | 'bsds' | 'all'
  title: string
  blurb: string
  due?: string
  url?: string      // where to submit (form / platform). Empty = coming soon.
  status: 'open' | 'soon' | 'closed'
}

export const ASSIGNMENTS: Assignment[] = [
  {
    id: 'cse-a1',
    school: 'cse',
    title: 'Teach a robot to cross a room',
    blurb: 'A short planning-and-logic challenge from the robotics faculty. No coding experience required; a notebook and clear thinking will do.',
    status: 'soon',
  },
  {
    id: 'sci-a1',
    school: 'science',
    title: 'The chemistry in your kitchen',
    blurb: 'Design a small experiment you can run at home, predict the result, then explain what happened. Judged on reasoning, not on equipment.',
    status: 'soon',
  },
  {
    id: 'bsds-a1',
    school: 'bsds',
    title: 'Pitch an idea in 90 seconds',
    blurb: 'One problem, one solution, one slide or one video. The best pitches get feedback from the Constructor Start accelerator.',
    status: 'soon',
  },
]
