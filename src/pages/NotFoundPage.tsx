import { Compass } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Button, EmptyState } from '../components/ui'
import usePageMeta from '../lib/usePageMeta'

export default function NotFoundPage() {
  usePageMeta('Page Not Found — PrepKite', 'The PrepKite page you requested could not be found.')
  const navigate = useNavigate()
  const { user } = useApp()
  return <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8"><EmptyState icon={Compass} title="That preparation page does not exist" description="The link may be outdated, or the page may have moved. Head back to your PrepKite dashboard to continue preparing." action={<Button onClick={() => navigate(user ? '/dashboard' : '/')}>{user ? 'Go to dashboard' : 'Back to home'}</Button>} /></main>
}
