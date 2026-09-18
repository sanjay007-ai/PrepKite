import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  MessageSquareText,
  RotateCcw,
  Sparkles,
  Timer,
  WandSparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge, Button, Card, Field, fieldClass } from "../components/ui";
import { useApp } from "../context/AppContext";
import usePageMeta from "../lib/usePageMeta";
import { generateFinalFeedback, generateFollowUp } from "../lib/coaching";
import { writeLocal } from "../lib/storage";
import { addActivity } from "../lib/platform";

const modes = [
  { id: "hr", title: "HR & behavioral", text: "Practice stories about ownership, collaboration, and learning." },
  { id: "technical", title: "Technical", text: "Explain your approach, reasoning, trade-offs, and edge cases." },
  { id: "project", title: "Project", text: "Defend decisions, contribution, challenge, impact, and reflection." },
  { id: "managerial", title: "Managerial", text: "Handle priorities, stakeholders, outcomes, and judgment calls." },
  {
    id: "company",
    title: "Company-focused",
    text: "Practice role alignment using only verified research you provide.",
  },
  { id: "rapid", title: "Rapid interview", text: "A quick, high-focus answer drill with tighter time limits." },
];

const questionSets: Record<string, string[]> = {
  hr: [
    "Tell me about a time you had to improve a process.",
    "What did you personally do when the first approach did not work?",
    "What would your teammates say about the way you handled the situation?",
  ],
  technical: [
    "How would you investigate a sudden drop in a key product metric?",
    "What data-quality checks would you run before sharing a recommendation?",
    "What trade-off would you explain if speed and accuracy conflicted?",
  ],
  project: [
    "Walk me through a project you are proud of and the problem it solved.",
    "Why did you choose the approach or tools you used?",
    "What was the hardest challenge and how did you know your solution worked?",
  ],
  managerial: [
    "How do you handle competing priorities from important stakeholders?",
    "How would you make the trade-off visible and get to a decision?",
    "How would you communicate a decision that disappoints one stakeholder?",
  ],
  company: [
    "What attracts you to this role and how does your background fit the problem space?",
    "Which role requirement can you support with a concrete example?",
    "What thoughtful question would you ask the team about success in this role?",
  ],
  rapid: [
    "Give me your 60-second introduction.",
    "Share one project outcome you are proud of.",
    "What is one skill you are intentionally improving right now?",
  ],
};

type Exchange = {
  question: string;
  answer: string;
  followUp: string;
  followUpAnswer?: string;
};

function errorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "The AI service could not complete that request. Please try again.";
}

