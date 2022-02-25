import { Button } from '@material-ui/core'
import React from 'react'
import ReadMore from './Readmore'

export default function Description({ summary }) {
	return (
		<>
			<div>
				<Button
					variant="contained"
					color="secondary"
					style={{ margin: '20px 0' }}
				>
					Read
				</Button>
			</div>
			<ReadMore>{summary}</ReadMore>
		</>
	)
}
