export type Question = {
  id: string;
  title: string;
  prompt: string;
  category: string;
  difficulty: "Foundation" | "Intermediate" | "Advanced";
  roles: string[];
  round: string;
  keyPoints: string[];
  answer: string;
  experiencedAnswer: string;
  examples: string[];
  mistakes: string[];
  followUps: string[];
};

export const roleGroups = [
  {
    group: "Technology",
    roles: [
      "Software Engineer",
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Data Analyst",
      "QA Engineer",
      "Cybersecurity Analyst",
    ],
  },
  {
    group: "Finance",
    roles: ["Finance Analyst", "Accountant", "Investment Analyst", "Banking Associate", "Credit Analyst"],
  },
  {
    group: "Business",
    roles: ["Business Analyst", "Operations Associate", "Product Manager", "Management Consultant"],
  },
  {
    group: "Other",
    roles: [
      "HR Specialist",
      "Marketing Associate",
      "Sales Executive",
      "Customer Support Specialist",
      "Supply Chain Analyst",
      "Logistics Coordinator",
    ],
  },
];

export const readiness = [
  { label: "Technical skills", value: 76, note: "Strong foundation; add deliberate SQL practice." },
  { label: "Communication", value: 68, note: "Use sharper opening statements and outcomes." },
  { label: "HR & behavioral", value: 74, note: "Your examples need clearer reflection points." },
  { label: "Problem solving", value: 71, note: "Narrate trade-offs before reaching the answer." },
  { label: "Role knowledge", value: 82, note: "Keep connecting concepts to customer impact." },
];

export const questions: Question[] = [
  {
    id: "star-impact",
    title: "Tell me about a time you improved a process.",
    prompt: "Choose one situation where you spotted friction, took ownership, and created a measurable improvement.",
    category: "Behavioral",
    difficulty: "Foundation",
    roles: ["All roles"],
    round: "HR / Behavioral",
    keyPoints: [
      "Set the context in one sentence",
      "Name your personal contribution",
      "Quantify the result",
      "Share what you learned",
    ],
    answer:
      "In my last project, our team was losing time consolidating weekly updates from several spreadsheets. I mapped the handoff, created a standardized tracker, and wrote a simple validation checklist. The reporting cycle became more consistent and the team spent less time resolving version issues. It taught me to look for small process changes that make collaboration easier.",
    experiencedAnswer:
      "When I noticed recurring reporting errors across teams, I interviewed the people doing the work, identified inconsistent ownership and inputs, then introduced a shared operating rhythm with validation rules. I tracked adoption and adjusted the workflow after feedback. The change reduced rework and gave leaders a clearer view of the work.",
    examples: ["Automating a recurring report", "Clarifying a team handoff", "Reducing a customer response bottleneck"],
    mistakes: [
      "Giving a team-only story with no personal ownership",
      "Listing tasks without explaining the result",
      "Skipping the learning or trade-off",
    ],
    followUps: [
      "What resistance did you encounter?",
      "How did you measure the impact?",
      "What would you improve next time?",
    ],
  },
  {
    id: "sql-revenue",
    title: "How would you investigate a sudden revenue drop?",
    prompt:
      "Explain the analytical path before writing a query. State assumptions, segmentation, and how you would validate a finding.",
    category: "SQL & Analytics",
    difficulty: "Intermediate",
    roles: ["Data Analyst", "Business Analyst", "Finance Analyst", "Product Manager"],
    round: "Technical",
    keyPoints: [
      "Validate the metric definition",
      "Segment by time, product, channel, and region",
      "Check data freshness and instrumentation",
      "Turn the finding into a business next step",
    ],
    answer:
      "I would first confirm that the revenue definition and data pipeline have not changed. Then I would compare the drop across product lines, customer segments, regions, and acquisition channels to locate where it is concentrated. I would validate the result against orders and payment data, then partner with the relevant team to test the most likely cause and track recovery.",
    experiencedAnswer:
      "I would begin with a metric contract check: gross versus net revenue, currency conversion, refunds, and reporting cut-off. Once the data is trusted, I would decompose the change into volume, conversion, average order value, and retention, then isolate the biggest contributors. I would communicate confidence levels and recommend the smallest set of actions that can be measured quickly.",
    examples: ["A checkout conversion decline", "A regional campaign ending", "A delayed billing feed"],
    mistakes: [
      "Jumping straight into SQL without defining the metric",
      "Assuming causation from one segment",
      "Ignoring data-quality checks",
    ],
    followUps: [
      "Which table would you inspect first?",
      "How would you avoid double counting?",
      "What would you show an executive?",
    ],
  },
  {
    id: "project-architecture",
    title: "Why did you choose this technology for your project?",
    prompt:
      "Describe the decision criteria, alternatives you considered, trade-offs, and what you would change with more time.",
    category: "Project",
    difficulty: "Intermediate",
    roles: ["All roles"],
    round: "Project / Technical",
    keyPoints: [
      "Start with the project requirement",
      "Explain your selection criteria",
      "Acknowledge a trade-off",
      "Show ownership of the decision",
    ],
    answer:
      "I chose the tool because it matched the project constraints: the team needed to move quickly, keep the solution maintainable, and work with the skills we already had. I compared it with a lighter alternative, but selected the option with better community support and room to extend. The trade-off was more setup time, which I would reduce with a reusable starter template next time.",
    experiencedAnswer:
      "I framed the decision around delivery risk, team capability, integration needs, and total maintenance cost. We deliberately chose a mature option over a newer one because reliability and hiring support mattered more than novelty. I documented the decision and the exit criteria so the choice could be revisited as the product scale changed.",
    examples: ["Selecting a database", "Choosing a dashboarding tool", "Using a project-management workflow"],
    mistakes: [
      "Saying only that a tool is popular",
      "Pretending there were no trade-offs",
      "Claiming ownership for a group decision without context",
    ],
    followUps: [
      "What alternative did you reject and why?",
      "How did the choice affect delivery?",
      "What would trigger a change?",
    ],
  },
  {
    id: "stakeholder-priorities",
    title: "How do you handle conflicting stakeholder priorities?",
    prompt:
      "Walk through a real or realistic example that demonstrates alignment, evidence, and a clear decision process.",
    category: "Communication",
    difficulty: "Advanced",
    roles: ["Business Analyst", "Product Manager", "Operations Associate", "Management Consultant", "HR Specialist"],
    round: "Managerial",
    keyPoints: [
      "Make goals visible",
      "Use evidence and impact",
      "Clarify decision ownership",
      "Communicate the decision and next step",
    ],
    answer:
      "I start by clarifying the outcome each stakeholder is trying to protect. I bring the priorities into one view, compare their customer and business impact, and identify dependencies or risks. If a decision is needed, I confirm the owner, document the rationale, and communicate the next step so the team can move forward without ambiguity.",
    experiencedAnswer:
      "I separate positions from underlying objectives, then use a transparent prioritization framework tied to customer impact, risk, and capacity. I make trade-offs explicit rather than trying to satisfy every request. Once an accountable owner decides, I capture the rationale, success metric, and review date to preserve trust even when the answer is no.",
    examples: [
      "Two leaders competing for the same engineering capacity",
      "Marketing and sales needing different reporting views",
      "Operations requests conflicting with customer commitments",
    ],
    mistakes: [
      "Calling it compromise without a decision method",
      "Avoiding the word no",
      "Escalating before doing the alignment work",
    ],
    followUps: [
      "What if the most senior stakeholder disagrees?",
      "How do you prevent the conflict from returning?",
      "How would you communicate a deprioritization?",
    ],
  },
];

