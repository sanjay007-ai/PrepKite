import { BookOpenCheck, CheckCircle2, HeartHandshake, ShieldCheck } from 'lucide-react';
import { Card } from '../components/ui';
import usePageMeta from '../lib/usePageMeta';

export default function HelpPage() {
  usePageMeta('Interview Help — PrepKite', 'Practical interview guidance for stronger preparation, clearer answers, and confident practice.');
  const sections = [
    ['Before the interview', ['Research the role requirements and prepare two or three relevant examples.', 'Review your projects, tools, metrics, and decisions so you can explain your own contribution.', 'Prepare a short introduction and a few thoughtful questions for the interviewer.']],
    ['During answers', ['Lead with the answer, then give the evidence. Avoid long context before the main point.', 'Use Situation → Task → Action → Result for behavioral and project stories.', 'For technical questions, state assumptions, approach, validation, trade-offs, and result.']],
    ['After practice', ['Write down one strength, one missing detail, and one improvement for your next attempt.', 'Repeat the same question with a shorter and more evidence-based answer.', 'Track recurring gaps rather than trying to improve everything at once.']],
  ];
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="section-kicker">Interview help</p>
        <h1 className="display-font mt-2 text-4xl font-semibold text-foreground sm:text-5xl">A practical playbook for better interview answers.</h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">Use this guide with Questions, Practice, and Mock Interview to turn preparation into repeatable practice.</p>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {sections.map(([title, items]) => (
          <Card key={title}>
            <div className="flex items-center gap-3"><span className="rounded-lg bg-accent p-2 text-secondary"><CheckCircle2 size={19} /></span><h2 className="text-lg font-extrabold">{title}</h2></div>
            <ul className="mt-5 space-y-3">{items.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-muted-foreground"><CheckCircle2 size={16} className="mt-1 shrink-0 text-secondary" />{item}</li>)}</ul>
          </Card>
        ))}
      </div>
      <Card className="mt-5">
        <div className="flex items-start gap-4"><span className="rounded-xl bg-accent p-3 text-secondary"><HeartHandshake size={22} /></span><div><p className="section-kicker">PrepKite principles</p><h2 className="mt-1 text-xl font-extrabold">Be specific, honest, and evidence-led.</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Do not invent achievements or experience. Explain what you actually did, what you learned, and how you would improve the approach.</p></div></div>
      </Card>
      <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground"><ShieldCheck size={19} className="shrink-0 text-secondary" /><span>Your preparation data stays in this browser unless you add a separate backend later.</span><BookOpenCheck size={19} className="ml-auto shrink-0" /></div>
    </div>
  );
}
