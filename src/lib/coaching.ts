const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

function words(text: string) {
  return text.trim().split(/\s+/).filter(Boolean);
}

export async function generateFollowUp(question: string, answer: string, mode: string) {
  await wait(450);
  const lower = answer.toLowerCase();
  if (!/result|impact|outcome|improv|%|percent|number|metric/.test(lower)) {
    return 'What measurable result or observable change came from your action?';
  }
  if (!/because|why|reason|trade-off|tradeoff/.test(lower)) {
    return 'Why did you choose that approach, and what trade-off did you consider?';
  }
  if (!/learn|lesson|next|again|improv/.test(lower)) {
    return 'What did you learn, and what would you do differently next time?';
  }
  return mode === 'technical'
    ? 'What edge case or data-quality risk would you check before trusting the solution?'
    : `What specific evidence would you use to show that your approach worked for ${question.toLowerCase().replace(/^what |^how /, '')}?`;
}

export async function generateFinalFeedback(session: Array<{ question: string; answer: string; followUpAnswer?: string }>) {
  await wait(650);
  const all = session.map((item) => `${item.answer} ${item.followUpAnswer || ''}`).join(' ');
  const count = words(all).length;
  const hasEvidence = /result|impact|outcome|metric|%|percent|number/i.test(all);
  const hasStructure = /first|then|because|finally|situation|task|action|result/i.test(all);
  return [
    'Strong areas',
    `- You completed ${session.length} practice rounds and gave about ${count} words of evidence.`,
    hasStructure ? '- Your answers show useful cause-and-effect structure.' : '- Add a clearer situation → action → result structure.',
    '',
    'Build next',
    hasEvidence ? '- Keep quantifying outcomes where possible.' : '- Add measurable outcomes, scope, time saved, revenue, quality, or another concrete result.',
    '- Keep the first sentence direct, then support it with one strong example.',
    '',
    'Missed points',
    '- Make your personal contribution explicit instead of describing only the team result.',
    '',
    'Communication',
    '- Aim for concise answers with one main story, clear transitions, and a short closing takeaway.',
    '',
    'Technical or role gaps',
    '- When relevant, explain assumptions, validation checks, trade-offs, and how you measured success.',
    '',
    'What to practice next',
    '- Repeat one question using a 60–90 second answer and include one concrete metric plus one lesson learned.',
  ].join('\n');
}

export async function generateAnswerFeedback(question: string, answer: string) {
  await wait(550);
  const lower = answer.toLowerCase();
  const hasAction = /i |my |built|created|led|analysed|analyzed|improved|designed|implemented|solved|handled/.test(lower);
  const hasResult = /result|impact|outcome|metric|%|percent|increased|decreased|saved|reduced|improved/.test(lower);
  const hasStructure = /situation|task|action|result|first|then|finally|because/.test(lower);
  const improved = `${answer.trim()}${hasResult ? '' : ' I would also add the measurable result and what I learned from the experience.'}`;
  return [
    'Feedback',
    hasAction ? '- Your answer includes personal ownership.' : '- Make your personal actions explicit: what did you decide, build, change, or solve?',
    hasStructure ? '- The answer has some useful structure.' : '- Use a simple Situation → Action → Result structure.',
    '',
    'Missed points',
    hasResult ? '- Keep the concrete evidence; it makes the story easier to evaluate.' : '- Add one measurable outcome or specific observable result.',
    `- Tie the example directly back to the question: “${question}”`,
    '',
    'Improved answer',
    improved,
    '',
    'Likely follow-up',
    'What was the most important trade-off or decision you made, and what evidence showed that it worked?',
  ].join('\n');
}
