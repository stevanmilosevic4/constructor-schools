// Constructor University + Constructor Group — the facts and stories we tell
// high schools. Claims are the ones used in official university material;
// re-check numbers once a year before the counselor season.

export const FACTS = [
  { num: '#1', cap: 'Private university in Germany', src: 'Times Higher Education' },
  { num: '120+', cap: 'Nationalities on one campus', src: '~2,000 students, all in English' },
  { num: 'Top 25%', cap: 'Of universities worldwide', src: 'Times Higher Education' },
  { num: '93%', cap: 'Employed within a year of graduating', src: 'Alumni survey' },
]

export type Highlight = { id: string; eyebrow: string; title: string; body: string; image: string; contain?: boolean }

export const HIGHLIGHTS: Highlight[] = [
  {
    id: 'novoselov',
    eyebrow: 'Led by a Nobel laureate',
    title: 'Our president discovered graphene',
    body: 'Sir Kostya Novoselov shared the 2010 Nobel Prize in Physics for isolating graphene, a sheet of carbon one atom thick and stronger than steel. He is one of the youngest physics laureates ever, and he runs this university.',
    image: '/photos/nobel-prize.jpg',
  },
  {
    id: 'ranking',
    eyebrow: 'Top ranked',
    title: '#1 private university in Germany',
    body: 'Ranked first among Germany\'s private universities and in the top 25% of universities worldwide by Times Higher Education. One of the most international campuses on the planet.',
    image: '/photos/THE-logo.png',
    contain: true,
  },
  {
    id: 'a2rl',
    eyebrow: 'Constructor Technology',
    title: 'P2 in the first driverless race in history',
    body: 'Constructor\'s autonomous racing team finished second at the inaugural A2RL race in Abu Dhabi and pulled off the first-ever autonomous overtake on an F1 circuit. The robotics labs behind it are on campus, open to students.',
    image: '/photos/a2rl-track.webp',
  },
  {
    id: 'ruby',
    eyebrow: 'Research you can taste',
    title: 'Ruby chocolate was born here',
    body: 'The first new type of chocolate in 80 years was developed with researchers at Constructor University and Barry Callebaut. Its pink colour and berry taste come from the bean itself.',
    image: '/photos/ruby-chocolate.webp',
  },
  {
    id: 'demoday',
    eyebrow: 'Constructor Capital',
    title: 'A Shark Tank on campus',
    body: 'At Demo Day, startups from the Constructor Start accelerator pitch live to investors. Student ideas become funded companies; Exoheal, a student startup building rehabilitation gloves, earned mentorship from Microsoft\'s CEO.',
    image: '/photos/demo-day.jpg',
  },
  {
    id: 'vaccine',
    eyebrow: 'Alumni',
    title: 'From our labs to the Pfizer vaccine',
    body: 'Dr Tatenda Shopera, a Constructor University alumnus, was one of the lead scientists behind the Pfizer COVID-19 vaccine.',
    image: '/photos/covid-vaccine.jpg',
  },
  {
    id: 'hashem',
    eyebrow: 'Alumni · Class of 2015',
    title: 'The most-watched science communicator on Earth',
    body: 'Hashem Al-Ghaili reaches hundreds of millions with his science videos. He studied here.',
    image: '/photos/hashem.jpg',
  },
  {
    id: 'forbes',
    eyebrow: 'Alumni',
    title: 'Forbes 30 under 30',
    body: 'Alumnus Cornel Amariei made the Forbes list for assistive technology that helps blind people navigate, work that started on this campus.',
    image: '/photos/cornellumen.jpeg',
  },
  {
    id: 'employed',
    eyebrow: 'Careers',
    title: '93% employed within a year',
    body: 'A mandatory internship, a career fair with 100+ employers and a Constructor network across tech, research and capital. The degree leads somewhere.',
    image: '/photos/students-employed.jpg',
  },
]

export const GROUP_PILLARS = [
  {
    k: 'Constructor Knowledge',
    title: 'The university and the institute',
    body: 'Constructor University in Bremen (est. 2001) and Constructor Institute in Schaffhausen, Switzerland, plus the Constructor Academy. Bachelor\'s, master\'s and PhDs, taught in English, research-driven.',
  },
  {
    k: 'Constructor Tech',
    title: 'AI platforms and physical AI',
    body: 'Technology built for research and education, and the Constructor Racing team competing in the A2RL autonomous racing league. Students get access to the same tools and labs.',
  },
  {
    k: 'Constructor Capital',
    title: 'Smart capital for student ideas',
    body: 'A venture arm and the Constructor Start accelerator that turn campus ideas into companies, with Demo Day as the stage.',
  },
  {
    k: 'One ecosystem',
    title: 'Why it matters for you',
    body: 'Most universities teach. This one also builds, invests and races. That means internships, labs, mentors and jobs inside the same ecosystem that grants your degree.',
  },
]

export const CAMPUS = [
  { img: '/photos/campus-aerial.jpg', cap: 'The residential campus in Bremen-Grohn: everything within a five-minute walk' },
  { img: '/photos/campus-green.jpg', cap: 'The Campus Green, where the year starts and ends' },
  { img: '/photos/foyer.jpg', cap: 'Lecture halls and labs, all in English' },
  { img: '/photos/lab-robots.jpg', cap: 'The robotics lab: humanoids, robot arms and a robot dog' },
  { img: '/photos/sports-scc.jpg', cap: 'Sports & Convention Center: gym, courts, clubs' },
  { img: '/photos/terrace-trucks.jpg', cap: 'Food trucks and the college terraces' },
  { img: '/photos/hc-games.jpg', cap: 'Student life: 60+ clubs, sports and campus traditions' },
  { img: '/photos/graduation-2026.jpg', cap: 'Graduation on the Campus Green' },
  { img: '/photos/fireworks-drones.jpg', cap: '25 years of Constructor University, celebrated in 2026' },
]

export const CAMPUS_LIFE = [
  { t: 'You live on campus', p: 'Four residential colleges, single rooms, meals included, friends from 120+ countries down the corridor. Housing is part of the deal, not a separate hunt in a foreign city.' },
  { t: 'Everything is in English', p: 'Every class, every lab, every form. German is offered as a course, and Bremen is a friendly city to learn it in.' },
  { t: 'Small classes, real access', p: 'Professors know your name. You can join a research group in your first year, not your last.' },
  { t: 'A city that works', p: 'Bremen is a safe, green university city of 570,000 people, 55 minutes from Hamburg, with a public-transport pass included for students.' },
  { t: 'Careers built in', p: 'A mandatory internship, Career Services, a campus career fair and the Constructor ecosystem of tech companies and investors.' },
  { t: 'Scholarships and financing', p: 'Merit and need-based scholarships, plus a tuition-deferral model that lets you pay after you graduate and earn.' },
]
