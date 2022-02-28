import { makeStyles, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import React from 'react'

export default function OverallRating({ pointOverall }) {
	const mui = useStyle()
	return (
		<div className={mui.container}>
			<Typography variant="h5">Overall Rating:</Typography>
			<Typography variant="h3" color="secondary">
				{pointOverall}
			</Typography>
			<Rating value={pointOverall} readOnly />
		</div>
	)
}

const useStyle = makeStyles(() => ({
	container: {
		textAlign: 'center',
		width: 'auto',
	},
}))
