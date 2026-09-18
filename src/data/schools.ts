// The three schools and every undergraduate major, written for a high-school
// reader: what you actually do, where it takes you, and what a day in that
// job feels like. Keep it honest and specific — no brochure filler.
//
// Program list mirrors constructor.university/programs/undergraduate-education
// (Fall 2026 intake). If a program is added or renamed on the website, edit
// here — the Academics pages, session filters and rewards all read this file.

export type SchoolId = 'cse' | 'science' | 'bsds'

export type School = {
  id: SchoolId
  name: string
  short: string
  accent: string   // brand colour used for the school everywhere
  soft: string     // light tint of the accent
  onAccent: string // text colour readable on the accent
  photo: string
  pitch: string    // one-liner in student words
  intro: string
  url: string
}

export const SCHOOLS: School[] = [
  {
    id: 'cse',
    name: 'School of Computer Science & Engineering',
    short: 'Computer Science & Engineering',
    accent: '#00B2FF',
    soft: '#E6F6FF',
    onAccent: '#00204D',
    photo: '/photos/lab-robots.jpg',
    pitch: 'You like building things that work — code, circuits, robots, systems. Here you build them from year one.',
    intro:
      'This is the school for people who want to make technology, not just use it. You will write real software, wire real hardware and program real robots — the same labs that produced the team racing driverless cars at 250 km/h in the A2RL league. Classes are small, professors know your name, and by your second year you are already working in a lab.',
    url: 'https://constructor.university/programs/undergraduate-education',
  },
  {
    id: 'science',
    name: 'School of Science',
    short: 'Natural Sciences',
    accent: '#00D19E',
    soft: '#E2FAF3',
    onAccent: '#00204D',
    photo: '/photos/graphene.jpg',
    pitch: 'You want to understand how the world actually works — and then do something with it. Labs from day one.',
    intro:
      'Physics, chemistry, biology, earth science and mathematics — taught in English, hands-on, by researchers who publish in the journals you will read. Constructor University is led by a Nobel Prize laureate in physics, and the labs here have produced everything from ruby chocolate to a disinfectant made from plant waste. You do not wait until a master\'s degree to do research. You start in your first year.',
    url: 'https://constructor.university/programs/undergraduate-education',
  },
  {
    id: 'bsds',
    name: 'School of Business, Social & Decision Sciences',
    short: 'Business, Social & Decision Sciences',
    accent: '#FFC700',
    soft: '#FFF6D9',
    onAccent: '#00204D',
    photo: '/photos/demo-day.jpg',
    pitch: 'You are curious about people, money, power and how decisions get made. This is where you learn to shape them.',
    intro:
      'Economics, management, psychology, politics and media — studied together, because in real life they never come apart. You will pitch to investors at Demo Day, run experiments on how people decide, and debate policy with classmates from 120+ countries. Graduates go into consulting, startups, international organisations, research and everything in between.',
    url: 'https://constructor.university/programs/undergraduate-education',
  },
]

export type Program = {
  slug: string
  school: SchoolId
  name: string
  degree: 'BSc' | 'BA'
  tagline: string      // one sentence, student voice
  study: string[]      // "what you actually study" — 4 bullets
  careers: string[]    // job titles / paths
  day: string          // "what the job looks like" — a paragraph in student words
  fit: string[]        // "this is you if…" — 3 bullets
  url: string          // official program page
}

const UG = 'https://constructor.university/programs/undergraduate-education'

