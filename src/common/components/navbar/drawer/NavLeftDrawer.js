import { Drawer, List, ListItem, ListItemText } from '@material-ui/core'
import { useRouter } from 'next/router'
import { navlinks } from 'common/constants/common.constant'
import NavLogo from '../NavLogo'
import DrawerNestedList from './DrawerNestedList'
import { USER_ROLES, storeNavLinks } from 'common/constants'
import { useSession } from 'next-auth/client'

export default function NavLeftDrawer({ open, onClose }) {
	const [session] = useSession()
	const router = useRouter()

	return (
		<Drawer open={open} onClose={onClose}>
			<List className="py-large" style={{ width: 250 }}>
				<NavLogo className="flex justify-center my-medium" />

				{session?.user.role === USER_ROLES.store ? (
					<>
						{storeNavLinks.map(item => (
							<ListItem button onClick={() => router.push(item.url)}>
								<ListItemText primary={item.text} />
							</ListItem>
						))}
					</>
				) : (
					navlinks.map(item => (
						<DrawerNestedList
							key={item.cate}
							title={item.cate}
							list={item.lists}
							onCloseDrawer={onClose}
						/>
					))
				)}
			</List>
		</Drawer>
	)
}
