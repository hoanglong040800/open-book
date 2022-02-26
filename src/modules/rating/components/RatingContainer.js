import { Card, makeStyles } from '@material-ui/core'

export default function RatingContainer({ children }) {
	const mui = useStyles()

	return <Card className={mui.card}>{children}</Card>
}

const useStyles = makeStyles(theme => ({
	card: {
		margin: theme.spacing(3, 0),
		padding: theme.spacing(3),
	},
}))
