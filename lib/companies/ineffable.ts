/**
 * Ineffable Intelligence — Member of Technical Staff.
 *
 * Selected when NEXT_PUBLIC_COMPANY=ineffable. Same components, same filter
 * system, different argument: RL research methodology and the infrastructure
 * that makes learning systems measurable at scale.
 */
import type {
  CompanyConfig,
  MappingRow,
  Project,
  Repo,
  Requirement,
  SkillGroup,
  TimelineItem,
} from './types';

/* ------------------------------------------------------------------ */
/* Identity                                                            */
/* ------------------------------------------------------------------ */

const profile = {
  name: 'Nithish Sagar',
  target: 'Ineffable Intelligence',
  role: 'Member of Technical Staff',
  tagline:
    'Infrastructure Engineer specialised in reinforcement learning systems and production-scale evaluation harnesses.',
  pitch:
    'Most engineers chase language models. I build the systems where RL agents discover knowledge from experience. Ineffable is making first contact with superintelligence through reinforcement learning — infrastructure that scales learning, not data. Explore the research and production work below to see whether my systems thinking matches the frontier problems you are solving.',
  email: 'nsd8681@gmail.com',
  github: 'https://github.com/NithishSagar',
  portfolio: 'https://nithish-portfolio-iota.vercel.app/',
  linkedin: 'https://www.linkedin.com/in/nithish-sagar-d-458141213/',
  location: 'London, UK',
  availability: 'September 2025',
  education: {
    degree: 'MSc Advanced Computer Science (Artificial Intelligence)',
    school: 'University of York',
    start: 'September 2025',
  },
  summary: [
    'Most engineers treat reinforcement learning as research. I treat it as an engineering constraint to be mapped, measured, and optimised. Whether that means designing evaluation harnesses with multiple seeds and statistical error analysis, or driving inference latency from 500ms to sub-100ms under concurrent load, the focus is singular: building infrastructure that makes learning systems reliable at production scale.',
    'Ineffable is building the frontier research infrastructure for superintelligence through reinforcement learning. The code and methodology below prove one thing — that I have the systems thinking and evaluation rigour to accelerate your research infrastructure from day one.',
    'I do not chase incremental improvements. I chase constraint boundaries. That is what frontier RL research actually requires.',
  ],
  repoCount: 25,
  coreMetrics: [
    {
      label: 'Seeds per condition',
      value: 10,
      prefix: 'up to ',
      context: 'error bars on every reported result',
    },
    {
      label: 'Inference latency',
      value: 100,
      prefix: '<',
      suffix: 'ms',
      from: 500,
      fromSuffix: 'ms',
      context: 'p95 under concurrent load',
    },
    { label: 'Production scale', value: 500, suffix: '+', context: 'daily active users' },
    { label: 'Platform reach', value: 60, suffix: '+', context: 'engineers on internal tooling' },
  ],
};

/* ------------------------------------------------------------------ */
/* Requirements — in the order the role states them                    */
/* ------------------------------------------------------------------ */

