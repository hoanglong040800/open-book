import { Button, Card, Divider, Grid } from '@material-ui/core'
import Loading from 'common/components/loading/Loading'
import GenreList from './GenreList'
import ImageContainer from './ImageContainer'
import MainInfo from './MainInfo'
import MoreInfo from './MoreInfo'
import ReadMore from './Readmore'

export default function DetailBookContainer({ bookInfo, onClickRead }) {
	return (
		<Card className='card-container'>
			{bookInfo ? (
				<Grid container spacing={4}>
					<Grid item container xs={12} md={4} lg={3}>
						<ImageContainer thumbnail={bookInfo.thumbnail.link_storage} />
					</Grid>

					<Grid item xs={12} md={8} lg={9}>
						<MainInfo bookInfo={bookInfo} />

						<GenreList genres={bookInfo.genres} />

						<Button
							variant="contained"
							color="secondary"
							className="mt-x-large mt-12"
							onClick={onClickRead}
						>
							Read
						</Button>

						<Divider className="mv-large mh-auto width-half" />

						<MoreInfo bookInfo={bookInfo} />

						<ReadMore>{bookInfo.summary}</ReadMore>
					</Grid>
				</Grid>
			) : (
				<Loading />
			)}
		</Card>
	)
}
