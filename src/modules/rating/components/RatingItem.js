import React from 'react'
import Rating from '@material-ui/lab/Rating'
import { makeStyles, Typography } from '@material-ui/core'
import { FooterButtons } from 'common/components'

export default function RatingItem({
	comment,
	point,
	onChangePoint,
	onChangeComment,
	handleSubmitRating,
}) {
	const mui = useStyles()

	return (
		<>
			<Typography variant="h6">How did you enjoy this book?</Typography>

			<Rating
				name="point"
				value={point ? point : ''}
				onChange={onChangePoint}
			/>

			<Typography variant="h6">Leave a comment</Typography>

			<textarea
				name="comment"
				value={comment}
				onChange={onChangeComment}
				placeholder="Write some comments"
				className={mui.textarea}
			/>

			<FooterButtons text="Send" onClick={handleSubmitRating} />
		</>
	)
}

const useStyles = makeStyles(theme => ({
	textarea: {
		display: 'block',
		width: '100%',
		padding: '5px 10px',
		resize: 'none',
		outline: 'none',
	},
}))
