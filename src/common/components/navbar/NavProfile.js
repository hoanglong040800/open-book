import { IconButton, makeStyles, Menu, MenuItem } from '@material-ui/core'
import { AccountCircle, StorefrontTwoTone } from '@material-ui/icons'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { signOut, useSession } from 'next-auth/client'
import { checkRole } from 'common/utils/common.util'
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
		const regEx = /user|new|edit/

		regEx.test(router.pathname)
			? signOut({ callbackUrl: '/' })
			: signOut({ redirect: false })

		localStorage.clear()
		handleClose()
	}

	return (
		<>
			<IconButton size="medium" onClick={handleOpen}>
				{session?.user.role === USER_ROLES.store ? (
					<StorefrontTwoTone fontSize="large" className={mui.icon} />
				) : (
					<AccountCircle fontSize="large" className={mui.icon} />
				)}
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
					<b>{session?.user.full_name || session?.user.user_name}</b>
				</MenuItem>

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
