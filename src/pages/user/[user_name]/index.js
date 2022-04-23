import HeadTitle from 'common/components/headtitle/HeadTitle'
import { useEffect, useState } from 'react'
import { getUserProfile } from 'modules/users/api/users.api'
import { Box, Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { USER_ROLES } from 'common/constants/common.constant'
import SubmitButton from 'common/components/button/SubmitButton'
import FormLayout from 'common/layouts/FormLayout'

export default function ViewProfile() {
	const classes = useStyle()

	const [profile, setProfile] = useState({})
	const [session] = useSession()
	const router = useRouter()
	const isStore = session?.user.role === USER_ROLES.store
	const isUserProfile = session?.user.user_name === router.query.user_name

	useEffect(() => {
		getUserInfo()
	}, [])

	async function getUserInfo() {
		const data = await getUserProfile()
		setProfile(data)
	}

	function handleEdit() {
		router.push(`/user/${session.user.user_name}/edit`)
	}

	function handleViewDashboard() {
		router.push(`/user/${session.user.user_name}/dashboard`)
	}

	return (
		<>
			<HeadTitle page="profile" />

			<FormLayout title="" maxWidth={600}>
				<Grid container>
					<Grid item xs={12} sm={4} className={classes.profileTitle}>
						{/* todo: avatar based on roles */}
						<h1>Profile</h1>

						{isUserProfile && (
							<Button variant="contained" color="primary" onClick={handleEdit}>
								Edit
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

				{isStore && isUserProfile && (
					<SubmitButton text="View Dashboard" onClick={handleViewDashboard} />
				)}
			</FormLayout>
		</>
	)
}

const gridItemProperty = {
	property: {
		item: true,
		xs: 4,
		sm: 5,
		md: 4,
		lg: 3,
	},
	value: {
		item: true,
		xs: 8,
		sm: 7,
		md: 8,
		lg: 9,
	},
}

const useStyle = makeStyles(theme => ({
	profileTitle: {
		textAlign: 'center',
	},

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
