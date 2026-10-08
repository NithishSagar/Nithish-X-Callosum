/**
 * Scope — field inspection software (Series A, Index Ventures).
 *
 * Selected when NEXT_PUBLIC_COMPANY=scope. Uses the 'framer' theme: larger
 * type, more generous rhythm, blue accent. The argument is user-first
 * engineering — start from the person's real workflow, measure before
 * optimising, ship to people who do physical work.
 */
import type {
  CompanyConfig,
  MappingRow,
  Project,
  Repo,
  Requirement,
  SectionsCopy,
  SkillGroup,
  TimelineItem,
} from './types';

/* ------------------------------------------------------------------ */
/* Identity                                                            */
/* ------------------------------------------------------------------ */

const profile = {
  name: 'Nithish Sagar',
  target: 'Scope',
  role: 'Software Engineer',
  tagline:
    'Software Engineer who builds systems for the people who do the real work.',
  pitch:
    'Scope digitises field operations — replacing clipboards with software that captures what matters and surfaces what needs action. I have spent three years solving the same shape of problem: find what is actually blocking the user, build around that constraint, ship something they can rely on. Whether it was inference latency for farmers in a field or a platform serving 60+ engineers, I start with the real problem rather than the abstract one.',
  email: 'nsd8681@gmail.com',
  github: 'https://github.com/NithishSagar',
  portfolio: 'https://nithish-portfolio-iota.vercel.app/',
  linkedin: 'https://www.linkedin.com/in/nithish-sagar-d-458141213/',
  location: 'London, UK',
  education: {
    degree: 'MSc Advanced Computer Science (Artificial Intelligence)',
    school: 'University of York',
    start: 'September 2025',
  },
  summary: [
    'Most engineers optimise abstract problems. I optimise for the person using the thing. When I built inference pipelines for farmers detecting crop disease, I did not start from "make the model faster". I started from "a farmer needs an answer in the field, now". That reframing changed the work: the bottleneck was never the model, it was reloading weights on every single request. Measuring instead of assuming made the fix obvious.',
    'Scope is built on the same principle. Inspectors need to capture data the way it actually comes out — voice, video, a note — rather than bending themselves around a forms-first interface. Office teams need reports that fill themselves, not hours of retyping. You start from the person’s real workflow and build the software around it.',
    'I bring that discipline to everything I ship: measurement over assumption, user reality over engineering convenience. Whether it is platform infrastructure for 60+ engineers or optimisation under production load, the first question is always who uses this, and what do they actually need.',
  ],
  repoCount: 25,
  coreMetrics: [
    {
      label: 'Real users',
      value: 500,
      suffix: '+',
      context: 'farmers using systems I built',
    },
    {
      label: 'Latency',
      value: 100,
      prefix: '<',
      suffix: 'ms',
      from: 500,
      fromSuffix: 'ms',
      context: 'found by measuring, not guessing',
    },
    { label: 'Teams enabled', value: 60, suffix: '+', context: 'engineers shipping faster' },
    { label: 'Faster deploys', value: 10, suffix: '×', context: 'hours to minutes' },
  ],
};

/* ------------------------------------------------------------------ */
/* Requirements                                                        */
/* ------------------------------------------------------------------ */

