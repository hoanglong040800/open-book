import { useEffect, useState } from 'react'
import { Box, Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { URL_DASHBOARD, URL_EDIT_USER, USER_ROLES } from 'common/constants'
import { HeadTitle, SubmitButton } from 'common/components'
import { getUserProfile } from 'modules/users/api/users.api'
import { FormLayout } from 'common/layouts'
import { getAllBookmarksByUser } from 'modules/bookmarks'
import { BookList } from 'modules/books/components'
import { StorefrontTwoTone, AccountCircle } from '@material-ui/icons'

export default function ViewProfile() {
	const classes = useStyle()
	const [profile, setProfile] = useState({})
	const [userBookmarks, setUserBookmarks] = useState(null)
	const [session] = useSession()
	const router = useRouter()
	const isStore = session?.user.role === USER_ROLES.store
	const isUserProfile = session?.user.user_name === router.query.user_name

	useEffect(() => {
		initUserInfo()
		session?.user.role === USER_ROLES.viewer && initUserBookmarks()
	}, [])

	async function initUserInfo() {
		const data = await getUserProfile()
		setProfile(data)
	}

	async function initUserBookmarks() {
		const data = await getAllBookmarksByUser()
		setUserBookmarks(data)
	}

	function handleEdit() {
		router.push(URL_EDIT_USER(session.user.user_name))
	}

	function handleViewDashboard() {
		router.push(URL_DASHBOARD(session.user.user_name))
	}

	return (
		<>
			<HeadTitle page="profile" />

			<FormLayout title="" maxWidth={600}>
				<Grid container>
					<Grid item xs={12} sm={4} className="text-align-center">
						<div className="text-size-x7-large">
							{isStore ? (
								<StorefrontTwoTone color="secondary" fontSize="inherit" />
							) : (
								<AccountCircle fontSize="inherit" />
							)}
						</div>

						{isStore && isUserProfile && (
							<Button
								variant="contained"
								color="secondary"
								onClick={handleViewDashboard}
							>
								View Dashboard
							</Button>
						)}
					</Grid>

					<Grid
						item
						container
						xs={12}
						sm={8}
						alignItems="center"
						className={classes.infoContainer}
					>
						<Grid {...gridItemProperty.property}>
							<h3>Username</h3>
						</Grid>

						<Grid {...gridItemProperty.value}>
							<p>{profile?.user_name}</p>
						</Grid>

						<Grid {...gridItemProperty.property}>
							<h3>Email</h3>
						</Grid>

						<Grid {...gridItemProperty.value}>
							<p>{profile?.email}</p>
						</Grid>

						<Grid {...gridItemProperty.property}>
							<h3>{isStore ? 'Store name' : 'Full name'}</h3>
						</Grid>

						<Grid {...gridItemProperty.value}>
							<p>{profile?.full_name}</p>
						</Grid>

						<Grid {...gridItemProperty.property}>
							<h3>Role</h3>
						</Grid>

						<Grid {...gridItemProperty.value}>
							<p>{profile?.role}</p>
						</Grid>

						{!isStore && (
							<>
								<Grid {...gridItemProperty.property}>
									<h3>Gender</h3>
								</Grid>

								<Grid {...gridItemProperty.value}>
									<p>{profile?.gender}</p>
								</Grid>
							</>
						)}
					</Grid>
				</Grid>

				{isUserProfile && (
					<SubmitButton
						text={`Edit ${isStore ? 'Store' : 'Profile'}`}
						onClick={handleEdit}
					/>
				)}
			</FormLayout>

			{isUserProfile && !isStore && userBookmarks && (
				<Box mt={5}>
					<h1>Your bookmarks list</h1>
					<BookList list={userBookmarks} hasMore={false} />
				</Box>
			)}
		</>
	)
}

const gridItemProperty = {
	property: {
		item: true,
		xs: 4,
		sm: 4,
		md: 4,
		lg: 4,
	},
	value: {
		item: true,
		xs: 8,
		sm: 8,
		md: 8,
		lg: 8,
	},
}

const useStyle = makeStyles(theme => ({
	infoContainer: {
		borderLeft: `4px solid ${theme.palette.primary.light}`,
		paddingLeft: '30px',
	},

	[theme.breakpoints.down('xs')]: {
		infoContainer: {
			borderLeft: 'none',
			paddingLeft: 'none',
		},
	},
}))

ViewProfile.auth = true
