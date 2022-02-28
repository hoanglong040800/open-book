import { makeStyles, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import React from 'react'

export default function RatingList({ ratingList }) {
	const mui = useStyle()
	return (
		<>
			{ratingList.map(rating => (
				<div key={rating.rating_id} className={mui.container}>
					<Typography variant="h6">{rating.user.full_name}</Typography>

					<Rating value={rating.point} readOnly className={mui.rating} />

					<Typography variant="body1">{rating.comment}</Typography>
				</div>
			))}
		</>
	)
}

const useStyle = makeStyles(theme => ({
	container: {
		marginBottom: theme.spacing(3),
	},

	rating: {
		fontSize: '12px',
	},
}))