const requirements: Requirement[] = [
  {
    id: 'user-empathy',
    short: 'User empathy',
    title: 'User empathy & problem-first thinking',
    jd: 'Start from the user’s real workflow, not from abstract engineering.',
    reading:
      'An inspector on a ladder does not want a better form. Knowing the difference is most of the job.',
    icon: 'customer',
  },
  {
    id: 'production',
    short: 'Production',
    title: 'Production systems that survive real use',
    jd: 'Shipped to real users, with reliability, debugging, and observability that hold up.',
    reading:
      'The gap between "works on my machine" and "works in a basement with one bar of signal" is where most software dies.',
    icon: 'production',
  },
  {
    id: 'measurement',
    short: 'Measurement',
    title: 'Measurement over assumption',
    jd: 'Find the actual bottleneck by profiling rather than by intuition.',
    reading:
      'I have been confidently wrong about a bottleneck. Profiling is cheaper than being wrong for a month.',
    icon: 'stats',
  },
  {
    id: 'platform',
    short: 'Platform thinking',
    title: 'Platform & infrastructure thinking',
    jd: 'Build the infrastructure that lets other people move faster.',
    reading:
      'Sometimes the product the team needs is not a feature. It is the thing that removes the friction around every feature.',
    icon: 'infra',
  },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

const projects: Project[] = [
  {
    id: 'inference',
    index: 1,
    title: 'Inference Latency: 450ms → under 100ms',
    kicker: 'Shipped to 500+ farmers in production',
    period: 'Production · AWS',
    lens: 'Problem-solving',
    summary:
      'A crop-disease detection API that people hit from a phone, standing in a field, on bad connectivity. The model was accurate. The answer still arrived too late to be useful.',
    problem:
      'p95 latency sat at 450–500ms under concurrent load, and throughput fell over past roughly 50 simultaneous users. My first hypotheses were model size and GPU memory — the comfortable, interesting answers. Both were wrong, and I only know that because I profiled before I optimised.',
    solution: [
      'Measure, do not assume: profiling the serving path showed the dominant cost was loading the model from S3 on every single request — roughly 400ms of a 450ms budget. Nothing to do with the model.',
      'Fix the real bottleneck: hoisted initialisation to module scope so weights load once per worker at startup and stay resident. That single change removed the largest fixed cost from the hot path.',
      'Scale gracefully: request batching plus GPU-side preprocessing took the system from falling over at 50 concurrent users to holding 500+ on the same instance class, without an architectural rewrite.',
      'Design to the user, not the metric: the target was never "faster". It was "fast enough that someone standing in a field does not give up and go back to paper".',
    ],
    results: [
      'Sub-100ms p95, down from 450–500ms — roughly a 4.5× latency reduction, and fast enough to feel immediate in the field.',
      'Throughput scaled from bottlenecking at ~50 concurrent users to 500+, a 10× improvement on unchanged hardware.',
      'Latency stayed flat as load rose rather than degrading linearly, so the experience held up at peak rather than only in testing.',
      'Deployed on AWS behind a Flask serving layer, with a mobile client built for field use rather than desk use.',
    ],
    learning:
      'The interesting hypothesis and the correct one were not the same. I would have spent a fortnight shrinking a model that was never the problem. The habit worth keeping is not "optimise inference" — it is "measure before you believe yourself", and it transfers to every system I have touched since.',
    metrics: [
      { label: 'p95 latency', value: 100, from: 500, prefix: '<', suffix: 'ms', fromSuffix: 'ms' },
      { label: 'concurrent users', value: 500, suffix: '+', from: 50 },
      { label: 'of latency was I/O', value: 400, suffix: 'ms' },
    ],
    stack: ['Python', 'PyTorch', 'Flask', 'Profiling', 'AWS', 'Docker'],
    requirementIds: ['measurement', 'user-empathy', 'production'],
    architecture: [
      'Phone, in a field',
      'Serving layer',
      'Batching window',
      'Resident model + GPU preprocess',
      'Answer under 100ms',
    ],
    whyItMatters: [
      'Started from the user’s real problem — an answer while still standing in the field — not from an abstract latency target.',
      'Found the actual bottleneck by measurement; the intuitive answer would have wasted weeks.',
      'Shipped to real users on real devices and bad connections, then iterated on what actually broke.',
      'Field work has a hard latency budget: if the software is slower than the clipboard, people go back to the clipboard.',
    ],
  },
  {
    id: 'platform',
    index: 2,
    title: 'Platform Engineering for 60+ Engineers',
    kicker: 'Scaling a team, not just a system',
    period: 'Contriver · Founding team',
    lens: 'Platform thinking',
    summary:
      'Sixty engineers, inconsistent environments, deployments measured in hours, and no visibility once code left a laptop. The technical problems were user problems wearing a disguise.',
    problem:
      'Every engineer solved setup, deployment, and project structure from scratch, and every solution was subtly different. The cost is invisible until onboarding takes a week, nobody can reproduce a bug, and no two services can be operated the same way. My users here were engineers, and their real complaint was not "our tooling is bad" — it was "I cannot ship".',
    solution: [
      'User-centric infrastructure: a Docker-based local environment that mirrored production, so "works on my machine" stopped being a category of bug.',
      'Reduce friction to ship: CI/CD automation turned review → merge → live into minutes rather than hours, removing the step where momentum died.',
      'Observability for debugging: centralised logging, metrics, and tracing, so an engineer could see what their code actually did in production instead of guessing.',
      'Documentation as part of the product: methodology and conventions new joiners inherited by default, rather than by asking whoever was nearest.',
    ],
    results: [
      'Scaled from one engineer to 60+ without a matching increase in infrastructure overhead.',
      'Deployment time fell from hours of manual work to automated minutes — roughly 10× faster iteration.',
      'Onboarding time and environment variance both dropped substantially.',
      'Adoption came from the tooling being genuinely easier, not from a mandate — nobody was required to use it.',
    ],
    learning:
      'Platform work is product work with an unusually honest feedback loop: your users sit next to you and tell you when it is bad. Treating developer experience as a product — with real users, real friction, and real iteration — is what made it get adopted rather than tolerated.',
    metrics: [
      { label: 'engineers served', value: 60, suffix: '+' },
      { label: 'faster deployments', value: 10, suffix: '×' },
    ],
    stack: ['Docker', 'CI/CD', 'Python', 'AWS', 'Observability'],
    requirementIds: ['platform', 'user-empathy', 'production'],
    architecture: [
      'Engineer',
      'Mirrored local environment',
      'Automated pipeline',
      'One deploy path',
      'Observable service',
    ],
    whyItMatters: [
      'Scope’s office teams need tools that remove friction rather than add a step.',
      'Infrastructure that empowers a team is the same discipline as software that empowers an inspector.',
      'Platform work is not abstract — it is measured in whether real people get their work done faster.',
      'Sometimes the system the user needs is the platform, not another feature on the product.',
    ],
  },
  {
    id: 'iot',
    index: 3,
    title: 'IoT Orchestration Across Messy Hardware',
    kicker: 'Systems built for real conditions, not lab conditions',
    period: 'Production · Field deployment',
    lens: 'Production reality',
    summary:
      'Sensors in the ground, a broker in the middle, a dashboard at the end. Every layer with its own cadence, its own failure mode, and its own opinion about whether the network exists.',
    problem:
      'Real hardware does not match its datasheet. Sensors drop out without warning, connectivity disappears mid-reading, and data formats disagree with each other. A pipeline that assumes the happy path looks fine on a desk and falls apart in a field — which is precisely where it has to work.',
    solution: [
      'Protocol abstraction: one ingestion interface over sensors that speak different protocols and emit inconsistent shapes, so the rest of the system sees one clean stream.',
      'Handle failure as the normal case: retries with exponential backoff and local buffering, so an offline window degrades one topic instead of stalling the pipeline.',
      'Explicit handling of missing and corrupt readings, rather than letting bad data quietly poison everything downstream.',
      'Storage matched to the access pattern, with live readings pushed to the dashboard so an operator sees a problem rather than a table of numbers.',
    ],
    results: [
      'Reliable end-to-end pipeline from physical sensor to live dashboard.',
      'Anomaly detection surfacing out-of-range conditions as they happen.',
      'Each layer independently debuggable, so a failure could be isolated instead of guessed at.',
      'Intermittent connectivity treated as a design assumption rather than an incident to be surprised by.',
    ],
    learning:
      'Field software is defined by its failure handling, not its happy path. The connectivity assumption is the one that bites: anything that depends on the network being there will eventually be used somewhere the network is not.',
    metrics: [
      { label: 'layers integrated', value: 5 },
      { label: 'streaming latency', value: 1, prefix: '<', suffix: 's' },
    ],
    stack: ['Python', 'MQTT', 'Node.js', 'Time-series storage', 'WebSockets', 'Docker'],
    requirementIds: ['production', 'user-empathy'],
    architecture: [
      'Sensors (mixed vintage)',
      'Broker',
      'Buffering + normalisation',
      'Time-series store',
      'Live dashboard',
    ],
    whyItMatters: [
      'Field inspection software meets the same reality: bad signal, old devices, gaps in the data.',
      'Proven ability to build for real-world constraints rather than ideal ones.',
      'Offline-tolerant design is a requirement in the field, not a nice-to-have.',
    ],
  },
  {
    id: 'grasping-research',
    index: 4,
    kind: 'research',
    status: 'Final report in progress',
    title: 'Research: What Actually Constrains a Learning System',
    kicker: 'Measurement discipline, applied honestly',
    period: 'Research · MSc, University of York',
    lens: 'Measurement',
    summary:
      'A controlled study of how few demonstrations imitation learning really needs — and, more usefully, a demonstration of how easy it is to believe a result that does not survive a second run.',
    problem:
      'Most papers in this area report a single run. Variance in this regime is wide enough that one run will support whichever conclusion you were hoping for. Answering the question honestly meant holding the training budget fixed across every condition, varying only the thing under test, and repeating it enough times for the error bars to mean something.',
    solution: [
      'Measurement discipline: 3–10 random seeds per condition with error bars on every reported result, and a fixed gradient-step budget so demonstration count was the only variable moving.',
      'Algorithm comparison under identical constraints: behavioural cloning against DAgger — not "which is better in general", but "which is better for this problem, under this budget".',
      'One-factor-at-a-time sensitivity analysis to rank what genuinely drives the outcome rather than what seemed likely to.',
    ],
    results: [
      'DAgger reached expert-level performance from a single demonstration; behavioural cloning had not closed the gap at fifty. The algorithm was the constraint, not the amount of data.',
      'Training setup — gradient steps, learning rate, batch size — outranked demonstration count in the sensitivity analysis by roughly 1.8×.',
      'A hypothesis I was confident in did not survive: selecting "better" demonstrations by diversity performed no better than selecting at random. Reported as a null result.',
    ],
    learning:
      'The transferable part has nothing to do with robotics. It is that an improvement which only exists in one run is not an improvement, and the only way to know the difference is to build the harness properly before you start believing the output.',
    metrics: [
      { label: 'seeds per condition', value: 10, prefix: 'up to ' },
      { label: 'demonstrations needed', value: 1 },
      { label: 'setup over sample size', value: 1.8, suffix: '×' },
    ],
    stack: ['Python', 'PyTorch', 'Gymnasium', 'Statistical analysis', 'Multi-seed evaluation'],
    requirementIds: ['measurement', 'production'],
    architecture: [
      'Fixed training budget',
      'Seeded repetition',
      'Algorithm comparison',
      'Sensitivity sweep',
      'Result with error bars',
    ],
    link: {
      label: 'Research repository on GitHub',
      href: 'https://github.com/NithishSagar/Machine-learning-for-robotic-grasping-fundamentals-and-research-gaps',
    },
    note: 'Research rather than a shipped product. It is here for the methodology, which is the part that transfers.',
    whyItMatters: [
      'Building for real users means understanding the actual constraint, not the theoretical one.',
      'Error bars and repeated runs are software-engineering habits as much as research ones.',
      'An "improvement" measured once is often a fluke; knowing that changes how you evaluate a change before shipping it.',
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Requirement → evidence                                              */
/* ------------------------------------------------------------------ */

const mapping: MappingRow[] = [
  {
    requirementId: 'measurement',
    evidenceTitle: 'Profiling overturned the answer I was confident in',
    evidence:
      'The suspected bottleneck was model size. Measurement showed it was reloading weights on every request — about 400ms of a 450ms budget. The same discipline, applied to research, produced a null result I did not want.',
    proof: '450–500ms → under 100ms',
    projectId: 'inference',
  },
  {
    requirementId: 'user-empathy',
    evidenceTitle: 'The target was never "faster" — it was "usable in a field"',
    evidence:
      'Framing the work around what a farmer needs while standing in a field, and around what actually stopped sixty engineers from shipping, rather than around a metric that looked good on a dashboard.',
    proof: 'Adoption without a mandate',
    projectId: 'platform',
  },
  {
    requirementId: 'production',
    evidenceTitle: 'Shipped to people on bad connections and old devices',
    evidence:
      '500+ users on phones in the field, sensor pipelines built on the assumption that connectivity fails, and a platform sixty engineers depended on daily.',
    proof: 'Held up under real load',
    projectId: 'inference',
  },
  {
    requirementId: 'platform',
    evidenceTitle: 'Built the tooling that removed the friction around the work',
    evidence:
      'Mirrored local environments, automated deployment, and real observability — treating developer experience as a product with users who tell you when it is bad.',
    proof: '60+ engineers, 10× faster deploys',
    projectId: 'platform',
  },
];

/* ------------------------------------------------------------------ */
/* Perspective                                                         */
/* ------------------------------------------------------------------ */

const perspective = {
  title: 'building for real people',
  lede: 'Software exists to serve the person using it. Everything below follows from taking that literally.',
  quote:
    'If the software is slower than the clipboard, people go back to the clipboard.',
  quoteNote:
    'That is not a UX observation. It is a latency budget, a reliability target, and an offline requirement, all stated from the user’s side of the problem.',
  body: [
    {
      heading: 'Start from the user’s real problem',
      text: 'Most engineering starts from an abstraction. Scope starts from an inspector on a ladder, a technician driving site to site, someone in an office retyping a report. When I optimised that inference path, the question was not "how do I make this model faster" but "what does a farmer need to happen before they give up on this". The second question produces a different architecture, and a better one.',
    },
    {
      heading: 'Measure, do not assume',
      text: 'I found a 400ms bottleneck by profiling, not by intuition — and my intuition had been confidently pointing somewhere else. I learned the limits of a single run by repeating experiments across ten seeds rather than one. The discipline is identical in product work: know your real latency, know your real workflows, and build from evidence rather than from the most interesting hypothesis.',
    },
    {
      heading: 'Ship to real users, then listen',
      text: 'Shipping to 500+ people taught me things no amount of design review would have. You find out quickly what breaks, what annoys people, and what they actually needed as opposed to what you assumed. The platform work for sixty engineers was the same loop with a shorter feedback cycle, because the users sat next to me and said so out loud.',
    },
    {
      heading: 'The messy path is the real path',
      text: 'Field software is defined by its failure handling. Bad signal, an old device, a half-finished capture, a sensor that stops reporting without saying so — that is the normal case, not the edge case. I have built pipelines where connectivity loss was assumed from the start, and the difference between that and retrofitting resilience later is enormous.',
    },
  ],
  loop: [
    { step: 'Watch the work', text: 'Understand the workflow as it actually happens, not as documented.' },
    { step: 'Measure', text: 'Profile before optimising. The obvious bottleneck is usually wrong.' },
    { step: 'Build to the constraint', text: 'Let the real limit dictate the design.' },
    { step: 'Ship and listen', text: 'Real use is the only honest test. Then go round again.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

const skillGroups: SkillGroup[] = [
  {
    title: 'Problem-Solving',
    icon: 'stats',
    note: 'Mostly the discipline of not trusting my first guess.',
    skills: [
      { name: 'Bottleneck identification by measurement', level: 92, note: 'Profiling under load' },
      { name: 'Constraint-driven architecture', level: 90 },
      { name: 'Understanding user workflows', level: 88 },
      { name: 'Debugging in production', level: 88 },
    ],
  },
  {
    title: 'Production Engineering',
    icon: 'production',
    note: 'Invisible until it fails, which is the point.',
    skills: [
      { name: 'Building for real users', level: 92, note: '500+ in the field' },
      { name: 'Inference & pipeline optimisation', level: 90 },
      { name: 'Reliability & observability', level: 85 },
      { name: 'Offline-tolerant design', level: 85, note: 'Connectivity assumed to fail' },
      { name: 'Scaling gracefully', level: 88 },
    ],
  },
  {
    title: 'Platform Work',
    icon: 'infra',
    note: 'Developer experience as a product with real users.',
    skills: [
      { name: 'Developer experience', level: 90, note: '60+ engineers' },
      { name: 'CI/CD automation', level: 88 },
      { name: 'Docker & environment parity', level: 88 },
      { name: 'Tooling for faster iteration', level: 85 },
    ],
  },
  {
    title: 'Backend & APIs',
    icon: 'backend',
    note: 'Where most of the latency actually hides.',
    skills: [
      { name: 'Python', level: 95, note: 'Advanced' },
      { name: 'FastAPI / Flask', level: 90 },
      { name: 'Node.js', level: 85 },
      { name: 'MySQL / MongoDB', level: 88 },
    ],
  },
  {
    title: 'Frontend & Data',
    icon: 'frontend',
    note: 'The layer where backend decisions become visible.',
    skills: [
      { name: 'React / TypeScript', level: 88 },
      { name: 'Real-time UI (WebSockets)', level: 85 },
      { name: 'PyTorch', level: 88 },
      { name: 'AWS / GCP', level: 85 },
    ],
  },
];

const coreCompetencies = [
  'User empathy — start from the real workflow',
  'Measurement discipline',
  'Production reliability',
  'Platform thinking',
  'Problem-first engineering',
  'Offline-tolerant design',
];

/* ------------------------------------------------------------------ */
/* Timeline                                                            */
/* ------------------------------------------------------------------ */

const timeline: TimelineItem[] = [
  {
    period: 'Early',
    title: 'Systems other people depended on',
    org: 'Undergraduate · project work',
    text: 'The step from code that runs on my machine to code other people rely on — including university systems carrying 500+ daily users on servers I administered myself.',
    tags: ['Full-stack', '500+ daily users', 'On-premise ops'],
  },
  {
    period: 'Field deployment',
    title: 'Software that had to work outdoors',
    org: 'Applied research → deployment',
    text: 'Sensor pipelines and a mobile disease-detection client built for bad connectivity, old devices, and people who are not sitting at a desk.',
    tags: ['MQTT', 'Offline-tolerant', 'Mobile'],
  },
  {
    period: 'October 2024 – August 2025',
    title: 'Founding-team role, internal developer platform',
    org: 'Contriver',
    text: 'Built the platform sixty engineers worked on top of, and rebuilt an inference path from 450–500ms to under 100ms once profiling showed where the time actually went.',
    tags: ['60+ engineers', 'Under 100ms', 'CI/CD'],
    highlight: true,
  },
  {
    period: 'September 2025 → present',
    title: 'MSc Advanced Computer Science (Artificial Intelligence)',
    org: 'University of York',
    text: 'Formalising the measurement discipline behind the systems instinct — controlled experiments, repeated runs, and honest reporting of results that did not go my way.',
    tags: ['MSc AI', 'Measurement rigour'],
    highlight: true,
  },
];

/* ------------------------------------------------------------------ */
/* GitHub                                                              */
/* ------------------------------------------------------------------ */

const repos: Repo[] = [
  {
    name: 'Potato-Disease-Classification',
    description:
      'The inference optimisation work: profiling, resident model loading, request batching, and a client built for use in a field rather than at a desk.',
    tags: ['Python', 'PyTorch', 'Flask', 'AWS'],
    featured: true,
  },
  {
    name: 'IoT-NPK-Monitoring',
    description:
      'Sensor pipeline built on the assumption that connectivity fails — buffering, retries, and graceful handling of missing readings.',
    tags: ['MQTT', 'Node.js', 'Offline-tolerant'],
    featured: true,
  },
  {
    name: 'Machine-learning-for-robotic-grasping',
    description:
      'Multi-seed experiments with error bars, comparing algorithms under a fixed budget. Included for the methodology.',
    tags: ['PyTorch', 'Statistics', 'Multi-seed'],
    url: 'https://github.com/NithishSagar/Machine-learning-for-robotic-grasping-fundamentals-and-research-gaps',
  },
  {
    name: 'Student-Attendance-System',
    description:
      'High-concurrency write path for staff all marking attendance in the same narrow window, deployed on university servers.',
    tags: ['MySQL', 'Concurrency'],
  },
];

const githubStats = [
  { label: 'public repositories', value: 25 },
  { label: 'systems shipped to real users', value: 4 },
  { label: 'engineers served by platform work', value: 60, suffix: '+' },
  { label: 'users in the field', value: 500, suffix: '+' },
];

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'role', label: 'The Role' },
  { id: 'work', label: 'My Work' },
  { id: 'mapping', label: 'The Mapping' },
  { id: 'perspective', label: 'Perspective' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

/* ------------------------------------------------------------------ */
/* Section headings                                                    */
/* ------------------------------------------------------------------ */

const sections: SectionsCopy = {
  about: {
    eyebrow: 'About',
    title: 'I start from the person using the thing —',
    titleAccent: 'then build around what blocks them.',
  },
  role: {
    eyebrow: 'The Role',
    title: 'What Scope is asking for — and how I read each line',
    titleAccent: 'of it.',
  },
  work: {
    eyebrow: 'My Work',
    title: 'Three systems real people depended on, and one study about',
    titleAccent: 'not fooling yourself.',
    lede:
      'Each card opens onto the full story: who the user was, what actually blocked them, what I changed, and what the measurement said afterwards.',
  },
  mapping: {
    eyebrow: 'The Mapping',
    title: 'Every requirement, answered by something I',
    titleAccent: 'actually shipped.',
    lede:
      'Left: what the role asks for. Right: the evidence, in the order I would argue it. Hover a row to trace the connection; click to filter the whole page.',
  },
  perspective: {
    eyebrow: 'My Perspective',
    title: 'On',
  },
  skills: {
    eyebrow: 'Skills',
    title: 'The tools, and where each one was',
    titleAccent: 'earned.',
    lede:
      'Depth here means production use with real users on it, not tutorial completion. Where a skill was proven on a specific system, it says so.',
  },
  journey: {
    eyebrow: 'Journey',
    title: 'From systems that had to run, to teams that had to',
    titleAccent: 'move faster.',
    lede:
      'The through-line is users: each step put my work in front of more people who had no obligation to be patient with it.',
  },
  code: {
    eyebrow: 'Code',
    title: '25 repositories, and the shipping',
    titleAccent: 'never stopped.',
    lede:
      'Project work through to systems with real users on them. The interesting part is not any single repository — it is the habit.',
  },
  contact: {
    eyebrow: 'Let’s talk',
    title: 'Let’s build software for the people who do',
    titleAccent: 'the real work.',
  },
};

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

const scope: CompanyConfig = {
  key: 'scope',
  companyName: 'Scope',
  companyShort: 'Scope',
  contactPitch:
    'I build software for people who do real work. Three years of it: an answer fast enough to use in a field, a platform sixty engineers chose to rely on, pipelines built for the day the network is not there. I would like to bring that to Scope.',
  theme: 'framer',
  profile,
  requirements,
  projects,
  mapping,
  perspective,
  skillGroups,
  coreCompetencies,
  timeline,
  repos,
  githubStats,
  navItems,
  sections,
};

export default scope;
