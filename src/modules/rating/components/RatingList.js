import { IconButton, makeStyles, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import DeleteIcon from '@material-ui/icons/Delete'
import React from 'react'

export default function RatingList({ ratingList, showDeleteButton }) {
	const mui = useStyle()
	return (
		<>
			{ratingList.map(rating => (
				<div key={rating.rating_id} className={mui.container}>
					<div>
						<Typography variant="h6">
							{rating.user.full_name}
							<Rating value={rating.point} readOnly className={mui.rating} />
						</Typography>

						<Typography variant="body1">{rating.comment}</Typography>
					</div>

					{showDeleteButton === rating.user.id && (
						<IconButton
							aria-label="delete comment"
							color="secondary"
							className={mui.deleteBtn}
						>
							<DeleteIcon />
						</IconButton>
					)}
				</div>
			))}
		</>
	)
}

const useStyle = makeStyles(theme => ({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: theme.spacing(3),
		'&:hover': {
			'& $deleteBtn': {
				display: 'inline',
			},
		},
	},

	/*
	 * already centered
	 */
	rating: {
		fontSize: '14px',
		marginLeft: theme.spacing(2),
	},

	deleteBtn: {
		display: 'none',
	},
}))
