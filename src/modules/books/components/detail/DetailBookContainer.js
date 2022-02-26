import { Card, Grid, makeStyles } from '@material-ui/core'
import Loading from 'common/components/loading/Loading'
import Description from './Description'
import GenreList from './GenreList'
import ImageContainer from './ImageContainer'
import MainInfo from './MainInfo'
import MoreInfo from './MoreInfo'

export default function DetailBookContainer({ bookInfo }) {
	const mui = useStyles()

	/*
		JSX
	 */

	return (
		<Card className={mui.card}>
			{bookInfo ? (
				<Grid container spacing={4}>
					<Grid
						container
						item
						justifyContent="center"
						{...gridProps.imgSection}
					>
						<ImageContainer thumbnail={bookInfo.thumbnail.link_storage} />
					</Grid>

					<Grid item {...gridProps.infoSection}>
						<MainInfo
							title={bookInfo.name}
							authors={bookInfo.authors}
							view={bookInfo.view}
						/>

						<br />

						<MoreInfo
							publishedYear={bookInfo.published_year}
							pages={bookInfo.pages}
							publisher={bookInfo.publisher}
						/>
						<Description summary={bookInfo.summary} />
						<GenreList genres={bookInfo.genres} />
					</Grid>
				</Grid>
			) : (
				<Loading />
			)}
		</Card>
	)
}

const useStyles = makeStyles(theme => ({
	card: {
		padding: theme.spacing(3),
		marginBotton: theme.spacing(2),
	},
}))

const gridProps = {
	imgSection: {
		xs: 12,
		md: 4,
		lg: 3,
	},

	infoSection: {
		xs: 12,
		md: 8,
		lg: 9,
	},
}
