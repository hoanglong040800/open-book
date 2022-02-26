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
	const {
		id,
		thumbnail,
		name,
		rating,
		view,
		slug,
	} = item

	return (
		<Link href={`books/${slug}`} passHref>
			<Card>
				<CardActionArea>
					<CardMedia
						component="img"
						alt={name}
						height={300}
						title={name}
						image={thumbnail.link_storage}
						className={classes.bookCover}
					/>

					<CardContent>
						<Typography gutterBottom variant="h5" className={classes.title}>
							{name}
						</Typography>
						<div className={classes.lowerSection}>
							<Typography
								variant="body1"
								color="textSecondary"
								className={classes.rating}
							>
								{rating}{' '}
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
	title: {
		minHeight: 70,
		marginBottom: 20,
		letterSpacing: 0.5,
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

	bookCover: {
		objectFit: 'contain',
		borderBottom: '1px solid #ccc',
	},
}))