const requirements: Requirement[] = [
  {
    id: 'rl-research',
    short: 'RL research',
    title: 'RL research & methodology',
    jd: 'Deep understanding of reinforcement learning algorithms and how they are evaluated.',
    reading:
      'Knowing the algorithms is table stakes. Knowing which of your results are artefacts of the harness is the job.',
    icon: 'rl',
  },
  {
    id: 'evaluation-rigor',
    short: 'Evaluation rigour',
    title: 'Evaluation rigour & statistical methodology',
    jd: 'Multi-seed experiments, error bars, controlled variable isolation.',
    reading:
      'Most improvements look real in one run. Very few survive a second look under fixed conditions.',
    icon: 'stats',
  },
  {
    id: 'infrastructure',
    short: 'Infrastructure',
    title: 'Infrastructure at scale',
    jd: 'Systems that serve real load and orchestrate real teams without architectural rewrites.',
    reading:
      'Research velocity is bounded by the infrastructure underneath it. Nobody notices that layer until it is the bottleneck.',
    icon: 'infra',
  },
  {
    id: 'systems-thinking',
    short: 'Systems thinking',
    title: 'Systems thinking & constraint mapping',
    jd: 'Identify real bottlenecks by measurement rather than assumption.',
    reading:
      'The component you suspect is almost never the one that binds. Profiling settles it; intuition does not.',
    icon: 'systems',
  },
  {
    id: 'production',
    short: 'Production',
    title: 'Production engineering & reliability',
    jd: 'Ship systems that stay shipped, for users who depend on them.',
    reading:
      'Production is where your assumptions get audited by reality, on a schedule you do not control.',
    icon: 'production',
  },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

const projects: Project[] = [
  {
    id: 'grasping-research',
    index: 1,
    kind: 'research',
    status: 'Final report in progress',
    title: 'Demonstration Efficiency in Imitation Learning',
    kicker: 'Rigorous statistical methodology for RL systems',
    period: 'Research · Robot manipulation',
    lens: 'RL research',
    summary:
      'A controlled study of sample efficiency in imitation learning: how many demonstrations an agent actually needs, whether choosing better demonstrations helps, and which algorithm makes the most of a small dataset.',
    problem:
      'How few demonstrations suffice for imitation learning? Does demonstration selection matter, or is representative coverage enough? Which algorithm is most sample-efficient under a realistic compute budget? None of these questions survive a single-run experiment — answering them honestly means holding the gradient-step budget fixed across every condition, varying only what you claim to be varying, and repeating enough times that the error bars mean something.',
    solution: [
      'Controlled experimental harness: the gradient-step budget stayed fixed across every condition so demonstration count was the only variable moving. Otherwise "more demonstrations help" is indistinguishable from "more demonstrations bought more training".',
      'Multi-seed evaluation: every condition repeated across 3–10 random seeds with error bars on all results. Variance in this regime is wide enough that one run will support whichever conclusion you were hoping for.',
      'Algorithm comparison: behavioural cloning, DAgger, greedy diversity-based selection, and a random-selection baseline, all under identical constraints.',
      'Sensitivity analysis: per-phase breakdown to locate where performance actually breaks, and one-factor-at-a-time sweeps to rank what genuinely drives the result rather than what seemed likely to.',
      'Two environments: Pendulum-v1 for development, then FetchReach-v2 to check whether the findings transferred to a robot reaching task.',
    ],
    results: [
      'DAgger reaches expert-level performance from a single seed demonstration plus 6,000 expert queries — −163.2 return at 100% success against an expert baseline of −166.3. Roughly 15× more sample-efficient than behavioural cloning in the low-data regime.',
      'Behavioural cloning plateaus at −544.5 even at 50 demonstrations, and the gap to expert never closes. The algorithm is the constraint, not the data.',
      'Greedy farthest-point demonstration selection performed no better than random selection on either task — a null result, reported as one.',
      'Gradient steps (swing 1062), learning rate (996), and batch size (770) each outrank demonstration count (584). Optimisation setup matters roughly 1.8× more than sample size.',
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
    requirementIds: ['rl-research', 'evaluation-rigor', 'systems-thinking'],
    architecture: [
      'Expert policy (SAC)',
      'Demonstration sampling',
      'BC / DAgger training',
      'Fixed gradient budget',
      'Multi-seed evaluation',
    ],
    link: {
      label: 'Research repository on GitHub',
      href: 'https://github.com/NithishSagar/Machine-learning-for-robotic-grasping-fundamentals-and-research-gaps',
    },
    whyItMatters: [
      'Evaluation rigour is the foundation frontier RL research is built on — multi-seed, error bars, controlled conditions.',
      'Isolating what actually constrains a learning system is the same skill whether the variable is demonstration count or accelerator choice.',
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
  {
    id: 'inference',
    index: 2,
    title: 'CNN Inference Optimisation: 450ms → sub-100ms',
    kicker: 'Production systems under concurrent load',
    period: 'Production · AWS',
    lens: 'Systems thinking',
    summary:
      'A disease-detection API that field users hit from a phone, on bad connectivity. The model was accurate; the serving path was the problem. Profiling — not intuition — found the real constraint.',
    problem:
      'p95 latency sat at 450–500ms under concurrent load and throughput collapsed past roughly 50 simultaneous users. The obvious hypotheses were model size and GPU memory. Both were wrong. Profiling showed the dominant cost was reloading model weights on every single request, with CPU-side preprocessing serialising in front of an otherwise parallel device, and every request running as its own one-image forward pass.',
    solution: [
      'Profiling over assumption: measured before optimising, which is what moved the hypothesis from "the model is too big" to "the weights are being reloaded per request" — roughly 400ms of the total.',
      'Module-level model initialisation: weights load once per worker process at startup and stay resident, removing the largest fixed cost from the hot path entirely.',
      'Request batching with a short accumulation window: a few milliseconds of queueing bought a dramatically better GPU utilisation curve.',
      'Preprocessing moved onto the GPU: image decode, resize, and normalisation stopped being the CPU-side serialisation point in front of the accelerator.',
    ],
    results: [
      'Sub-100ms p95 end-to-end, down from 450–500ms — a 4.5–5× latency reduction.',
      'Throughput scaled from bottlenecking at ~50 concurrent users to 500+ on the same instance class, a 10× improvement.',
      'Latency stayed flat as concurrency rose rather than degrading linearly.',
      'Deployed on AWS with a Flask serving layer, a React web client, and a mobile client for field use.',
    ],
    learning:
      'The model was never the bottleneck, and I would have optimised the wrong thing if I had trusted the first hypothesis. Almost all of the latency lived at the boundaries — process setup, host-to-device copies, and the decision to treat each request as if it were alone in the world. Measurement is what separates optimising the system from optimising your assumptions about it.',
    metrics: [
      { label: 'p95 latency', value: 100, from: 500, prefix: '<', suffix: 'ms', fromSuffix: 'ms' },
      { label: 'throughput gain', value: 10, suffix: '×' },
      { label: 'concurrent users', value: 500, suffix: '+', from: 50 },
    ],
    stack: ['Python', 'PyTorch', 'Flask', 'Profiling', 'GPU preprocessing', 'Request batching', 'AWS', 'Docker'],
    requirementIds: ['systems-thinking', 'infrastructure', 'production', 'evaluation-rigor'],
    architecture: [
      'Mobile / React client',
      'Flask serving layer',
      'Batching window',
      'GPU preprocess + forward',
      'Response < 100ms',
    ],
    whyItMatters: [
      'Constraint-driven thinking: identify the real bottleneck, do not optimise the one you assumed.',
      'Scaling under concurrent load is the same discipline that multi-GPU RL training demands.',
      'Profiling revealed a truth that contradicted the obvious hypothesis — that is measurement rigour applied to systems rather than to experiments.',
      'Reliability thinking: a system has to survive load, not merely work in isolation.',
    ],
  },
  {
    id: 'platform',
    index: 3,
    title: 'Internal Platform at 60+ Engineer Scale',
    kicker: 'Infrastructure that enables teams',
    period: 'Contriver · Founding-team role',
    lens: 'Infrastructure',
    summary:
      'Nobody assigned this. The team was growing faster than its conventions, so I built the platform that let 60+ engineers move without colliding.',
    problem:
      'Sixty-plus engineers on inconsistent development environments, slow manual deployments, and almost no debugging visibility. Every engineer solved setup, deployment, and project structure from scratch, and each solution was subtly different. The cost stays invisible until onboarding takes a week and no two services can be operated the same way.',
    solution: [
      'Standardised development environment: Docker-based local setup mirroring production, so every engineer ran the same versions on the same OS.',
      'CI/CD automation: testing, linting, and type-checking on every commit, with gated deployments replacing the manual path.',
      'Debugging tooling: centralised logging, metrics, and tracing, so engineers could see what their code actually did in production.',
      'Documentation and practice: methodology and tooling standards that new joiners inherited by default rather than by osmosis.',
    ],
    results: [
      'Platform scaled from one engineer to 60+ without a matching increase in infrastructure complexity.',
      'Automated CI/CD cut deployment time from hours to minutes — roughly 10× faster iteration.',
      'Onboarding time and setup variance both fell substantially.',
      'Practices that outlasted my direct involvement.',
    ],
    learning:
      'Building something only you can operate is a personal achievement. Building something dozens of engineers depend on daily is an engineering one — and it forces you to design for people whose context and constraints are not yours. Research velocity is bounded by exactly this layer.',
    metrics: [
      { label: 'engineers served', value: 60, suffix: '+' },
      { label: 'faster deployments', value: 10, suffix: '×' },
    ],
    stack: ['Docker', 'CI/CD', 'Python', 'AWS', 'Observability', 'Platform architecture'],
    requirementIds: ['infrastructure', 'production', 'systems-thinking'],
    architecture: [
      'Engineer',
      'Standard project scaffold',
      'Shared CI/CD pipeline',
      'Common deploy path',
      'Observable running service',
    ],
    whyItMatters: [
      'RL research at scale needs infrastructure robust enough to stay out of the way.',
      'Sixty-plus engineers means proven ability to scale systems, mentor, and document.',
      'Infrastructure reliability is invisible until it fails. This platform did not.',
      'Infrastructure as a research enabler rather than an afterthought.',
    ],
  },
  {
    id: 'iot',
    index: 4,
    title: 'IoT Soil Monitoring: Heterogeneous Systems',
    kicker: 'Orchestrating hardware that disagrees with itself',
    period: 'Production · Field deployment',
    lens: 'Infrastructure',
    summary:
      'NPK and environmental sensors in the ground, a broker in the middle, and a browser at the end — every layer with its own cadence, failure mode, and idea of what "real time" means.',
    problem:
      'The components had nothing in common. Sensors emit on their own schedule and drop out without warning. MQTT gives you at-most-once unless you pay for more. The database wants batched writes; the browser wants a continuous stream. Gluing these together naively produces a system that looks fine on a desk and falls apart in a field.',
    solution: [
      'Protocol abstraction: a unified ingestion interface over heterogeneous sensors that speak different protocols and emit inconsistent formats.',
      'Resilience patterns: retry with exponential backoff, and local buffering so an offline window degrades one topic instead of stalling the pipeline.',
      'Data aggregation: normalising sensor streams and handling missing or corrupt readings explicitly rather than letting them poison downstream state.',
      'Storage matched to access pattern: time-series collections rather than fighting a general-purpose schema, with live readings pushed to the browser over WebSockets.',
    ],
    results: [
      'Reliable end-to-end pipeline from hardware sensor to live browser dashboard.',
      'Real-time anomaly detection surfacing out-of-range soil conditions as they happen.',
      'Each layer independently debuggable and independently replaceable.',
      'Field-deployed with intermittent connectivity treated as a design assumption, not an incident.',
    ],
    learning:
      'Heterogeneous systems are not hard because the components are complicated. They are hard because each one has a different failure mode, latency profile, and notion of backpressure — and the integration layer is where all of those disagreements have to be resolved explicitly rather than hoped away.',
    metrics: [
      { label: 'system layers integrated', value: 5 },
      { label: 'streaming latency', value: 1, prefix: '<', suffix: 's' },
    ],
    stack: ['Python', 'MQTT', 'Node.js', 'MongoDB time-series', 'WebSockets', 'Docker', 'AWS IoT'],
    requirementIds: ['infrastructure', 'systems-thinking', 'production'],
    architecture: [
      'Sensors (heterogeneous)',
      'MQTT broker',
      'Ingestion + buffering',
      'Time-series storage',
      'WebSocket dashboard',
    ],
    whyItMatters: [
      'RL infrastructure has to handle heterogeneous hardware — GPUs, TPUs, custom silicon — each with its own envelope.',
      'Distributed systems thinking: different nodes, different failure modes, one layer that reconciles them.',
      'I have built systems whose components do not match cleanly, which is the shape of the problem here.',
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Requirement → evidence                                              */
/* ------------------------------------------------------------------ */

// Ordered by how strongly I would argue each one, which differs from the
// requirement order above — so the connectors cross rather than run flat.
const mapping: MappingRow[] = [
  {
    requirementId: 'evaluation-rigor',
    evidenceTitle: 'Controlled experiments with seeds, error bars, and a null result',
    evidence:
      'Fixed gradient-step budget across every condition, repeated over 3–10 seeds, with per-phase and OFAT sensitivity analysis — including a hypothesis I was confident in that the data killed.',
    proof: 'Ranked what actually constrains learning',
    projectId: 'grasping-research',
  },
  {
    requirementId: 'infrastructure',
    evidenceTitle: 'Systems at 500+ concurrent users and 60+ engineers',
    evidence:
      'An inference path rebuilt to hold sub-100ms under load, a developer platform sixty engineers worked on top of, and a field-deployed pipeline spanning five heterogeneous layers.',
    proof: '10× throughput, 10× faster deploys',
    projectId: 'platform',
  },
  {
    requirementId: 'rl-research',
    evidenceTitle: 'Imitation learning studied as an engineering problem',
    evidence:
      'BC, DAgger, and diversity-based selection compared under identical budgets across two environments, with the algorithm — not the dataset — identified as the binding constraint.',
    proof: 'Expert-level from 1 demonstration',
    projectId: 'grasping-research',
  },
  {
    requirementId: 'systems-thinking',
    evidenceTitle: 'Profiling overturned the obvious hypothesis',
    evidence:
      'The suspected bottleneck was model size. Measurement showed it was per-request weight loading, roughly 400ms of the total. Optimising the assumption would have achieved nothing.',
    proof: '450–500ms → sub-100ms p95',
    projectId: 'inference',
  },
  {
    requirementId: 'production',
    evidenceTitle: 'Shipped systems that stayed shipped',
    evidence:
      'Field users on bad connectivity, sixty engineers depending on a platform daily, and sensor pipelines running where connectivity is assumed to fail.',
    proof: 'Reliability under real load',
    projectId: 'inference',
  },
];

/* ------------------------------------------------------------------ */
/* Perspective                                                         */
/* ------------------------------------------------------------------ */

const perspective = {
  title: 'Measurement is the infrastructure',
  lede: 'Learning systems and production systems fail the same way: the constraint you did not model is the one that decides your result.',
  quote:
    'In any stochastic evaluation, every source of variation you claim to measure must actually be allowed to vary across runs.',
  quoteNote:
    'Otherwise you have not measured variance. You have measured your seeding logic — and reported it with confidence intervals.',
  body: [
    {
      heading: 'A number you cannot defend is worse than no number',
      text: 'If your harness pins a seed you intended to vary, your error bars describe the harness rather than the system. The result still looks rigorous. It still gets a plot. And every decision built on top of it inherits the flaw silently. In RL, where run-to-run variance is wide enough to support almost any narrative, this is not a nicety — it is the difference between research and storytelling.',
    },
    {
      heading: 'Few improvements survive statistical scrutiny',
      text: 'My imitation-learning work made this concrete. Holding the gradient-step budget fixed, repeating over 3–10 seeds, and reporting error bars turned up a result I did not want: selecting "better" demonstrations by state-space diversity performed no better than selecting at random. Many improvements look real in one run. Very few survive a second look under controlled conditions.',
    },
    {
      heading: 'The bottleneck is never where you assumed',
      text: 'On the inference API I was certain the model was too large. Profiling said otherwise: roughly 400ms of a 500ms request was reloading weights that had no business being reloaded. Had I optimised my hypothesis instead of measuring the system, I would have shipped a smaller model and the same latency. Constraint mapping is the whole discipline, and measurement is the only instrument for it.',
    },
    {
      heading: 'Why RL infrastructure is the interesting problem',
      text: 'Scaling learning is not scaling data. An RL system is a loop with wildly uneven cost across its stages — environment stepping, rollout collection, gradient updates, evaluation — and each one saturates different hardware. Infrastructure that keeps that loop fast, reproducible, and honestly measured is what makes frontier research go faster, and it is a systems problem before it is a research one.',
    },
  ],
  loop: [
    { step: 'Measure', text: 'Instrument honestly. Verify the harness before the result.' },
    { step: 'Identify constraint', text: 'Find the stage that actually binds — rarely the one you suspect.' },
    { step: 'Design to it', text: 'Let the binding constraint dictate the architecture.' },
    { step: 'Verify under load', text: 'Re-measure in production. It is the only honest benchmark.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

const skillGroups: SkillGroup[] = [
  {
    title: 'Reinforcement Learning',
    icon: 'rl',
    note: 'Studied as an engineering problem, not a literature review.',
    skills: [
      { name: 'Imitation learning (BC, DAgger)', level: 90, note: 'Compared under fixed budgets' },
      { name: 'Evaluation methodology', level: 92 },
      { name: 'Multi-seed validation', level: 90, note: '3–10 seeds, error bars' },
      { name: 'Algorithm comparison & analysis', level: 88 },
      { name: 'Gymnasium / Stable-Baselines3', level: 85 },
    ],
  },
  {
    title: 'Research & Evaluation',
    icon: 'stats',
    note: 'Trusting the numbers is the harder half.',
    skills: [
      { name: 'Experimental design', level: 92, note: 'Controlled variables' },
      { name: 'Statistical analysis', level: 88 },
      { name: 'Rigorous benchmarking', level: 90 },
      { name: 'Parameter sensitivity (OFAT)', level: 85 },
      { name: 'Honest result reporting', level: 95, note: 'Including null findings' },
    ],
  },
  {
    title: 'Infrastructure & Systems',
    icon: 'infra',
    note: 'Where research velocity is actually decided.',
    skills: [
      { name: 'Constraint-driven design', level: 92 },
      { name: 'Inference pipeline optimisation', level: 90, note: 'Batching, GPU preprocessing' },
      { name: 'High-concurrency systems', level: 88, note: '500+ concurrent' },
      { name: 'Distributed / heterogeneous orchestration', level: 82 },
      { name: 'GPU optimisation', level: 82 },
    ],
  },
  {
    title: 'Production Engineering',
    icon: 'production',
    note: 'Invisible until it fails.',
    skills: [
      { name: 'Profiling & bottleneck analysis', level: 92, note: 'Measure, then optimise' },
      { name: 'Docker', level: 88 },
      { name: 'CI/CD automation', level: 88, note: 'Platform for 60+ engineers' },
      { name: 'Reliability & observability', level: 85 },
      { name: 'Platform architecture', level: 85 },
    ],
  },
  {
    title: 'Core Technologies',
    icon: 'backend',
    note: 'Picked up because a system needed them.',
    skills: [
      { name: 'Python', level: 95, note: 'Advanced' },
      { name: 'PyTorch', level: 90 },
      { name: 'AWS / GCP', level: 85 },
      { name: 'MQTT / streaming', level: 85 },
      { name: 'TypeScript / React', level: 85 },
    ],
  },
];

const coreCompetencies = [
  'RL research methodology',
  'Infrastructure engineering',
  'Evaluation rigour & statistics',
  'Constraint-driven thinking',
  'Systems at scale (500+ users, 60+ engineers)',
  'Production reliability',
  'Measurement over assumption',
  'Frontier research mindset',
];

/* ------------------------------------------------------------------ */
/* Timeline                                                            */
/* ------------------------------------------------------------------ */

const timeline: TimelineItem[] = [
  {
    period: 'Early',
    title: 'Systems other people depended on',
    org: 'Undergraduate · project work',
    text: 'The transition from code that runs on my machine to code other people rely on. Twenty-five repositories tracking that progression.',
    tags: ['Full-stack', 'Shipping habit'],
  },
  {
    period: 'Field deployment',
    title: 'IoT sensing pipelines in production',
    org: 'Applied research → deployment',
    text: 'Heterogeneous sensors through MQTT to a live dashboard, built for a field where connectivity is assumed to fail rather than assumed to work.',
    tags: ['MQTT', 'Heterogeneous hardware', 'Resilience'],
  },
  {
    period: 'October 2024 – August 2025',
    title: 'Founding-team role, internal developer platform',
    org: 'Contriver',
    text: 'Built the platform and methodology 60+ engineers worked on top of, and rebuilt a CNN inference path from 450–500ms to sub-100ms under load.',
    tags: ['60+ engineers', 'Sub-100ms', 'CI/CD'],
    highlight: true,
  },
  {
    period: 'September 2025 → present',
    title: 'MSc Advanced Computer Science (Artificial Intelligence)',
    org: 'University of York',
    text: 'Formalising the theory behind the systems intuition, with a focus on evaluation methodology and where stochastic results go quietly wrong — including a controlled imitation-learning study that reports its own null findings.',
    tags: ['MSc AI', 'Imitation learning', 'Evaluation rigour'],
    highlight: true,
  },
];

/* ------------------------------------------------------------------ */
/* GitHub                                                              */
/* ------------------------------------------------------------------ */

const repos: Repo[] = [
  {
    name: 'Machine-learning-for-robotic-grasping',
    description:
      'Imitation learning with rigorous statistical evaluation: fixed-budget experiments across 3–10 seeds comparing BC, DAgger, and diversity-based selection, with OFAT sensitivity analysis.',
    tags: ['PyTorch', 'Gymnasium', 'DAgger', 'Multi-seed'],
    featured: true,
    url: 'https://github.com/NithishSagar/Machine-learning-for-robotic-grasping-fundamentals-and-research-gaps',
  },
  {
    name: 'Potato-Disease-Classification',
    description:
      'CNN inference optimisation and production deployment — module-level init, request batching, GPU preprocessing behind a latency budget.',
    tags: ['Python', 'PyTorch', 'Flask', 'AWS'],
    featured: true,
  },
  {
    name: 'IoT-NPK-Monitoring',
    description:
      'Heterogeneous sensor pipeline from hardware through MQTT to a live dashboard, with anomaly detection on the stream.',
    tags: ['MQTT', 'Node.js', 'MongoDB'],
  },
  {
    name: 'Portfolio',
    description: 'Personal portfolio site — the front door for everything above.',
    tags: ['React', 'Next.js', 'Vercel'],
  },
];

const githubStats = [
  { label: 'public repositories', value: 25 },
  { label: 'systems and studies shipped', value: 4 },
  { label: 'engineers served by platform work', value: 60, suffix: '+' },
  { label: 'concurrent users supported', value: 500, suffix: '+' },
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
/* Config                                                              */
/* ------------------------------------------------------------------ */

const ineffable: CompanyConfig = {
  key: 'ineffable',
  companyName: 'Ineffable Intelligence',
  companyShort: 'Ineffable',
  contactPitch:
    'I have spent four systems learning that the constraint you did not model is the one that decides your result — in a serving path or in a training loop. I would like to spend the next few years applying that to RL infrastructure, at Ineffable.',
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
};

export default ineffable;
