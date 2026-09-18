import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  CirclePlay,
  Mic2,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Button, Card } from "../components/ui";
import usePageMeta from "../lib/usePageMeta";

const capabilities = [
  {
    icon: Target,
    title: "Role preparation",
    text: "Role-specific questions, topics, cases, and follow-ups that scale from first interview to leadership conversation.",
  },
  {
    icon: Building2,
    title: "Company preparation",
    text: "A careful research workspace that separates reported evidence, role relevance, recommendations, and practice content.",
  },
  {
    icon: Mic2,
    title: "Adaptive mocks",
    text: "Practice structured HR, technical, project, and managerial interviews with feedback that helps you tighten the next answer.",
  },
  {
    icon: BookOpenCheck,
    title: "Answer coaching",
    text: "See what to say, why it matters, what to avoid, and the question an interviewer may ask next.",
  },
];

export default function LandingPage() {
  usePageMeta(
    "PrepKite — Prepare Smarter for Every Interview",
    "Prepare for your role, company, skills, and real interview situations with structured coaching, practice, and readiness tracking.",
  );
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Link to="/" className="focus-ring inline-flex items-center gap-2 rounded-lg">
          <span className="grid h-9 w-9 rotate-45 place-items-center rounded-xl bg-primary shadow-sm"><Sparkles size={16} className="-rotate-45 text-primary-foreground" /></span>
          <span><span className="block text-lg font-extrabold tracking-tight text-foreground">PrepKite</span><span className="block text-[8px] font-black uppercase tracking-[.18em] text-secondary">Interview Intelligence</span></span>
        </Link>
        <nav aria-label="Landing navigation" className="hidden items-center gap-8 md:flex">
          <a
            className="focus-ring rounded text-sm font-bold text-muted-foreground hover:text-foreground"
            href="#how-it-works"
          >
            How it works
          </a>
          <a
            className="focus-ring rounded text-sm font-bold text-muted-foreground hover:text-foreground"
            href="#preparation"
          >
            What you get
          </a>
          <Link
            className="focus-ring rounded text-sm font-bold text-muted-foreground hover:text-foreground"
            to="/questions"
          >
            Explore questions
          </Link>
        </nav>
        <Link
          to="/auth"
          className="focus-ring rounded-lg px-3 py-2 text-sm font-extrabold text-primary hover:bg-accent"
        >
          Sign in
        </Link>
      </header>

      <main>
        <section className="surface-grid relative overflow-hidden border-y border-border">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.08fr_.92fr] lg:px-8">
            <div className="relative z-10 max-w-2xl">
              <Badge tone="primary">
                <Sparkles size={14} className="mr-1" /> Your interview preparation system
              </Badge>
              <h1 className="display-font mt-6 text-5xl font-semibold leading-[0.98] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Prepare smarter.
                <br />
                Interview better.
                <br />
                <em className="text-secondary">Get hired.</em>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                Prepare for your role, company, skills, and real interview situations in one place. Build sharper
                answers, practice under pressure, and turn feedback into a clear next step.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button onClick={() => navigate("/onboarding")} className="min-w-44">
                  Start Preparing <ArrowRight size={17} />
                </Button>
                <Button onClick={() => navigate("/challenges")} variant="outline" className="min-w-44">
                  <CirclePlay size={17} /> Try Interview Challenge
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm font-bold text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-secondary" /> Role-aligned practice
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-secondary" /> Honest readiness signals
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-secondary" /> Progress you can use
                </span>
              </div>
            </div>
            <div className="relative z-10 self-center rounded-2xl border border-border bg-card p-5 shadow-xl sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="section-kicker">Readiness snapshot</p>
                  <p className="mt-1 text-lg font-extrabold text-card-foreground">Your next best move</p>
                </div>
                <div className="grid h-14 w-14 place-items-center rounded-full border-4 border-secondary bg-success text-base font-extrabold text-success-foreground">
                  74
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {[
                  ["Project storytelling", "Strong", "bg-success"],
                  ["Structured communication", "Build next", "bg-warning"],
                  ["SQL fundamentals", "Build next", "bg-warning"],
                ].map(([label, status, tone]) => (
                  <div key={label} className="rounded-xl border border-border p-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-extrabold text-card-foreground">{label}</span>
                      <span className={`${tone} rounded-full px-2.5 py-1 text-xs font-bold text-card-foreground`}>
                        {status}
                      </span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${label === "Project storytelling" ? "w-[82%] bg-secondary" : label === "Structured communication" ? "w-[63%] bg-warning-foreground" : "w-[56%] bg-warning-foreground"}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl bg-primary p-4 text-primary-foreground">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary-foreground/70">
                  Today’s practice
                </p>
                <p className="mt-1 text-sm font-bold">Turn one project challenge into a 90-second story.</p>
                <Link
                  to="/practice"
                  className="focus-ring mt-3 inline-flex text-sm font-extrabold underline underline-offset-4"
                >
                  Open mission
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="preparation" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="section-kicker">Built for serious preparation</p>
            <h2 className="display-font mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Everything connects to the interview in front of you.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              PrepKite moves beyond generic question lists. Your role, target company, experience, skills, and
              projects shape a focused preparation path.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {capabilities.map(({ icon: Icon, title, text }) => (
              <Card key={title} className="group transition duration-200 hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-secondary">
                  <Icon size={20} />
                </div>
                <h3 className="mt-5 text-lg font-extrabold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </Card>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="border-y border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div className="max-w-xl">
                <p className="section-kicker">A practical loop</p>
                <h2 className="display-font mt-3 text-4xl font-semibold text-foreground">
                  Prepare, practice, reflect, repeat.
                </h2>
              </div>
              <Link
                to="/onboarding"
                className="focus-ring inline-flex items-center gap-2 text-sm font-extrabold text-secondary hover:underline"
              >
                Build your preparation path <ArrowRight size={16} />
              </Link>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-4">
              {[
                ["01", "Set the target", "Define your role, company, skills, and project context."],
                ["02", "Build answers", "Learn clear structures and prepare evidence that sounds like you."],
                ["03", "Practice live", "Use focused drills and adaptive mock prompts to build delivery."],
                ["04", "Improve deliberately", "Use readiness signals, weak areas, and a day-by-day plan."],
              ].map(([number, title, text]) => (
                <div key={number} className="border-t-2 border-secondary pt-4">
                  <p className="text-xs font-extrabold tracking-[0.14em] text-secondary">{number}</p>
                  <h3 className="mt-3 text-base font-extrabold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="overflow-hidden bg-primary p-8 text-primary-foreground sm:p-10">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="section-kicker !text-primary-foreground/70">Start where you are</p>
                <h2 className="display-font mt-3 text-4xl font-semibold">
                  A more confident interview starts with one focused session.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-primary-foreground/75">
                  Browse practical questions now, or create a secure workspace to save your profile, practice history,
                  and improvement plan.
                </p>
              </div>
              <Button variant="secondary" onClick={() => navigate("/onboarding")}>
                Create your path <ArrowRight size={17} />
              </Button>
            </div>
          </Card>
        </section>
      </main>
      <footer className="border-t border-border px-4 py-8 text-center text-sm text-muted-foreground">
        PrepKite — role-led interview preparation with transparent practice guidance.
      </footer>
    </div>
  );
}
