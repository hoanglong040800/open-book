import React from 'react'
import Rating from '@material-ui/lab/Rating'
import { Button, Typography } from '@material-ui/core'
import SubmitButton from 'common/components/button/SubmitButton'

export default function RatingItem({
	comment,
	point,
	onChangePoint,
	onChangeComment,
	handleSubmitRating,
}) {
	const textAreaStyling = {
		display: 'block',
		width: '100%',
		padding: '5px 10px',
		resize: 'none',
		outline: 'none',
	}

	return (
		<>
			<Typography variant="h6">How did you enjoy this book?</Typography>
			<Rating name="point" value={point} onChange={onChangePoint} />
			<Typography variant="h6">Leave a comment</Typography>
			<textarea
				name="comment"
				value={comment}
				onChange={onChangeComment}
				placeholder="Write some comments"
				style={textAreaStyling}
			/>
			<SubmitButton text="Send" onClick={handleSubmitRating} />
		</>
	)
}
