import HeadTitle from 'common/components/headtitle/HeadTitle'
import { useSession } from 'next-auth/client'

export default function About() {
	const [session] = useSession()

	return (
		<>
			<HeadTitle page="about" />

			<h1>About page</h1>

			<pre>{JSON.stringify(session, null, 2)}</pre>
		</>
	)
}
