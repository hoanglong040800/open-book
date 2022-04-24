import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

export default function StoreNavLink() {
	const mui = useStyles()
	const router = useRouter()
	const [session] = useSession()

	function handleDashboardClick() {
		router.push(`/user/${session?.user.user_name}/dashboard`)
	}

	function handleAddMultiBooksClick() {
		router.push(`/books/add-multi-books`)
	}

	return (
		<div className={mui.root}>
			<Button onClick={handleDashboardClick} className={mui.button}>
				Dashboard
			</Button>

			<Button onClick={handleAddMultiBooksClick} className={mui.button}>
				Add multi books
			</Button>
		</div>
	)
}

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		margin: theme.spacing(0, 1),
	},

	button: {
		color: '#fff',
		margin: theme.spacing(0, 0.5),
		fontSize: '1rem',
		fontWeight: 'bold',
	},
}))
