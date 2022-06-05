import { Button } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { navlinks, USER_ROLES, storeNavLinks } from 'common/constants'
import NavLinkMenu from './NavLinkMenu'

export default function NavLink() {
	const router = useRouter()
	const [session] = useSession()

	return (
		<>
			{session?.user.role === USER_ROLES.store ? (
				<div className="flex align-center mx-small">
					{storeNavLinks.map(item => (
						<Button
							onClick={() => router.push(item.url)}
							className="text-color-white font-size-large font-weight-bold mx-x-small"
						>
							{item.text}
						</Button>
					))}
				</div>
			) : (
				navlinks.map(item => (
					<NavLinkMenu key={item.cate} name={item.cate} lists={item.lists} />
				))
			)}
		</>
	)
}
