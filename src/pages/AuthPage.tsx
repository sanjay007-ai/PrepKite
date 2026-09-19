import { useState } from 'react'
import { ArrowLeft, LockKeyhole, Mail, ShieldCheck, UserRound } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, Card, Field, fieldClass } from '../components/ui'
import { useApp } from '../context/AppContext'
import usePageMeta from '../lib/usePageMeta'

export default function AuthPage() {
  usePageMeta('Sign in to PrepKite', 'Create or access your PrepKite account and keep your preparation progress together.')
  const { user, signIn, signUp, toast } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const [mode, setMode] = useState<'signin'|'signup'>('signin')
  const [email, setEmail] = useState(user?.email || '')
  const [name, setName] = useState(user?.name || '')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const destination = (location.state as { from?: string } | null)?.from || '/dashboard'

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    const normalized = email.trim().toLowerCase()
    setError('')
    if (!/^\S+@\S+\.\S+$/.test(normalized)) { setError('Enter a valid email address.'); return }
    if (mode === 'signup' && name.trim().length < 2) { setError('Enter your name so PrepKite can personalize your workspace.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }

    setLoading(true)
    try {
      if (mode === 'signin') {
        const nextUser = await signIn(normalized, password)
        toast({ title: `Welcome back, ${nextUser.name}`, description: 'Your PrepKite workspace is ready.', variant: 'success' })
        navigate(destination, { replace: true })
      } else {
        const result = await signUp(normalized, password, name)
        if (result.needsEmailConfirmation) {
          toast({ title: 'Account created', description: 'Check your email to confirm your PrepKite account, then sign in.', variant: 'success' })
          setMode('signin')
          setPassword('')
        } else {
          toast({ title: 'Welcome to PrepKite', description: 'Your account and workspace are ready.', variant: 'success' })
          navigate(destination, { replace: true })
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Authentication failed. Please try again.'
      setError(message.replace(/^Invalid login credentials$/i, 'Email or password is incorrect.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="surface-grid grid min-h-screen place-items-center px-4 py-10">
      <div className="w-full max-w-md">
        <Link to="/" className="focus-ring inline-flex items-center gap-2 rounded-lg text-sm font-bold text-muted-foreground hover:text-foreground"><ArrowLeft size={16} /> Back to PrepKite</Link>
        <Card className="mt-6 p-6 sm:p-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-secondary"><ShieldCheck size={22} /></div>
          <h1 className="display-font mt-5 text-4xl font-semibold">{mode === 'signin' ? 'Welcome back.' : 'Create your PrepKite account.'}</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{mode === 'signin' ? 'Sign in to keep your preparation context, progress, saved questions, and mock interview history together.' : 'Create one account to keep your interview preparation available across your devices.'}</p>
          <div className="mt-5 grid grid-cols-2 rounded-xl border border-border p-1">
            <button type="button" onClick={()=>{setMode('signin');setError('')}} className={`rounded-lg px-3 py-2 text-sm font-bold ${mode==='signin'?'bg-secondary text-secondary-foreground':'text-muted-foreground'}`}>Sign in</button>
            <button type="button" onClick={()=>{setMode('signup');setError('')}} className={`rounded-lg px-3 py-2 text-sm font-bold ${mode==='signup'?'bg-secondary text-secondary-foreground':'text-muted-foreground'}`}>Create account</button>
          </div>
          <form noValidate onSubmit={submit} className="mt-5 space-y-4">
            {mode === 'signup' && <Field label="Name" htmlFor="name"><div className="relative"><UserRound size={16} className="pointer-events-none absolute left-3 top-3.5 text-muted-foreground"/><input id="name" value={name} onChange={(e)=>setName(e.target.value)} autoComplete="name" placeholder="Your name" className={`${fieldClass} pl-9`} /></div></Field>}
            <Field label="Email address" htmlFor="email"><div className="relative"><Mail size={16} className="pointer-events-none absolute left-3 top-3.5 text-muted-foreground"/><input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete="email" placeholder="you@example.com" className={`${fieldClass} pl-9`} /></div></Field>
            <Field label="Password" htmlFor="password" error={error}><div className="relative"><LockKeyhole size={16} className="pointer-events-none absolute left-3 top-3.5 text-muted-foreground"/><input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete={mode==='signin'?'current-password':'new-password'} placeholder="At least 6 characters" className={`${fieldClass} pl-9`} /></div></Field>
            <Button type="submit" loading={loading} className="w-full"><LockKeyhole size={17} /> {mode === 'signin' ? 'Sign in securely' : 'Create account'}</Button>
          </form>
          <p className="mt-5 text-xs leading-5 text-muted-foreground">Your account is securely handled by Supabase Authentication. PrepKite does not store your password in the browser or in its application database.</p>
        </Card>
      </div>
    </main>
  )
}