export const PROGRAMS: Program[] = [
  // ---------------- School of Computer Science & Engineering ----------------
  {
    slug: 'computer-science',
    school: 'cse',
    name: 'Computer Science',
    degree: 'BSc',
    tagline: 'Learn how software really works underneath — then build things nobody has built yet.',
    study: [
      'Programming from the ground up: algorithms, data structures and how to write code that scales.',
      'How computers think: operating systems, databases, networks and computer architecture.',
      'Artificial intelligence and machine learning — the maths behind it, not just the buzzwords.',
      'Team projects every year, so you graduate with things you actually shipped.',
    ],
    careers: ['Software engineer', 'AI / machine learning engineer', 'Backend developer', 'Data engineer', 'Cybersecurity analyst', 'Tech founder', 'Researcher (MSc/PhD)'],
    day:
      'Most days you are solving a problem nobody has solved for your product yet. You write code in the morning, review a teammate\'s code after lunch, and spend the afternoon figuring out why something is slow. It is creative, collaborative and never boring — and it is one of the best-paid jobs you can get with a bachelor\'s degree.',
    fit: ['You have tried coding and wanted more.', 'You enjoy puzzles and logic more than memorising.', 'You want a degree that works in any country.'],
    url: UG,
  },
  {
    slug: 'software-data-and-technology',
    school: 'cse',
    name: 'Software, Data and Technology',
    degree: 'BSc',
    tagline: 'The practical path into tech: software development, data analysis and machine learning in one degree.',
    study: [
      'Full-stack software development — web, mobile and cloud.',
      'Data: how to collect it, clean it, analyse it and turn it into decisions.',
      'Machine learning and AI applied to real business problems.',
      'Security, networks and the technology stack companies actually run on.',
    ],
    careers: ['Data scientist', 'Full-stack developer', 'Analytics expert', 'AI engineer', 'Network security analyst', 'Product engineer', 'Data-mining specialist'],
    day:
      'Imagine a company drowning in numbers — sales, users, sensors — and you are the person who makes sense of it and builds the tool that shows it. One week you are building a dashboard, the next you are training a model that predicts what customers will do. You work close to the business, so you see the impact of your work fast.',
    fit: ['You like tech but want to see results, not only theory.', 'Spreadsheets and charts secretly excite you.', 'You want to be employable everywhere, quickly.'],
    url: 'https://constructor.university/programs/undergraduate-education/software-data-and-technology',
  },
  {
    slug: 'robotics-and-intelligent-systems',
    school: 'cse',
    name: 'Robotics and Intelligent Systems',
    degree: 'BSc',
    tagline: 'Build machines that see, decide and move on their own — from lab robots to driverless race cars.',
    study: [
      'Engineering fundamentals: mechanics, electronics, control systems.',
      'Perception: how a robot uses cameras, lidar and sensors to know where it is.',
      'Planning and autonomy — the software that lets a machine act without a human.',
      'Hands-on lab work with robot arms, mobile robots and underwater vehicles.',
    ],
    careers: ['Robotics engineer', 'Autonomous-vehicle engineer', 'Automation engineer', 'Marine / drone systems engineer', 'Control systems engineer', 'R&D engineer'],
    day:
      'Your desk is half a laptop and half a workbench. You test a robot, it fails in a new way, you dig into the sensor data, fix the code and try again. Then it works — and a machine does something on its own because of you. Robotics engineers work in car companies, logistics, space, medicine and startups. The Constructor racing team that finished P2 in the world\'s first autonomous race came out of exactly this kind of lab.',
    fit: ['You take things apart to see how they work.', 'You want both hardware and software, not one or the other.', 'You get excited about self-driving cars, drones and AI.'],
    url: 'https://constructor.university/programs/undergraduate-education/robotics-intelligent-systems',
  },
  {
    slug: 'electrical-and-computer-engineering',
    school: 'cse',
    name: 'Electrical and Computer Engineering',
    degree: 'BSc',
    tagline: 'From the chip to the cloud: design the electronics and computer systems everything else runs on.',
    study: [
      'Circuits, signals and electronics — how energy and information move through hardware.',
      'Digital systems and embedded computing: the small computers inside everything.',
      'Communication systems, from wireless to fibre.',
      'Programming and computer architecture, so you can design across hardware and software.',
    ],
    careers: ['Electronics engineer', 'Embedded systems engineer', 'Hardware / chip designer', 'Telecommunications engineer', 'Energy systems engineer', 'Systems architect'],
    day:
      'You are the person who designs the thing that makes the phone, the car or the satellite actually function. A day might be simulating a circuit, testing a board in the lab, then writing the firmware that runs on it. Engineers like you are in short supply worldwide — and that shows in the job offers.',
    fit: ['Physics and maths are your strongest subjects.', 'You want to build real, physical technology.', 'You like precise, careful work that has to be right.'],
    url: UG,
  },
  {
    slug: 'industrial-engineering-and-management',
    school: 'cse',
    name: 'Industrial Engineering and Management',
    degree: 'BSc',
    tagline: 'Engineering plus business: learn how products get designed, made, moved and sold — and how to run it.',
    study: [
      'Engineering foundations: manufacturing technology, materials and systems.',
      'Logistics and supply chains — how things get from a factory to your door.',
      'Business essentials: finance, operations, project and people management.',
      'Data and optimisation: making processes faster, cheaper and greener.',
    ],
    careers: ['Operations manager', 'Supply-chain manager', 'Project manager', 'Management consultant', 'Production engineer', 'Product manager', 'Founder'],
    day:
      'You sit between the engineers and the business people and speak both languages. One morning you are on a factory floor fixing a bottleneck, the next you are presenting a plan to leadership. This is the degree for people who want to lead technical teams and companies, not only work in them.',
    fit: ['You like tech but also like organising people and plans.', 'You want a broad degree that keeps options open.', 'You see yourself managing something one day.'],
    url: 'https://constructor.university/programs/undergraduate-education/industrial-engineering-management',
  },

  // ---------------- School of Science ----------------
  {
    slug: 'biochemistry-and-cell-biology',
    school: 'science',
    name: 'Biochemistry and Cell Biology',
    degree: 'BSc',
    tagline: 'Understand life at the molecular level — genes, proteins, cells — and learn to work with it in the lab.',
    study: [
      'How cells work: inheritance, gene expression, metabolism and signalling.',
      'Biochemistry and molecular biology with serious lab time every semester.',
      'Modern tools: microscopy, DNA sequencing, bioinformatics.',
      'A research project of your own before you graduate.',
    ],
    careers: ['Biomedical researcher', 'Pharma / biotech scientist', 'Lab manager', 'Clinical research associate', 'Science communicator', 'Medicine or PhD track'],
    day:
      'You spend part of your day at the bench — pipettes, cultures, microscopes — and part analysing what you found. You might be testing how a new drug affects cancer cells, or figuring out why a protein misfolds. A Constructor alumnus went on to be one of the lead scientists behind the Pfizer COVID-19 vaccine. That is the kind of career that starts here.',
    fit: ['Biology and chemistry are the classes you look forward to.', 'You like experiments and patience does not scare you.', 'You want to help cure things.'],
    url: 'https://constructor.university/programs/undergraduate-education/biochemistry-cell-biology',
  },
  {
    slug: 'chemistry-and-biotechnology',
    school: 'science',
    name: 'Chemistry and Biotechnology',
    degree: 'BSc',
    tagline: 'Chemistry meets biology to solve real problems — new materials, cleaner processes, better medicines.',
    study: [
      'Organic, inorganic and physical chemistry — the full foundation.',
      'Molecular biology, biochemistry and genetics.',
      'Biotechnology: using cells and enzymes to make things, from fuels to pharmaceuticals.',
      'Lab work from the first semester, in research groups, not just teaching labs.',
    ],
    careers: ['Biotech scientist', 'Process / production chemist', 'Quality & regulatory specialist', 'Food or cosmetics scientist', 'Sustainability chemist', 'Research (MSc/PhD)'],
    day:
      'Some days are pure lab: running reactions, growing cultures, measuring results. Others are planning and analysis. You could be developing a biodegradable plastic, scaling up an enzyme that replaces a toxic chemical, or making a new flavour. Ruby chocolate — the first new chocolate in 80 years — was developed with researchers on this campus.',
    fit: ['You want chemistry that connects to living systems.', 'You care about sustainability and want to act on it.', 'You want lab skills companies pay for.'],
    url: 'https://constructor.university/programs/undergraduate-education/chemistry-biotechnology',
  },
  {
    slug: 'medicinal-chemistry-and-chemical-biology',
    school: 'science',
    name: 'Medicinal Chemistry and Chemical Biology',
    degree: 'BSc',
    tagline: 'Learn how medicines are designed, from a molecule on a screen to a drug that works in the body.',
    study: [
      'Chemistry with a medical purpose: how drugs are designed, made and tested.',
      'Chemical biology — how molecules interact with proteins, cells and diseases.',
      'Pharmacology basics: what a drug does in the body and why.',
      'Computer-aided drug design and modern lab techniques.',
    ],
    careers: ['Drug-discovery scientist', 'Pharmaceutical chemist', 'Clinical / regulatory scientist', 'Medical science liaison', 'Medicine or pharmacy track', 'Research (MSc/PhD)'],
    day:
      'You are on the team trying to find the molecule that stops a disease. You design candidates, make them, test them, and read the data — then go again. On this campus, Professor Werner Nau\'s group attracted over €10 million to target proteins once called "undruggable". Medicine without medical school, and a path into pharma, biotech or research.',
    fit: ['You are fascinated by how medicines work.', 'You like chemistry and biology equally.', 'You want to make a difference to health.'],
    url: UG,
  },
  {
    slug: 'earth-sciences-and-sustainable-management-of-resources',
    school: 'science',
    name: 'Earth Sciences and Sustainable Management of Environmental Resources',
    degree: 'BSc',
    tagline: 'Study the planet — oceans, climate, resources — and learn to manage it sustainably.',
    study: [
      'Geology, oceanography and climate science: how Earth\'s systems work.',
      'Environmental chemistry and data — measuring what is really happening.',
      'Resources: water, energy, raw materials and how to use them responsibly.',
      'Field trips, ship-based research and lab work — Bremen is a world hub for marine science.',
    ],
    careers: ['Environmental consultant', 'Climate / ocean scientist', 'Sustainability manager', 'Geoscientist (energy, mining, water)', 'Environmental policy advisor', 'Research (MSc/PhD)'],
    day:
      'Some weeks you are outside — on a research vessel, on a coast, in the field. Other weeks you are analysing samples and building models of what will happen next. Researchers here ran robots on the Pacific seafloor at 890 metres depth, piloted from Bremen. Every company and government now needs people who understand the environment. This is how you become one.',
    fit: ['You care about climate and want real tools, not slogans.', 'You like being outdoors and in the lab.', 'You are good at seeing the big picture.'],
    url: UG,
  },
  {
    slug: 'physics-and-data-science',
    school: 'science',
    name: 'Physics and Data Science',
    degree: 'BSc',
    tagline: 'Real physics — quantum mechanics included — plus the data skills that make physicists the most wanted problem-solvers.',
    study: [
      'Classical and modern physics: mechanics, electrodynamics, quantum mechanics.',
      'Mathematics as the language of it all.',
      'Data science: programming, statistics, computational modelling, machine learning.',
      'Research projects in labs led by physicists, including Nobel laureate Sir Kostya Novoselov\'s field.',
    ],
    careers: ['Data scientist', 'Quantitative analyst (finance)', 'Research physicist', 'Materials / semiconductor engineer', 'Space & aerospace roles', 'Software & AI roles'],
    day:
      'Physicists get hired everywhere because they can take a messy problem and model it. Your day might be running a simulation, analysing experiment data, or explaining to a team what the numbers mean. Finance, tech, energy, space — the door is open. And if you love the science itself, you are set up for a PhD.',
    fit: ['Physics and maths come naturally and you want to go deep.', 'You like coding as a tool.', 'You want the widest possible set of career options.'],
    url: 'https://constructor.university/programs/undergraduate-education/physics-and-data-science',
  },
  {
    slug: 'mathematics-modeling-and-data-analytics',
    school: 'science',
    name: 'Mathematics, Modeling and Data Analytics',
    degree: 'BSc',
    tagline: 'Mathematics you can use: model the real world, analyse data and predict what happens next.',
    study: [
      'Core mathematics: analysis, linear algebra, probability and statistics.',
      'Modelling — turning a real situation (traffic, an epidemic, a market) into equations.',
      'Data analytics and programming, so the maths becomes a tool.',
      'Applied projects with industry and research groups.',
    ],
    careers: ['Data analyst / scientist', 'Actuary or risk analyst', 'Quantitative researcher', 'Operations research analyst', 'Machine-learning engineer', 'Teacher or academic'],
    day:
      'You are the person who can say "here is what the data actually shows, and here is what will happen if we do X". Insurance, banks, tech companies, hospitals and governments all need that. A typical day is a mix of coding, thinking on a whiteboard, and presenting a clear answer to people who are not mathematicians.',
    fit: ['Maths is your favourite subject and you want it to be useful.', 'You enjoy finding patterns.', 'You want a degree with a clear job market.'],
    url: 'https://constructor.university/programs/undergraduate-education/mathematics-modeling-data-analytics',
  },

  // ---------------- School of Business, Social & Decision Sciences ----------------
  {
    slug: 'global-economics-and-management',
    school: 'bsds',
    name: 'Global Economics and Management',
    degree: 'BA',
    tagline: 'Understand how economies and companies really work — with the data skills to prove it.',
    study: [
      'Micro- and macroeconomics: how markets, prices and policies behave.',
      'Management and finance: how organisations make money and decisions.',
      'Data analysis and econometrics — evidence, not opinion.',
      'Global perspective: trade, development and international business.',
    ],
    careers: ['Economist / analyst', 'Management consultant', 'Finance & investment roles', 'Policy advisor (EU, UN, central banks)', 'Strategy manager', 'Founder'],
    day:
      'You read the world through numbers and incentives. A day could be modelling how a tax change affects a market, advising a company on where to expand, or writing a brief for a ministry. Consulting firms and banks recruit heavily from programs like this because you can think and count.',
    fit: ['You follow the news and wonder why things happen.', 'You are comfortable with maths but want people too.', 'You want to work internationally.'],
    url: UG,
  },
  {
    slug: 'international-business-administration',
    school: 'bsds',
    name: 'International Business Administration',
    degree: 'BA',
    tagline: 'Learn to run a business across borders: marketing, finance, strategy, people — and how to start your own.',
    study: [
      'All the functions of a company: marketing, finance, accounting, operations, HR.',
      'Strategy and entrepreneurship, with a real pitch culture on campus.',
      'International management — negotiation, culture, global markets.',
      'Data-driven decisions and a mandatory internship.',
    ],
    careers: ['Business / management consultant', 'Marketing or brand manager', 'Product manager', 'Startup founder', 'Financial analyst', 'International trade & sales'],
    day:
      'Business is about making decisions with incomplete information and then leading people to execute them. Your day might be analysing a launch, negotiating with a supplier in another country, or pitching to investors — like the Constructor students who pitched at Demo Day and left with funding. Fast, social, results-driven.',
    fit: ['You are a natural organiser and communicator.', 'You have ideas for businesses.', 'You want to work with people from everywhere.'],
    url: UG,
  },
  {
    slug: 'international-relations-politics-and-history',
    school: 'bsds',
    name: 'International Relations: Politics and History',
    degree: 'BA',
    tagline: 'Power, conflict, diplomacy and the history behind today\'s headlines — studied with classmates from 120+ countries.',
    study: [
      'International politics: states, institutions, security, human rights.',
      'Modern history — the long story behind current crises.',
      'Research methods and data, so your arguments hold up.',
      'The Constructor Track: argumentation, data visualisation, communication and societal engagement.',
    ],
    careers: ['Diplomat / foreign service', 'International organisations (UN, EU, NGOs)', 'Policy analyst', 'Journalist', 'Political risk consultant', 'Law or graduate school'],
    day:
      'You spend your days understanding why people and countries act the way they do, and what to do about it. That could mean drafting policy in Brussels, analysing risk for a company entering a new market, or reporting from the ground. On this campus your classmates are from more than 120 countries — every seminar is already international relations.',
    fit: ['You debate, read and argue for fun.', 'You want to work in embassies, NGOs or media.', 'You care about what is happening in the world.'],
    url: 'https://constructor.university/programs/undergraduate-education/international-relations-politics-history',
  },
  {
    slug: 'integrated-social-and-cognitive-psychology',
    school: 'bsds',
    name: 'Integrated Social and Cognitive Psychology',
    degree: 'BSc',
    tagline: 'How people think, feel and decide — and how to use that in business, health, research and technology.',
    study: [
      'Cognitive psychology: memory, attention, perception, decision-making.',
      'Social psychology: groups, persuasion, culture, identity.',
      'Research methods and statistics — you will run real experiments.',
      'Applied fields: organisational, health and consumer psychology.',
    ],
    careers: ['UX / user researcher', 'HR & organisational development', 'Market research analyst', 'Counselling or clinical track (with MSc)', 'Health promotion', 'Behavioural scientist in tech or policy'],
    day:
      'Psychology graduates end up designing apps people actually use, hiring and developing teams, running studies for governments, or continuing into clinical training. A day is curious work: designing a study, interviewing people, analysing data and turning it into something that changes behaviour.',
    fit: ['You are the person friends come to for advice.', 'You wonder why people do what they do.', 'You like science and people equally.'],
    url: 'https://constructor.university/programs/undergraduate-education/integrated-social-cognitive-psychology',
  },
  {
    slug: 'society-media-and-politics',
    school: 'bsds',
    name: 'Society, Media and Politics',
    degree: 'BA',
    tagline: 'Media, society and politics are one system now. Learn to read it, research it and work in it.',
    study: [
      'Sociology and political science: how societies organise and change.',
      'Media and communication: how information moves and shapes opinion.',
      'Research methods, data and digital tools.',
      'A required summer internship and the option to study abroad in your fifth semester.',
    ],
    careers: ['Journalist / editor', 'Communications & PR manager', 'Public affairs & policy', 'NGO & advocacy', 'Social researcher', 'Digital strategist'],
    day:
      'You work where public opinion is made: newsrooms, agencies, campaigns, institutions. One day you are analysing how a story spread online, the next you are writing a communication strategy for an organisation. The largest alumni community at Constructor University comes from this program — the network is real.',
    fit: ['You notice how news and social media shape people.', 'You write well and want to write better.', 'You want to work in media, politics or communication.'],
    url: 'https://constructor.university/programs/undergraduate-education/society-media-politics',
  },
]

export function schoolById(id: string | undefined): School | undefined {
  return SCHOOLS.find((s) => s.id === id)
}
export function programsOf(id: SchoolId): Program[] {
  return PROGRAMS.filter((p) => p.school === id)
}
export function programBySlug(slug: string | undefined): Program | undefined {
  return PROGRAMS.find((p) => p.slug === slug)
}
