/**
 * Callosum · Applied AI — Member of Technical Staff.
 *
 * The original portfolio content. Selected when NEXT_PUBLIC_COMPANY is unset
 * or set to 'callosum'.
 */
import type {
  CompanyConfig,
  SectionsCopy,
  JourneyPhase,
  MappingRow,
  Metric,
  Project,
  Repo,
  Requirement,
  SkillGroup,
  TimelineItem,
} from './types';

export type { JourneyPhase };

/* ------------------------------------------------------------------ */
/* Identity                                                            */
/* ------------------------------------------------------------------ */

export const profile = {
  name: 'Nithish Sagar',
  target: 'Callosum · Applied AI',
  role: 'Member of Technical Staff',
  tagline:
    'Applied AI Engineer specialised in high-throughput inference paths and production systems that do not break under load.',
  pitch:
    'Most applicants will tell you they are ready to learn your stack. I built my projects assuming I was already on day one at your London office, bridging customer pipelines to frontier silicon. Explore the code below to see if my engineering velocity matches the scale of your roadmap.',
  // Change this to your preferred contact address.
  email: 'nsd8681@gmail.com',
  github: 'https://github.com/NithishSagar',
  portfolio: 'https://nithish-portfolio-iota.vercel.app/',
  linkedin: 'https://www.linkedin.com/in/nithish-sagar-d-458141213/',
  location: 'York, United Kingdom',
  education: {
    degree: 'MSc Advanced Computer Science (Artificial Intelligence)',
    school: 'University of York',
    start: 'September 2025',
  },
  summary: [
    'Most engineers treat multi-chip orchestration and heterogeneous compute as abstract research problems. I treat them as engineering constraints to be mapped, measured, and optimised. Whether that means driving p95 latency from 500ms to sub-100ms under heavy concurrent load or building deterministic evaluation harnesses, the focus is singular: shipping systems that survive contact with production.',
    'Callosum is building the software orchestration layer for the next era of intelligence. The code and architecture evaluations below are built to prove one thing — that I have the shipping discipline and systems depth to accelerate your roadmap from day one.',
    'The portfolio is the argument. Every claim below is filterable against a requirement, and every number states the conditions it was measured under.',
  ],
  repoCount: 25,
  /**
   * The headline numbers, stated with the conditions they were measured
   * under. A metric without its conditions is a slogan.
   */
  coreMetrics: [
    {
      label: 'Inference latency',
      value: 100,
      prefix: '<',
      suffix: 'ms',
      from: 500,
      fromSuffix: 'ms',
      context: 'p95, 500+ concurrent',
    },
    { label: 'Throughput', value: 10, suffix: '×', context: 'vs. initial architecture' },
    { label: 'Production users', value: 500, suffix: '+', context: 'daily active' },
    { label: 'Platform engineers', value: 60, suffix: '+', context: 'internal tooling scaled' },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Callosum role requirements                                          */
/* ------------------------------------------------------------------ */

export const requirements: Requirement[] = [
  {
    id: 'depth',
    short: 'Technical depth',
    title: 'Exceptional technical depth',
    jd: 'Demonstrated through production systems, research, or founding roles.',
    reading:
      'Not "has used the tools" — has owned something real long enough for its failure modes to become personal.',
    icon: 'depth',
  },
  {
    id: 'evaluation',
    short: 'Rigorous evaluation',
    title: 'Rigorous evaluation & benchmarking',
    jd: 'Experience evaluating AI workloads with methodological rigour.',
    reading:
      'The hard part is not running the benchmark. It is knowing which of your numbers are artefacts of the harness.',
    icon: 'evaluation',
  },
  {
    id: 'orchestration',
    short: 'Heterogeneous systems',
    title: 'Orchestrate heterogeneous systems',
    jd: 'Design and integrate complex systems across heterogeneous components.',
    reading:
      'Every layer has a different failure mode and a different clock. Integration is the discipline of respecting both.',
    icon: 'orchestration',
  },
  {
    id: 'workloads',
    short: 'AI workloads',
    title: 'Deep understanding of AI workloads',
    jd: 'Know how inference and training workloads actually behave on real hardware.',
    reading:
      'A model is a shape of compute and memory traffic before it is anything else. Optimise the shape, not the framework.',
    icon: 'workloads',
  },
  {
    id: 'customer',
    short: 'Customer-facing',
    title: 'Customer-facing problem solving',
    jd: 'Work directly with users to turn ambiguous problems into shipped systems.',
    reading:
      'Users do not report root causes. They report symptoms, late, and usually to the wrong person.',
    icon: 'customer',
  },
  {
    id: 'founder',
    short: 'Founder mentality',
    title: 'Founder mentality & bias for action',
    jd: 'Own outcomes end to end and build the things nobody assigned you.',
    reading:
      'Building for yourself is easy. Building the platform your teammates depend on is the actual test.',
    icon: 'founder',
  },
  {
    id: 'debugging',
    short: 'Production constraints',
    title: 'Deep understanding of production constraints',
    jd: 'Debug, operate, and harden systems that real people depend on daily.',
    reading:
      'Production is where your assumptions get audited by reality, on a schedule you do not control.',
    icon: 'debugging',
  },
];

/* ------------------------------------------------------------------ */
/* Production systems                                                  */
/* ------------------------------------------------------------------ */

/* Chart specs for research projects — plain data, drawn by ResearchCharts. */

export const projects: Project[] = [
  {
    id: 'inference',
    index: 1,
    title: 'Potato Disease Detection',
    kicker: 'AI inference under a latency budget',
    period: 'Production · AWS',
    lens: 'Inference optimisation',
    summary:
      'A CNN classification API that field users hit from a phone, in a field, on bad connectivity. The model was accurate. The serving path was not.',
    problem:
      'p95 inference latency sat at 450–500ms under concurrent load, and throughput collapsed past roughly 50 simultaneous users. The model itself was fast; the cost was everywhere around it — weights were being reloaded per request, preprocessing ran on CPU inside the request thread, and every request was its own isolated forward pass, so the GPU spent most of its life idle between one-image batches.',
    solution: [
      'Hoisted model initialisation to module scope so weights load once per worker process instead of once per request — this alone removed the largest fixed cost from the hot path.',
      'Introduced request batching with a short accumulation window, trading a few milliseconds of queueing for a dramatically better GPU utilisation curve.',
      'Moved image decode, resize, and normalisation onto the GPU, so the CPU stopped being the serialisation point in front of an otherwise parallel device.',
      'Set a hard latency budget first and treated it as the architectural constraint, not as a metric to check afterwards — every design choice had to pay for itself out of that budget.',
    ],
    results: [
      'Sub-100ms end-to-end response time at p95, down from 450–500ms.',
      '10× throughput improvement: 50 → 500+ concurrent users on the same instance class.',
      'Deployed to AWS with a Flask serving layer, React web client, and a mobile client for field use.',
      'Latency stayed flat as concurrency rose, instead of degrading linearly.',
    ],
    learning:
      'The model was never the bottleneck. Almost all of the latency lived in the boundaries — process setup, host-to-device copies, and the decision to treat each request as if it were alone in the world. Optimising inference means optimising the path around the model at least as much as the model itself.',
    metrics: [
      { label: 'p95 latency', value: 100, from: 500, prefix: '<', suffix: 'ms', fromSuffix: 'ms' },
      { label: 'throughput gain', value: 10, suffix: '×' },
      { label: 'concurrent users', value: 500, suffix: '+', from: 50 },
    ],
    stack: ['Python', 'CNN', 'Flask', 'GPU preprocessing', 'Request batching', 'AWS', 'React', 'Mobile'],
    requirementIds: ['workloads', 'evaluation', 'depth', 'debugging'],
    architecture: [
      'Mobile / React client',
      'Flask serving layer',
      'Batching window',
      'GPU preprocess + forward',
      'Response < 100ms',
    ],
  },
  {
    id: 'iot',
    index: 2,
    title: 'IoT Sensing Ecosystem',
    kicker: 'Five layers, five different clocks',
    period: 'Production · Field deployment',
    lens: 'Heterogeneous orchestration',
    summary:
      'NPK soil sensors in the ground, a broker in the middle, and a browser at the end — every layer with its own idea of what "real time" means.',
    problem:
      'The components had nothing in common. Sensors emit on their own cadence and drop out without warning. MQTT gives you at-most-once unless you pay for more. The database wants batched writes; the browser wants a continuous stream. Naively gluing these together produces a system that looks fine on a desk and falls apart in a field.',
    solution: [
      'Designed the data flow around MQTT pub-sub so producers and consumers could fail independently — a sensor going quiet degrades one topic instead of stalling the pipeline.',
      'Built a Node.js ingestion service that buffers and normalises readings before they hit storage, absorbing the impedance mismatch between bursty sensors and batch-friendly writes.',
      'Used MongoDB time-series collections so the storage layer matched the access pattern instead of fighting it.',
      'Pushed live readings to the browser over WebSockets, with anomaly detection running on the stream so operators see problems rather than raw numbers.',
    ],
    results: [
      'Reliable end-to-end pipeline from hardware sensor to live browser dashboard.',
      'Real-time anomaly detection surfacing out-of-range soil nutrient conditions as they happen.',
      'Each layer independently debuggable and independently replaceable.',
      'Field-deployed with intermittent connectivity as a design assumption, not an incident.',
    ],
    learning:
      'Heterogeneous systems are not hard because the components are complicated. They are hard because each one has a different failure mode, a different latency profile, and a different notion of backpressure — and the integration layer is where all of those disagreements have to be resolved explicitly.',
    metrics: [
      { label: 'system layers integrated', value: 5 },
      { label: 'streaming latency', value: 1, prefix: '<', suffix: 's' },
    ],
    stack: ['MQTT', 'Node.js', 'MongoDB time-series', 'WebSockets', 'NPK sensors', 'Anomaly detection'],
    requirementIds: ['orchestration', 'depth', 'debugging'],
    architecture: [
      'NPK sensors (hardware)',
      'MQTT broker',
      'Node.js ingestion',
      'MongoDB time-series',
      'WebSocket dashboard',
    ],
  },
  {
    id: 'enterprise',
    index: 3,
    title: 'Enterprise Systems, Dual Deployment',
    kicker: '500+ daily users on hardware I administered',
    period: 'Production · University on-premise',
    lens: 'End-to-end ownership',
    summary:
      'Student Attendance Management and Hostel Management, both live on university on-premise servers, both serving real people with real deadlines.',
    problem:
      'These systems were load-bearing for daily university operations. Attendance is written by many staff in the same narrow window; hostel allocation is a contended-resource problem where two people must never get the same room. On-premise meant no managed database, no autoscaling, and no one else to page — correctness under concurrency and recoverability after failure were both mine to guarantee.',
    solution: [
      'Modelled the concurrent write paths explicitly and used transactions to make allocation and attendance updates atomic under simultaneous access.',
      'Tuned MySQL for the real query shapes — indexing for the reporting reads that were actually slow rather than the ones that looked expensive.',
      'Stood up the servers themselves: Linux administration, deployment, monitoring, and a tested backup and disaster-recovery path.',
      'Implemented role-based access control so staff, wardens, and students each saw a correctly scoped view of the same data.',
    ],
    results: [
      '500+ concurrent daily users across two systems in continuous operation.',
      'Transaction-safe under multi-user contention — no double allocation, no lost attendance writes.',
      'Backup and restore rehearsed rather than assumed.',
      'Integrated with existing legacy university records rather than demanding a clean slate.',
    ],
    learning:
      'Owning a system end to end changes what you consider a design decision. Once you are the person restoring the backup, schema choices, index choices, and failure handling stop being abstractions and start being things you will personally be woken up by.',
    metrics: [
      { label: 'daily users', value: 500, suffix: '+' },
      { label: 'systems in production', value: 2 },
    ],
    stack: ['MySQL', 'Transactions', 'RBAC', 'Linux', 'On-premise ops', 'Backup / DR'],
    requirementIds: ['debugging', 'customer', 'depth'],
    architecture: [
      'Staff / student clients',
      'Application layer + RBAC',
      'Transactional write path',
      'Tuned MySQL',
      'Backup + DR',
    ],
    link: { label: 'Related repositories on GitHub', href: 'https://github.com/NithishSagar' },
  },
  {
    id: 'platform',
    index: 4,
    title: 'Internal Developer Platform',
    kicker: 'Infrastructure for 60+ engineers',
    period: 'Contriver · Founding-team role',
    lens: 'Founder mentality',
    summary:
      'Nobody assigned this. The team was growing faster than its conventions, so I built the platform that let 60+ engineers move without colliding.',
    problem:
      'Rapid team growth without shared tooling produces the same problems repeatedly: every engineer solves setup, deployment, and project structure from scratch, and each solution is subtly different. The cost is invisible until onboarding takes a week and no two services can be operated the same way.',
    solution: [
      'Built an internal developer platform that standardised the path from empty repository to running service.',
      'Established the engineering methodology and best practices that new joiners inherited by default rather than by osmosis.',
      'Built the tooling layer that made the right way also the easy way — adoption came from utility, not mandate.',
      'Treated developer experience as a product with real users, and iterated on it with their feedback.',
    ],
    results: [
      '60+ engineers on shared tooling and a common methodology.',
      'Onboarding time and setup variance both cut substantially.',
      'Practices that outlasted my direct involvement.',
      'Leadership through infrastructure rather than through process.',
    ],
    learning:
      'Building something that only you can operate is a personal achievement. Building something dozens of engineers depend on daily is an engineering one — and it forces you to design for people whose context and constraints are not yours.',
    metrics: [{ label: 'engineers served', value: 60, suffix: '+' }],
    stack: ['Platform engineering', 'CI/CD', 'Docker', 'Developer experience', 'Technical leadership'],
    requirementIds: ['founder', 'customer', 'depth'],
    architecture: [
      'Engineer',
      'Standard project scaffold',
      'Shared CI/CD pipeline',
      'Common deploy path',
      'Running service',
    ],
  },
  {
    id: 'grasping-research',
    index: 5,
    kind: 'research',
    status: 'Final report in progress',
    title: 'Demonstration Efficiency in Imitation Learning',
    kicker: 'How few demonstrations actually suffice — and what really decides the answer',
    period: 'Research · Robot manipulation',
    lens: 'Evaluation rigour',
    summary:
      'A controlled study of sample efficiency in robot manipulation: how many demonstrations imitation learning needs, whether choosing better demonstrations helps, and which algorithm makes the most of a small dataset.',
    problem:
      'Three questions, none of which survive a single-run experiment. How few demonstrations suffice for imitation learning? Does demonstration selection matter, or is representative coverage enough? Which algorithm is most sample-efficient under a realistic compute budget? Answering any of them honestly means holding the gradient-step budget fixed across every condition, varying only what you claim to be varying, and repeating enough times that the error bars mean something.',
    solution: [
      'Fixed the gradient-step budget across all conditions so demonstration count was the only thing moving — otherwise "more demonstrations help" is indistinguishable from "more demonstrations bought more training".',
      'Repeated every condition across 3–10 random seeds and reported error bars on all results. Variance in this regime is wide enough that a single run will support whichever conclusion you were hoping for.',
      'Compared behavioural cloning, DAgger, greedy diversity-based selection, and a random-selection baseline under identical constraints.',
      'Ran per-phase analysis to locate where performance actually breaks, and one-factor-at-a-time sensitivity to rank what genuinely drives the result rather than what seemed likely to.',
      'Validated on two environments: Pendulum-v1 for development, then FetchReach-v2 to check whether the findings transferred to a robot reaching task.',
    ],
    results: [
      'DAgger reaches expert-level performance from a single seed demonstration plus 6,000 expert queries — −163.2 return at 100% success, against an expert baseline of −166.3.',
      'Behavioural cloning plateaus at −544.5 even at 50 demonstrations. The gap to expert never closes, which makes the algorithm the constraint rather than the data.',
      'Greedy farthest-point demonstration selection performed no better than random selection on either task — a null result, reported as one.',
      'Gradient steps (swing 1062), learning rate (996), and batch size (770) each outrank demonstration count (584) in the sensitivity analysis: training setup matters roughly 1.8× more than sample size.',
    ],
    learning:
      'The finding I did not expect was the null one. Selecting "better" demonstrations by maximising state-space diversity did nothing that random selection had not already done — and I only know that because both arms ran under the same budget across enough seeds to tell them apart. Most of the value in an evaluation sits in the conditions you hold still, not the numbers you report.',
    metrics: [
      { label: 'demonstrations DAgger needed', value: 1 },
      { label: 'more sample-efficient than BC', value: 15, suffix: '×' },
      { label: 'random seeds per condition', value: 10, prefix: 'up to ' },
    ],
    stack: [
      'Python',
      'PyTorch',
      'Gymnasium',
      'Stable-Baselines3',
      'Behavioural cloning',
      'DAgger',
      'Multi-seed evaluation',
      'OFAT sensitivity',
    ],
    // 'customer' deliberately omitted: this project evidences evaluation
    // rigour, not the work of turning an ambiguous user problem into a
    // shipped system. The platform work carries that claim instead.
    requirementIds: ['evaluation', 'depth', 'debugging'],
    architecture: [
      'Expert policy (SAC)',
      'Demonstration sampling',
      'BC / DAgger training',
      'Fixed gradient budget',
      'Multi-seed evaluation',
    ],
    note: 'Controlled research rather than deployment: this is evaluation methodology, and it is listed as such. The production counterparts are the four systems above.',
    link: {
      label: 'Research repository on GitHub',
      href: 'https://github.com/NithishSagar/Machine-learning-for-robotic-grasping-fundamentals-and-research-gaps',
    },
    whyItMatters: [
      'Heterogeneous systems are exactly where single-run results mislead — different silicon, different batch shapes, different thermal states.',
      'Ranking what actually constrains performance is the same skill whether the variable is demonstration count or accelerator choice.',
      'A null result you can defend is worth more than a positive result you cannot.',
      'Honest limitations reporting is what makes a benchmark reusable by somebody other than its author.',
    ],
    charts: [
      {
        kind: 'line',
        title: 'DAgger vs behavioural cloning',
        xLabel: 'Demonstrations',
        yLabel: 'Return',
        ticks: [1, 5, 10, 50],
        series: [
          {
            name: 'DAgger',
            points: [
              { x: 1, y: -163.2, err: 50 },
              { x: 5, y: -161.8, err: 45 },
              { x: 10, y: -199.2, err: 48 },
              { x: 50, y: -270.0, err: 55 },
            ],
          },
          {
            name: 'Behavioural cloning',
            points: [
              { x: 1, y: -1125.7, err: 300 },
              { x: 5, y: -790.8, err: 280 },
              { x: 10, y: -833.7, err: 290 },
              { x: 50, y: -518.6, err: 250 },
            ],
          },
          {
            name: 'Expert baseline (SAC)',
            reference: true,
            points: [{ x: 0, y: -166.3, err: 84.2 }],
          },
        ],
        note: 'DAgger sits inside the expert band from one demonstration. BC never reaches it — higher is better.',
      },
      {
        kind: 'bar',
        title: 'Parameter sensitivity (OFAT)',
        xLabel: 'Performance swing',
        bars: [
          { label: 'Gradient steps', value: 1062 },
          { label: 'Learning rate', value: 996 },
          { label: 'Batch size', value: 770 },
          { label: 'Demonstrations', value: 584, emphasis: true },
          { label: 'Network width', value: 387 },
        ],
        note: 'Demonstration count ranks fourth. Gradient steps swing performance ~1.8× further.',
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Requirement → evidence mapping                                      */
/* ------------------------------------------------------------------ */

export const mapping: MappingRow[] = [
  {
    requirementId: 'workloads',
    evidenceTitle: 'Rebuilt a CNN serving path around its latency budget',
    evidence:
      'Diagnosed that the cost lived in process setup, host-to-device copies, and single-image forward passes — not in the model.',
    proof: '450–500ms → sub-100ms p95',
    projectId: 'inference',
  },
  {
    requirementId: 'evaluation',
    evidenceTitle: 'Controlled experiments with seeds, error bars, and a null result',
    evidence:
      'Imitation-learning study holding the gradient-step budget fixed across every condition, repeated over 3–10 seeds, with per-phase and OFAT sensitivity analysis — plus inference benchmarking under realistic concurrency rather than single-request conditions.',
    proof: 'Ranked what actually constrains performance',
    projectId: 'grasping-research',
  },
  {
    requirementId: 'orchestration',
    evidenceTitle: 'Five-layer heterogeneous pipeline, hardware to browser',
    evidence:
      'Sensors → MQTT → Node.js → MongoDB time-series → WebSocket, each layer with its own failure mode and backpressure story resolved explicitly.',
    proof: 'Field-deployed, independently debuggable layers',
    projectId: 'iot',
  },
  {
    requirementId: 'debugging',
    evidenceTitle: 'Operated load-bearing systems on hardware I administered',
    evidence:
      'Transactions under contention, MySQL tuned to real query shapes, rehearsed backup and disaster recovery on on-premise servers.',
    proof: '500+ daily users, continuous operation',
    projectId: 'enterprise',
  },
  {
    requirementId: 'founder',
    evidenceTitle: 'Built the platform nobody asked me to build',
    evidence:
      'Founding-team role at Contriver: established methodology, tooling, and best practices as the team scaled.',
    proof: '60+ engineers on shared infrastructure',
    projectId: 'platform',
  },
  {
    requirementId: 'customer',
    evidenceTitle: 'Built for 60+ engineers who could simply have ignored it',
    evidence:
      'The internal platform is the strongest customer-facing evidence I have: sixty engineers with different stacks, habits, and deadlines, none of whom were required to adopt it. Alongside that, university staff, wardens, and students whose requirements arrived as symptoms rather than specifications.',
    proof: 'Adoption earned, not mandated',
    projectId: 'platform',
  },
  {
    requirementId: 'depth',
    evidenceTitle: 'Four production systems, a founding-team role, and original research',
    evidence:
      'Inference, IoT, data, and platform work in production, alongside an imitation-learning study that reports its own null findings — formalised through an MSc in Advanced Computer Science (AI) at York.',
    proof: 'Depth earned by operating and by measuring',
    projectId: 'inference',
  },
];

/* ------------------------------------------------------------------ */
/* Perspective                                                         */
/* ------------------------------------------------------------------ */

export const perspective = {
  title: 'Constraint-driven systems design',
  lede: 'The two halves of my work are measurement rigour and production reality. They are the same discipline pointed in opposite directions.',
  quote:
    'In any stochastic evaluation, every source of variation you claim to measure must actually be allowed to vary across runs.',
  quoteNote:
    'Otherwise you have not measured variance. You have measured your seeding logic — and reported it with confidence intervals.',
  body: [
    {
      heading: 'A number you cannot defend is worse than no number',
      text: 'If your harness pins a seed you intended to vary, your error bars describe the harness rather than the system. The result still looks rigorous. It still gets a plot. And every decision built on top of it inherits the flaw silently. I have learned to interrogate the measurement setup before I trust the measurement, because the failure is invisible from the output alone.',
    },
    {
      heading: 'Constraints are the architecture',
      text: 'On the inference API I set the latency budget first and derived the design from it. Module-level initialisation, batching, and GPU preprocessing were not a menu of optimisations — they were the only set of choices that fit inside the budget. Starting from the constraint gets you to the answer faster than starting from a list of techniques.',
    },
    {
      heading: 'Few improvements survive statistical scrutiny',
      text: 'My imitation-learning research made this concrete. Holding the gradient-step budget fixed across every condition, repeating over 3–10 seeds, and reporting error bars turned up a result I did not want: choosing "better" demonstrations by state-space diversity performed no better than choosing at random. Many improvements look real in one run. Few of them survive a second look under controlled conditions — and for heterogeneous systems, where silicon, batch shape, and thermal state all move at once, that discipline is not optional. You cannot optimise what you have not measured correctly.',
    },
    {
      heading: 'Why heterogeneous compute is the interesting problem',
      text: 'Different workloads want genuinely different hardware. A latency-bound single-image classifier, a throughput-bound batch job, and a memory-bandwidth-bound transformer do not share an optimal target — and the gap between them is widening as accelerators specialise. Infrastructure that can place work on the right silicon, and prove it was the right choice, is where the real efficiency is left.',
    },
    {
      heading: 'What Callosum is actually building',
      text: 'Orchestrating heterogeneous accelerators is the IoT integration problem with far higher stakes: every component has its own performance envelope, failure mode, and cost curve, and the value is created in the layer that reconciles them. I have built that reconciling layer before — in a smaller domain, with the same shape of problem — and I want to build it here.',
    },
  ],
  loop: [
    { step: 'Measure', text: 'Instrument honestly. Verify the harness before the result.' },
    { step: 'Identify constraint', text: 'Find the component that actually binds — usually not the one you suspect.' },
    { step: 'Design to it', text: 'Let the binding constraint dictate the architecture.' },
    { step: 'Verify in production', text: 'Re-measure under real load. Production is the only honest benchmark.' },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export const skillGroups: SkillGroup[] = [
  {
    title: 'Backend & APIs',
    icon: 'backend',
    note: 'Where most of the latency actually hides.',
    skills: [
      { name: 'Python', level: 95, note: 'Advanced' },
      { name: 'FastAPI', level: 88 },
      { name: 'Flask', level: 90, note: 'Production inference serving' },
      { name: 'Node.js', level: 85, note: 'IoT ingestion pipeline' },
      { name: 'Django', level: 75 },
    ],
  },
  {
    title: 'ML & Evaluation',
    icon: 'ml',
    note: 'Training is the easy half. Trusting the numbers is the other one.',
    skills: [
      { name: 'CNNs / image classification', level: 92 },
      { name: 'Production inference optimisation', level: 90, note: 'Batching, GPU preprocessing' },
      { name: 'Experimental design & methodology', level: 90, note: 'Controlled variables' },
      { name: 'Multi-seed statistical analysis', level: 88, note: 'Error bars, 3–10 seeds' },
      { name: 'Imitation learning & demonstration efficiency', level: 86, note: 'BC, DAgger' },
      { name: 'Parameter sensitivity analysis (OFAT)', level: 85 },
      { name: 'Model training & tuning', level: 85 },
    ],
  },
  {
    title: 'Cloud & Infrastructure',
    icon: 'cloud',
    note: 'Including the servers I had to physically care about.',
    skills: [
      { name: 'AWS (EC2, Lambda, S3, RDS, GPU)', level: 88 },
      { name: 'Docker', level: 85 },
      { name: 'CI/CD', level: 85, note: 'Internal platform at Contriver' },
      { name: 'Linux administration', level: 82, note: 'On-premise deployment' },
      { name: 'GCP / Azure', level: 70 },
    ],
  },
  {
    title: 'Data & Storage',
    icon: 'data',
    note: 'Schema choices you will meet again at 2am.',
    skills: [
      { name: 'MySQL', level: 90, note: 'Production tuning, transactions' },
      { name: 'MongoDB', level: 85, note: 'Time-series collections' },
      { name: 'MQTT / streaming', level: 85 },
      { name: 'Firebase', level: 72 },
    ],
  },
  {
    title: 'Frontend',
    icon: 'frontend',
    note: 'The layer where users notice your backend decisions.',
    skills: [
      { name: 'React', level: 90, note: 'Advanced' },
      { name: 'TypeScript / JavaScript', level: 88 },
      { name: 'WebSockets / real-time UI', level: 85 },
      { name: 'CSS / Tailwind', level: 85 },
    ],
  },
];

/** Rendered as a chip row in the About section. */
export const coreCompetencies = [
  'Constraint-driven design',
  'Rigorous statistical evaluation',
  'Experimental design (controlled variables)',
  'Multi-seed validation',
  'Honest result reporting',
  'End-to-end production ownership',
  'Latency-budget-first architecture',
  'Production debugging under load',
  'Systems that stay shipped',
];

/* ------------------------------------------------------------------ */
/* ARCHIVED — readiness / learning-journey narrative                    */
/*                                                                     */
/* Retained, not deleted: this repository has no git history to restore */
/* from. Nothing in app/page.tsx imports these, so they cost nothing at */
/* runtime. Their components live in components/_archive/. To bring the */
/* narrative back, re-add the sections to app/page.tsx and restore the  */
/* 'learning' and 'ready' entries in navItems.                          */
/* ------------------------------------------------------------------ */

export const readiness = {
  title: 'Built with production discipline. Ready to learn from people who have gone further.',
  body: [
    'I have shipped systems that work in production. I am not the expert yet, and I would rather say so here than have you discover it in week three.',
    'What I have built shows I can execute: a model served inside a latency budget, infrastructure carrying 500+ daily users on hardware I administered, a platform 60+ engineers chose to work on top of. Those are the constraints I have solved so far.',
    'Callosum works on constraints I have not. Orchestrating heterogeneous accelerators at scale. Evaluating workloads across hardware that fails in genuinely different ways. Optimising against limits I have not personally run into.',
    'That is the appeal rather than the obstacle. I want to contribute from the first week while learning in a room where the expertise runs deeper than mine — I bring execution and measurement discipline, Callosum brings the domain. That trade seems worth making in both directions.',
  ],
  keyPoints: [
    'Contributes from day one: shipping, production debugging, evaluation design',
    'Wants to learn infrastructure, optimisation, and production AI from people who do it daily',
    'Treats every system as a chance to understand a constraint more deeply',
    'Honest about the gaps — solo research is not customer work, and simulation is not hardware',
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Learning journey                                                    */
/* ------------------------------------------------------------------ */

export const learningJourney = {
  title: 'Learning Journey',
  subtitle: 'How I learn, and what each step could not teach me.',
  lede: 'Each phase closes on the thing it failed to teach me. Those gaps are the reason the next phase exists — and the reason for this application.',
  phases: [
    {
      phase: 'Foundations',
      period: '2020–2024 · University',
      focus: 'Fundamentals, and the first systems other people actually depended on.',
      built: [
        'Hostel and attendance systems',
        'IoT sensing pipelines',
        'On-premise university infrastructure',
      ],
      learned:
        'I can take a system from nothing to running, and I understand what scale, reliability, and usability cost once real people are involved.',
      gap: 'The feedback loop was narrow. One stack, one kind of machine, and requirements that arrived as requests rather than as pressure from a market.',
    },
    {
      phase: 'Contriver',
      period: 'October 2024 – August 2025 · Founding team',
      focus: 'First production role, at startup velocity.',
      built: [
        'Internal platform for 60+ engineers',
        'Inference path rebuilt: 450–500ms to sub-100ms',
        'CI/CD and testing infrastructure',
      ],
      learned:
        'Production is not university with more users. Constraints arrive from people rather than specifications, and the only way to settle an argument about performance is to measure it.',
      gap: 'Still a friendly environment — one accelerator, one stack. I have never had to debug a problem that moved between fundamentally different hardware.',
    },
    {
      phase: 'Research',
      period: 'September 2025 – present · MSc, University of York',
      focus: 'What actually constrains a learning system, and how you would know.',
      built: [
        'Controlled evaluation methodology',
        'Multi-seed statistical pipeline',
        'BC / DAgger / diversity-selection comparison',
      ],
      learned:
        'Rigour is what separates a result from a story. Training setup outranked sample size, and the diversity heuristic I expected to win produced nothing at all.',
      gap: 'Simulation only. Pendulum and FetchReach are not hardware, and a finding that holds in a gym environment has not yet earned the right to be called a production result.',
    },
    {
      phase: 'Callosum',
      period: 'Next',
      future: true,
      focus: 'Production AI infrastructure, across hardware that does not agree with itself.',
      goal: 'Orchestrate heterogeneous compute, learn the constraints that only appear on real silicon, and optimise across systems that fail in different ways.',
      willLearn: [
        'Production constraints at Callosum’s scale, rather than in simulation',
        'Orchestrating heterogeneous accelerators — GPUs, TPUs, and custom silicon with genuinely different envelopes',
        'Evaluating the same model across radically different hardware',
        'Customer problems as they arrive at the infrastructure layer',
        'Designing for the next several years of a system, not only its current state',
      ],
      willContribute: [
        {
          when: 'Day one',
          what: 'Evaluation design. I know how to build a harness whose numbers survive scrutiny.',
        },
        {
          when: 'Week one',
          what: 'Shipping discipline. I have shipped systems that stayed shipped.',
        },
        {
          when: 'Month one',
          what: 'Production debugging. I have found and removed real bottlenecks under load.',
        },
        {
          when: 'Ongoing',
          what: 'Questions. Every design decision here is something I do not yet know.',
        },
      ],
    },
  ] as readonly JourneyPhase[],
  mindset: {
    title: 'How I approach learning',
    principles: [
      {
        principle: 'Learn by building',
        description:
          'Theory on its own stays inert. I understand something once I have implemented it, measured it, and been wrong about it at least once.',
      },
      {
        principle: 'Measure, do not assume',
        description:
          'My own research talked me out of a hypothesis I was confident in. Multiple seeds, error bars, and honest reporting are the cheapest defence against believing yourself.',
      },
      {
        principle: 'Understand the constraint',
        description:
          'Production problems are constraint problems. I learn a system by finding what actually binds it, which is rarely the component I suspected.',
      },
      {
        principle: 'Ask why it is not the other way',
        description:
          'I ask "why?" more than is comfortable. Knowing how a system works matters less than knowing which alternatives were rejected, and for what reason.',
      },
    ],
  },
} as const;

/* ------------------------------------------------------------------ */
/* Gaps I know I have                                                  */
/* ------------------------------------------------------------------ */

export const readyToLearn = {
  title: 'What I am ready to learn at Callosum',
  subtitle: 'Gaps I know I have. Problems I would like to work on.',
  gaps: [
    {
      gap: 'Heterogeneous compute orchestration',
      need: 'How to optimise across GPUs, TPUs, and custom silicon when each has a different performance envelope, failure mode, and cost curve.',
      why: 'This is the problem Callosum exists to solve. I would be learning it from the people furthest into it.',
    },
    {
      gap: 'Production AI infrastructure at scale',
      need: 'Real hardware constraints rather than simulated ones, and evaluation that holds up across diverse models and systems.',
      why: 'My research stopped at the simulator. Real workloads are where those methods would finally get tested.',
    },
    {
      gap: 'Customer-facing problem solving',
      need: 'Turning an ambiguous customer problem into technical requirements and then into a shipped system — as practice, not as theory.',
      why: 'The platform work is the closest I have come. Working with external customers is a different discipline, and I want to learn it properly.',
    },
    {
      gap: 'Long-horizon system design',
      need: 'Building for how a system will evolve, not only for what it has to do this quarter.',
      why: 'Infrastructure meant to carry the next several years of AI workloads demands a longer view than anything I have owned so far.',
    },
  ],
  commitment:
    'I am not looking for a comfortable role. I am looking for one where contributing and learning are the same activity — where every constraint I learn to optimise and every bottleneck I remove makes me more useful to the next one.',
} as const;

/* ------------------------------------------------------------------ */
/* Timeline                                                            */
/* ------------------------------------------------------------------ */

export const timeline: TimelineItem[] = [
  {
    period: 'Early',
    title: 'Building things that had to work for other people',
    org: 'Undergraduate · project work',
    text: 'The transition from code that runs on my machine to code other people depend on. Twenty-five repositories tracking that progression.',
    tags: ['Full-stack', 'Shipping habit'],
  },
  {
    period: 'University deployment',
    title: 'Enterprise systems in continuous operation',
    org: 'On-premise university infrastructure',
    text: 'Attendance and hostel management live for 500+ daily users, with server administration, MySQL tuning, and disaster recovery all mine to own.',
    tags: ['500+ users', 'On-premise ops', 'Transactions'],
  },
  {
    period: 'Research & field work',
    title: 'IoT sensing and CNN inference in production',
    org: 'Applied research → deployment',
    text: 'Published research and government-funded work, with the potato disease detection system taken from model to sub-100ms production API and the NPK sensing pipeline deployed to the field.',
    tags: ['Published research', 'Government funding', 'Sub-100ms'],
    highlight: true,
  },
  {
    period: 'Contriver',
    title: 'Founding-team role, internal developer platform',
    org: 'Contriver',
    text: 'Built the platform and methodology that 60+ engineers worked on top of — infrastructure as leadership.',
    tags: ['60+ engineers', 'Founder mentality', 'Platform'],
  },
  {
    period: 'September 2025 → present',
    title: 'MSc Advanced Computer Science (Artificial Intelligence)',
    org: 'University of York',
    text: 'Formalising the theory behind the systems intuition, with a particular focus on evaluation methodology and where stochastic results go quietly wrong — including a controlled study of demonstration efficiency in imitation learning that reports its own null findings.',
    tags: ['MSc AI', 'University of York', 'Evaluation rigour', 'Imitation learning'],
    highlight: true,
  },
];

/* ------------------------------------------------------------------ */
/* GitHub                                                              */
/* ------------------------------------------------------------------ */

export const repos: Repo[] = [
  {
    name: 'Machine-learning-for-robotic-grasping',
    description:
      'Demonstration efficiency in imitation learning: fixed-budget experiments across 3–10 seeds comparing BC, DAgger, and diversity-based selection, with OFAT sensitivity analysis.',
    tags: ['PyTorch', 'Gymnasium', 'DAgger', 'Multi-seed'],
    featured: true,
    url: 'https://github.com/NithishSagar/Machine-learning-for-robotic-grasping-fundamentals-and-research-gaps',
  },
  {
    name: 'Hostel-Management-System',
    description:
      'Contended-resource allocation with transactional guarantees and role-based access, deployed on university on-premise servers.',
    tags: ['MySQL', 'Transactions', 'RBAC'],
    featured: true,
  },
  {
    name: 'Student-Attendance-System',
    description:
      'High-concurrency write path for staff marking attendance in the same narrow daily window, with reporting reads tuned for the queries that were actually slow.',
    tags: ['MySQL', 'Concurrency', 'Reporting'],
    featured: true,
  },
  {
    name: 'Potato-Disease-Classification',
    description:
      'CNN classification served behind a latency budget — module-level init, request batching, GPU preprocessing.',
    tags: ['Python', 'CNN', 'Flask', 'AWS'],
    featured: true,
  },
  {
    name: 'IoT-NPK-Monitoring',
    description:
      'Soil nutrient sensing pipeline from hardware through MQTT to a live dashboard, with anomaly detection on the stream.',
    tags: ['MQTT', 'Node.js', 'MongoDB'],
    featured: true,
  },
  {
    name: 'Portfolio',
    description: 'Personal portfolio site — the front door for everything above.',
    tags: ['React', 'Next.js', 'Vercel'],
  },
];

export const githubStats = [
  { label: 'public repositories', value: 25, suffix: '' },
  { label: 'production systems shipped', value: 4, suffix: '' },
  { label: 'engineers served by platform work', value: 60, suffix: '+' },
  { label: 'daily users across deployments', value: 500, suffix: '+' },
];

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'role', label: 'The Role' },
  { id: 'work', label: 'My Work' },
  { id: 'mapping', label: 'The Mapping' },
  { id: 'perspective', label: 'Perspective' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
] as const;


/* ------------------------------------------------------------------ */
/* Section headings                                                    */
/* ------------------------------------------------------------------ */

const sections: SectionsCopy = {
  about: {
    eyebrow: 'About',
    title: 'Constraints to be mapped, measured, and',
    titleAccent: 'optimised — not researched.',
  },
  role: {
    eyebrow: 'The Role',
    title: 'What Callosum is asking for — and how I read each line',
    titleAccent: 'of it.',
  },
  work: {
    eyebrow: 'My Work',
    title: 'Four systems that had to work when I was not watching — and one',
    titleAccent: 'study that questioned itself.',
    lede:
      'Each card opens onto the full story: the constraint that bound the system, the decisions that fit inside it, the measured result, and the part that generalises. The research card opens onto figures instead.',
  },
  mapping: {
    eyebrow: 'The Mapping',
    title: 'Every requirement, answered by something I',
    titleAccent: 'actually shipped.',
    lede:
      'Left: what the role asks for, in the order the description states it. Right: the evidence, in the order I would argue it. Hover a row to trace the connection; click to filter the whole page.',
  },
  perspective: {
    eyebrow: 'My Perspective',
    title: 'Why this matters:',
  },
  skills: {
    eyebrow: 'Skills',
    title: 'The tools, and where each one was',
    titleAccent: 'earned.',
    lede:
      'Depth here means production use under load, not tutorial completion. Where a skill was proven on a specific system, it says so.',
  },
  journey: {
    eyebrow: 'Journey',
    title: 'From projects that had to work, to platforms other',
    titleAccent: 'people work on.',
    lede:
      'The through-line is scope: each step handed me a wider blast radius, and the discipline had to grow to match it.',
  },
  code: {
    eyebrow: 'Code',
    title: '25 repositories tracking the same',
    titleAccent: 'progression.',
    lede:
      'College projects through to production systems. The interesting part is not any single repository — it is that the shipping never stopped.',
  },
  contact: {
    eyebrow: 'Let’s talk',
    title: 'Let’s build the next generation of',
    titleAccent: 'AI infrastructure.',
  },
};

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

const callosum: CompanyConfig = {
  key: 'callosum',
  companyName: 'Callosum Applied AI',
  companyShort: 'Callosum',
  contactPitch:
    'I have spent four systems learning that the constraint you did not model is the one that decides your latency. I would like to spend the next few years applying that to heterogeneous compute, at Callosum.',
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
  theme: 'ink',
};

export default callosum;
