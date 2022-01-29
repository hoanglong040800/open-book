import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/client'
import Loading from 'common/components/loading/Loading'

export default function Auth({ children }) {
  const [session, loading] = useSession()
  const isSignin = !!session?.user

  // console.log('Auth', { session, isSignin, loading })

  useEffect(() => {
    if (loading) return // Do nothing while loading
    if (!isSignin) signIn() // If not authenticated, force log in
  }, [isSignin, loading])

  if (isSignin) {
    return children
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <Loading />
}
