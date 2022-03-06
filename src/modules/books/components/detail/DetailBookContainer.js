import { Button, Divider, Grid } from '@material-ui/core'
import CardContainer from 'common/components/cardcontainer/CardContainer'
import Loading from 'common/components/loading/Loading'
import GenreList from './GenreList'
import ImageContainer from './ImageContainer'
import MainInfo from './MainInfo'
import MoreInfo from './MoreInfo'
import ReadMore from './Readmore'

export default function DetailBookContainer({ bookInfo,onClickRead }) {
	return (
		<CardContainer>
			{bookInfo ? (
				<Grid container spacing={4}>
					<Grid {...props.imgSection}>
						<ImageContainer thumbnail={bookInfo.thumbnail.link_storage} />
					</Grid>

					<Grid item {...props.infoSection}>
						<MainInfo bookInfo={bookInfo} />

						<GenreList genres={bookInfo.genres} />

						<Button {...props.btn} onClick={onClickRead}>Read</Button>

						<Divider style={styles.divider} />

						<MoreInfo bookInfo={bookInfo} />

						<ReadMore>{bookInfo.summary}</ReadMore>
					</Grid>
				</Grid>
			) : (
				<Loading />
			)}
		</CardContainer>
	)
}

const styles = {
	btn: {
		margin: '30px 0 10px 0',
	},

	divider: {
		margin: '20px 10vw',
	},
}

const props = {
	btn: {
		variant: 'contained',
		color: 'secondary',
		style: styles.btn,
	},

	imgSection: {
		container: true,
		item: true,
		justifyContent: 'center',
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
