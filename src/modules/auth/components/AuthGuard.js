import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/client'
import Loading from 'common/components/loading/Loading'
import { useRouter } from 'next/router'

export default function AuthGuard({ children, allowedRole }) {
	const [session, loading] = useSession()
	const router = useRouter()
	const isSignin = !!session?.user

	useEffect(() => {
		if (loading) return // Do nothing while loading
		if (!isSignin) signIn() // If not authenticated, force log in
	}, [isSignin, loading])

	if (isSignin) {
		// role check
		if (allowedRole) {
			if (allowedRole === session.user.role) {
				return children
			}
			// prevent user to access page
			else {
				router.push('/404')
			}
		}

		// no role check mean no need
		else {
			return children
		}
	}

	// Session is being fetched, or no user.
	// If no user, useEffect() will redirect.
	return <Loading />
}
