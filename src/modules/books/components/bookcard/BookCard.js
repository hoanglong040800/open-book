import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import StarIcon from '@material-ui/icons/Star'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Link from 'next/link'

export default function BookCard({ item }) {
	const classes = useStyles()
	const { id, thumbnail, name, point, view, slug } = item

	return (
		<Link href={`books/${slug}`} passHref>
			<Card className={classes.card}>
				<CardActionArea>
					<CardMedia
						component="img"
						alt={name}
						title={name}
						image={thumbnail.link_storage}
						className={classes.bookCover}
					/>

					<CardContent>
						<Typography gutterBottom variant="h6" className={classes.title}>
							{name}
						</Typography>
						<div className={classes.lowerSection}>
							<Typography
								variant="body1"
								color="textSecondary"
								className={classes.rating}
							>
								{point}{' '}
								<StarIcon color="secondary" className={classes.starIcon} />
							</Typography>
							<Typography
								variant="body1"
								color="textSecondary"
								className={classes.view}
							>
								<VisibilityIcon className={classes.viewIcon} /> {view}
							</Typography>
						</div>
					</CardContent>
				</CardActionArea>
			</Card>
		</Link>
	)
}

const useStyles = makeStyles(theme => ({
	card:{
		height: 380,
	},

	bookCover: {
		height: 250,
		objectFit: 'contain',
		borderBottom: '1px solid #ccc',
	},

	title: {
		height: 70,
		letterSpacing: 0.5,
		overflow: 'hidden'
	},

	rating: {
		display: 'flex',
		alignItems: 'center',
		marginRight: 'auto',
	},

	view: {
		display: 'flex',
		alignItems: 'center',
	},

	starIcon: {
		marginLeft: '0.25rem',
	},

	viewIcon: {
		marginRight: '0.35rem',
	},

	lowerSection: {
		display: 'flex',
	},

	[theme.breakpoints.down('sm')]: {
		bookCover: {
			height: 250,
		},
	},
}))
