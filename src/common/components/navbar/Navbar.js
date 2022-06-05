import {
	AppBar,
	Container,
	IconButton,
	makeStyles,
	Toolbar,
} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { USER_ROLES } from 'common/constants'
import { useSession } from 'next-auth/client'
import NavLink from './link/NavLink'
import NavAuthButton from './NavAuthButton'
import NavLogo from './NavLogo'
import NavProfile from './NavProfile'
import NavSearchBar from './NavSearchBar'

export default function Navbar({ onOpenDrawer }) {
	const classes = useStyles()
	const [session] = useSession()

	return (
		<AppBar position="fixed" color="primary">
			<Toolbar>
				<Container maxWidth="xl">
					<div className="flex justify-between align-center flex-1">
						{/* left side */}
						<div className="flex">
							<div className={classes.mobile}>
								<IconButton onClick={onOpenDrawer}>
									<Menu className="text-color-white" />
								</IconButton>
							</div>

							<div className={classes.desktop}>
								<NavLogo className="mr-medium" />
								<NavLink />
							</div>
						</div>

						{/* right side */}
						<div className="flex align-center">
							{session?.user.role === USER_ROLES.viewer && <NavSearchBar />}
							{session ? <NavProfile /> : <NavAuthButton />}
						</div>
					</div>
				</Container>
			</Toolbar>
		</AppBar>
	)
}

const useStyles = makeStyles(theme => ({
	desktop: {
		marginRight: theme.spacing(1),

		[theme.breakpoints.up('sm')]: {
			display: 'flex',
		},
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},

	mobile: {
		marginRight: theme.spacing(1),

		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
		},
	},
}))