export default function MockInterviewPage() {
  usePageMeta(
    "Adaptive Mock Interviews — PrepKite",
    "Practice AI-powered HR, technical, project, managerial, company-focused, and rapid mock interviews with follow-ups and preparation feedback.",
  );
  const { user, profile, toast } = useApp();
  const navigate = useNavigate();
  const [mode, setMode] = useState("project");
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [awaitingFollowUp, setAwaitingFollowUp] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generationLabel, setGenerationLabel] = useState("");
  const [finalFeedback, setFinalFeedback] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const questions = questionSets[mode];
  const complete = active && index >= questions.length;
  const wordCount = useMemo(
    () =>
      exchanges.reduce(
        (total, item) =>
          total + `${item.answer} ${item.followUpAnswer || ""}`.trim().split(/\s+/).filter(Boolean).length,
        0,
      ),
    [exchanges],
  );

  const start = () => {
    setActive(true);
    setIndex(0);
    setAnswer("");
    setExchanges([]);
    setAwaitingFollowUp(false);
    setFinalFeedback("");
    setGenerationLabel("");
    setError("");
  };

  const requestFollowUp = async (question: string, candidateAnswer: string) => {
    return generateFollowUp(question, candidateAnswer, mode);
  };

  const generateFinalFeedbackForSession = async (session: Exchange[]) => {
    setGenerating(true);
    setGenerationLabel("Creating your final feedback…");
    setError("");
    try {
      const result = await generateFinalFeedback(session);
      if (!result.trim()) throw new Error("The coaching engine returned empty feedback.");
      setFinalFeedback(result);
      toast({ title: "Final feedback ready", description: "Review the strengths and focused next practice steps.", variant: "success" });
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setGenerating(false);
      setGenerationLabel("");
    }
  };

  const submitAnswer = async (event: React.FormEvent) => {
    event.preventDefault();
    if (generating) return;
    const candidateAnswer = answer.trim();
    if (candidateAnswer.split(/\s+/).filter(Boolean).length < 12) {
      setError(
        "Add a little more detail before continuing. Aim for the situation, your action, and the outcome or learning.",
      );
      return;
    }
    setError("");

    if (!awaitingFollowUp) {
      setGenerating(true);
      setGenerationLabel("Creating a focused follow-up…");
      try {
        const followUp = await requestFollowUp(questions[index], candidateAnswer);
        if (!followUp.trim()) throw new Error("The AI service returned an empty follow-up.");
        setExchanges((current) => [...current, { question: questions[index], answer: candidateAnswer, followUp }]);
        setAnswer("");
        setAwaitingFollowUp(true);
      } catch (err) {
        setError(errorMessage(err));
      } finally {
        setGenerating(false);
        setGenerationLabel("");
      }
      return;
    }

    const updated = exchanges.map((item, itemIndex) =>
      itemIndex === exchanges.length - 1 ? { ...item, followUpAnswer: candidateAnswer } : item,
    );
    setExchanges(updated);
    setAnswer("");
    setAwaitingFollowUp(false);
    const nextIndex = index + 1;
    setIndex(nextIndex);
    if (nextIndex >= questions.length) await generateFinalFeedbackForSession(updated);
  };

  const saveSession = async () => {
    if (!user) {
      toast({ title: "Sign in to save this mock", description: "Sign in to keep your private preparation history.", variant: "info" });
      navigate("/auth");
      return;
    }
    if (!finalFeedback) return;
    setSaving(true);
    try {
      const key = `interviewos:mocks:${user.id}`;
      const current = JSON.parse(localStorage.getItem(key) || "[]") as unknown[];
      current.unshift({ id: crypto.randomUUID(), mode, date: new Date().toISOString(), exchanges, feedback: finalFeedback });
      writeLocal(key, current.slice(0, 25));
      addActivity(user.id, { type: "mock", label: `${mode} mock interview completed`, skill: mode === "technical" ? "Core technical" : "Communication", company: profile?.company || undefined, score: Math.min(95, 65 + exchanges.length * 8) });
      toast({ title: "Mock interview saved", description: "Your private preparation history now includes this feedback.", variant: "success" });
    } catch (err) {
      toast({ title: "Mock could not be saved", description: errorMessage(err), variant: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="section-kicker">Guided mock interview practice</p>
          <h1 className="display-font mt-2 text-4xl font-semibold text-foreground sm:text-5xl">
            Practice the follow-up, not just the first answer.
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            PrepKite uses a local coaching engine to ask targeted follow-ups from your answer and create a structured
            preparation review. Feedback is for practice—not a hiring prediction.
          </p>
        </div>
        {active && !complete ? (
          <Badge tone="primary">
            <Timer size={14} className="mr-1" /> Session in progress
          </Badge>
        ) : (
          <Badge tone="muted">AI-guided practice</Badge>
        )}
      </div>

      {!active ? (
        <>
          <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {modes.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setMode(item.id)}
                className={`focus-ring rounded-xl border p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md ${mode === item.id ? "border-secondary bg-accent ring-2 ring-secondary" : "border-border bg-card hover:bg-muted/40"}`}
              >
                <div className="flex items-center justify-between">
                  <Badge tone={mode === item.id ? "primary" : "muted"}>
                    {mode === item.id ? "Selected" : "Practice mode"}
                  </Badge>
                  <MessageSquareText size={20} className="text-secondary" />
                </div>
                <h2 className="mt-4 text-lg font-extrabold text-card-foreground">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
              </button>
            ))}
          </section>
          <Card className="mt-6 flex flex-col justify-between gap-4 bg-primary text-primary-foreground sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.13em] text-primary-foreground/70">
                Selected mode
              </p>
              <h2 className="mt-1 text-xl font-extrabold">{modes.find((item) => item.id === mode)?.title}</h2>
              <p className="mt-2 text-sm text-primary-foreground/75">
                Three questions, AI-generated follow-ups, and a detailed preparation review.
              </p>
            </div>
            <Button variant="secondary" onClick={start}>
              Begin practice <ArrowRight size={17} />
            </Button>
          </Card>
        </>
      ) : complete ? (
        <section className="mt-8 grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
          <Card className="bg-primary text-primary-foreground">
            <p className="text-xs font-extrabold uppercase tracking-[0.13em] text-primary-foreground/70">
              Session summary
            </p>
            <div className="mt-4 flex items-end gap-4">
              <span className="display-font text-7xl font-semibold leading-none">{wordCount}</span>
              <span className="mb-1 text-sm text-primary-foreground/70">
                words practiced
                <br />
                across {exchanges.length} questions
              </span>
            </div>
            <p className="mt-5 max-w-lg text-sm leading-6 text-primary-foreground/75">
              This session is a preparation record, not a hiring score. The AI review highlights visible evidence,
              structure, and role reasoning to improve next.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Mode", modes.find((item) => item.id === mode)?.title || "Mock"],
                ["Questions", String(exchanges.length)],
                ["Follow-ups", String(exchanges.filter((item) => item.followUpAnswer).length)],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-primary-foreground/10 p-3">
                  <p className="text-xs font-bold text-primary-foreground/65">{label}</p>
                  <p className="mt-1 text-sm font-extrabold">{value}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <p className="section-kicker">AI preparation review</p>
            <h2 className="mt-2 text-xl font-extrabold">Your next best improvements</h2>
            {generating ? (
              <div className="mt-5 flex items-center gap-3 rounded-xl bg-accent p-4 text-sm font-bold text-accent-foreground">
                <Sparkles size={18} className="animate-pulse" /> {generationLabel}
              </div>
            ) : finalFeedback ? (
              <div className="mt-4 whitespace-pre-line rounded-xl bg-accent/60 p-4 text-sm leading-6 text-card-foreground">
                {finalFeedback}
              </div>
            ) : (
              <div
                className="mt-5 rounded-xl border border-destructive/30 bg-card p-4 text-sm text-destructive"
                role="alert"
              >
                <p>{error || "Final feedback is not available yet."}</p>
                <Button variant="outline" onClick={() => generateFinalFeedbackForSession(exchanges)} className="mt-4">
                  Try feedback again
                </Button>
              </div>
            )}
          </Card>
          <Card className="xl:col-span-2">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="section-kicker">Session review</p>
                <h2 className="mt-2 text-lg font-extrabold">Questions, answers, and AI follow-ups</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={start}>
                  <RotateCcw size={16} /> Retry this mode
                </Button>
                <Button onClick={saveSession} loading={saving} disabled={!finalFeedback}>
                  Save feedback
                </Button>
              </div>
            </div>
            <div className="mt-5 space-y-4">
              {exchanges.map((item, itemIndex) => (
                <div key={`${item.question}-${itemIndex}`} className="rounded-xl border border-border p-4">
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-secondary">
                    Question {itemIndex + 1}
                  </p>
                  <p className="mt-2 text-sm font-extrabold text-card-foreground">{item.question}</p>
                  <p className="mt-2 text-sm leading-6 text-card-foreground">{item.answer}</p>
                  <div className="mt-4 rounded-lg bg-accent/55 p-3">
                    <p className="text-xs font-extrabold text-accent-foreground">AI follow-up</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.followUp}</p>
                    <p className="mt-3 text-sm leading-6 text-card-foreground">{item.followUpAnswer}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      ) : (
        <section className="mt-8 grid gap-5 xl:grid-cols-[1fr_.72fr]">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <Badge tone="primary">{modes.find((item) => item.id === mode)?.title}</Badge>
                <p className="mt-3 text-sm font-bold text-muted-foreground">
                  {awaitingFollowUp ? "AI follow-up" : `Question ${index + 1} of ${questions.length}`}
                </p>
                <h2 className="display-font mt-3 text-3xl font-semibold text-card-foreground">
                  {awaitingFollowUp ? exchanges[exchanges.length - 1]?.followUp : questions[index]}
                </h2>
              </div>
              <span className="rounded-lg bg-accent p-3 text-secondary">
                <Clock3 size={22} />
              </span>
            </div>
            <form noValidate onSubmit={submitAnswer} className="mt-6">
              <Field label="Your answer" htmlFor="mock-answer" error={error}>
                <textarea
                  id="mock-answer"
                  value={answer}
                  disabled={generating}
                  onChange={(event) => setAnswer(event.target.value)}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "mock-answer-error" : undefined}
                  placeholder="Type your response as if you were answering aloud. Aim for a clear situation, your action, and the result or learning."
                  className={`${fieldClass} min-h-52 py-3 leading-6`}
                />
              </Field>
              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">
                  {generating
                    ? generationLabel
                    : answer.trim()
                      ? `${answer.trim().split(/\s+/).length} words`
                      : "Aim for 60–120 words"}
                </p>
                <Button type="submit" loading={generating}>
                  {awaitingFollowUp ? "Finish & continue" : "Answer & get follow-up"} <ArrowRight size={17} />
                </Button>
              </div>
            </form>
          </Card>
          <aside className="space-y-5">
            <Card>
              <p className="section-kicker">Answer cue</p>
              <h2 className="mt-2 text-lg font-extrabold">Use a visible structure.</h2>
              <div className="mt-4 space-y-3">
                {[
                  "Lead with the outcome or headline.",
                  "Give only the context needed to understand the situation.",
                  "Name the action you personally took.",
                  "Close with evidence, reflection, or next step.",
                ].map((item, itemIndex) => (
                  <div key={item} className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-extrabold text-accent-foreground">
                      {itemIndex + 1}
                    </span>
                    <p className="text-sm leading-6 text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="bg-warning">
              <div className="flex gap-3">
                <WandSparkles size={20} className="shrink-0 text-warning-foreground" />
                <p className="text-sm leading-6 text-warning-foreground">
                  The AI follows up on what you actually wrote. It is a practice conversation, not a claim about a real
                  company interview.
                </p>
              </div>
            </Card>
          </aside>
        </section>
      )}
    </div>
  );
}
