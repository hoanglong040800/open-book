import { makeStyles, Grid } from '@material-ui/core'
import React from 'react'
import OverallRating from './OverallRating'
import RatingList from './RatingList'

export default function RatingDisplay({ ratingList, pointOverall, canDelete }) {
	const mui = useStyle()
	return (
		<Grid container className={mui.container}>
			<Grid item xs={12} md={8} className={mui.item}>
				<RatingList ratingList={ratingList} canDelete={canDelete} />
			</Grid>
			<Grid item xs={12} md={4} className={mui.item}>
				<OverallRating pointOverall={pointOverall} />
			</Grid>
		</Grid>
	)
}

const useStyle = makeStyles(theme => ({
	item: {
		padding: theme.spacing(2, 3),
	},

	[theme.breakpoints.down('sm')]: {
		container: {
			flexDirection: 'column-reverse',
			gap: theme.spacing(1),
		},
	},
}))
