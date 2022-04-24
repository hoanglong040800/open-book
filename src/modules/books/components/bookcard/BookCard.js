import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Star, Visibility } from '@material-ui/icons'
import Link from 'next/link'

export default function BookCard({ item }) {
	const mui = useStyles()
	const { thumbnail, name, point, view, slug } = item

	return (
		<Link href={`/books/${slug}`} passHref>
			<Card className={mui.card}>
				<CardActionArea>
					<CardMedia
						component="img"
						alt={name}
						title={name}
						image={thumbnail.link_storage}
						className={mui.bookCover}
					/>

					<CardContent>
						<Typography {...props.title}>{name}</Typography>

						<section className={mui.lowerSection}>
							<div className={mui.infoContainer}>
								<Typography {...props.info}>{point}</Typography>
								<Star color="secondary" />
							</div>

							<div className={mui.infoContainer}>
								<Visibility />
								<Typography {...props.info}>{view}</Typography>
							</div>
						</section>
					</CardContent>
				</CardActionArea>
			</Card>
		</Link>
	)
}

const styles = {
	title: {
		height: '70px',
		letterSpacing: 0.5,
		overflow: 'hidden',
	},
}

const props = {
	title: {
		gutterBottom: true,
		variant: 'h6',
		style: styles.title,
	},

	info: {
		variant: 'body1',
		color: 'textSecondary',
	},
}

const useStyles = makeStyles(theme => ({
	card: {
		height: 380,
	},

	bookCover: {
		height: 250,
		objectFit: 'contain',
		borderBottom: '1px solid #ccc',
	},

	lowerSection: {
		display: 'flex',
		justifyContent: 'space-between',
	},

	infoContainer: {
		display: 'flex',
		alignItems: 'center',
		gap: 10,
	},

	[theme.breakpoints.down('sm')]: {
		bookCover: {
			height: 250,
		},
	},
}))
