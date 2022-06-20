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
						<Typography
							variant="h6"
							style={{ height: 70, letterSpacing: 0.5, overflow: 'hidden' }}
						>
							{name}
						</Typography>

						<section className="flex justify-between">
							<div className="flex align-center gap-medium">
								<Typography variant="body1" color="textSecondary">
									{point}
								</Typography>
								<Star color="secondary" />
							</div>

							<div className="flex align-center gap-medium">
								<Visibility />
								<Typography variant="body1" color="textSecondary">
									{view}
								</Typography>
							</div>
						</section>
					</CardContent>
				</CardActionArea>
			</Card>
		</Link>
	)
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

	[theme.breakpoints.down('sm')]: {
		bookCover: {
			height: 250,
		},
	},
}))