export const questionFilters = ["All categories", "HR", "Technical", "Finance", "Coding", "SQL", "Excel", "Business", "Project", "Behavioral"];

export const dailyMissions = [
  {
    id: "mission-hr",
    title: "Refine one behavioral story",
    detail: "Practice a STAR answer with a measurable outcome.",
    type: "Behavioral",
    xp: 20,
  },
  {
    id: "mission-sql",
    title: "Solve a role-relevant prompt",
    detail: "Narrate your approach before checking the answer.",
    type: "Technical",
    xp: 25,
  },
  {
    id: "mission-project",
    title: "Prepare one project follow-up",
    detail: "Explain a trade-off and what you learned.",
    type: "Project",
    xp: 20,
  },
  {
    id: "mission-voice",
    title: "Rehearse a 60-second introduction",
    detail: "Use the structure guide and self-review for filler words.",
    type: "Communication",
    xp: 15,
  },
];

export const planDays = [
  {
    day: "Day 1",
    focus: "Core story bank",
    tasks: ["Complete your introduction", "Practice two STAR stories", "Review common mistakes"],
  },
  {
    day: "Day 2",
    focus: "Technical confidence",
    tasks: ["Solve a role prompt", "Explain your approach aloud", "Write one follow-up question"],
  },
  {
    day: "Day 3",
    focus: "Project depth",
    tasks: ["Map project decisions", "Prepare challenge-and-result stories", "Review tool trade-offs"],
  },
  {
    day: "Day 4",
    focus: "Company alignment",
    tasks: ["Research a trusted company source", "Connect your skills to the role", "Build three questions to ask"],
  },
  {
    day: "Day 5",
    focus: "Mock and reflect",
    tasks: ["Take an adaptive mock", "Review weak moments", "Retry one weak category"],
  },
];
