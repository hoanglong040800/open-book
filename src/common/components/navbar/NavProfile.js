import {
	Button,
	IconButton,
	makeStyles,
	Menu,
	MenuItem,
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { signOut, useSession } from 'next-auth/client'
import { USER_ROLES } from 'common/constants/common.constant'

export default function NavProfile() {
	const router = useRouter()
	const [session] = useSession()
	const mui = useStyles()
	const [anchorEl, setAnchorEl] = useState(null)

	function handleOpen(e) {
		setAnchorEl(e.currentTarget)
	}

	function handleClose() {
		setAnchorEl(null)
	}

	function handleSelectProfile() {
		const profileRoute = `/user/${session.user.user_name}`
		handleRouting(profileRoute)
	}

	function handleRouting(route) {
		router.push(route)
		handleClose()
	}

	function handleSignout() {
		const regEx = /settings|new|edit/

		regEx.test(router.pathname)
			? signOut({ callbackUrl: '/' })
			: signOut({ redirect: false })

		localStorage.clear()
		handleClose()
	}

	function forwardAddBook() {
		router.push('/books/new')
	}

	return (
		<>
			<IconButton size="medium" onClick={handleOpen}>
				<AccountCircle fontSize="large" className={mui.icon} />
			</IconButton>

			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				keepMounted
				getContentAnchorEl={null}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				transformOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<MenuItem onClick={handleSelectProfile}>
					<b>{session.user.user_name}</b>
				</MenuItem>

				{session && session.user.role === USER_ROLES.editor && (
					<MenuItem onClick={() => handleRouting('/books/new')}>
						Add Book
					</MenuItem>
				)}

				<MenuItem onClick={handleSignout}>Log out</MenuItem>
			</Menu>
		</>
	)
}

const useStyles = makeStyles(theme => ({
	icon: {
		color: '#fff',
	},
}))
