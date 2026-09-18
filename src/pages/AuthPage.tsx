import { useState } from 'react';
import { ArrowLeft, Mail, ShieldCheck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Field, fieldClass } from '../components/ui';
import { signIn } from '../lib/auth';
import { useApp } from '../context/AppContext';
import usePageMeta from '../lib/usePageMeta';

export default function AuthPage() {
  usePageMeta('Sign in to PrepKite', 'Create one PrepKite account on this device to save your preparation progress.');
  const { user, setUser, toast } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(user?.email || '');
  const [name, setName] = useState(user?.name || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const destination = (location.state as { from?: string } | null)?.from || '/dashboard';

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const normalized = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(normalized)) {
      setError('Enter a valid email address.');
      return;
    }
    if (name.trim().length < 2) {
      setError('Enter your name so PrepKite can personalize your workspace.');
      return;
    }
    setError('');
    setLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 350));
    const nextUser = signIn(normalized, name);
    setUser(nextUser);
    setLoading(false);
    toast({ title: `Welcome, ${nextUser.name}`, description: 'Your PrepKite workspace is ready.', variant: 'success' });
    navigate(destination, { replace: true });
  };

  return (
    <main className="surface-grid grid min-h-screen place-items-center px-4 py-10">
      <div className="w-full max-w-md">
        <Link to="/" className="focus-ring inline-flex items-center gap-2 rounded-lg text-sm font-bold text-muted-foreground hover:text-foreground"><ArrowLeft size={16} /> Back to PrepKite</Link>
        <Card className="mt-6 p-6 sm:p-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-secondary"><ShieldCheck size={22} /></div>
          <h1 className="display-font mt-5 text-4xl font-semibold text-card-foreground">Build your interview workspace.</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Sign in once to keep your target role, practice progress, saved questions, and mock interview history together.</p>
          <form noValidate onSubmit={submit} className="mt-6 space-y-4">
            <Field label="Name" htmlFor="name" error={error}>
              <input id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Your name" className={fieldClass} />
            </Field>
            <Field label="Email address" htmlFor="email">
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="you@example.com" className={fieldClass} />
            </Field>
            <Button type="submit" loading={loading} className="w-full"><Mail size={17} /> Continue</Button>
          </form>
          <p className="mt-5 text-xs leading-5 text-muted-foreground">PrepKite uses one local account session in this browser. No external authentication service or password is required.</p>
        </Card>
      </div>
    </main>
  );
}
