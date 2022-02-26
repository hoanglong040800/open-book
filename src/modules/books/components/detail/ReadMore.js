import { Typography } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'

export default function ReadMore({ children }) {
	const text = children
	const character = 240
	const [isReadMore, setIsReadMore] = useState(true)

	function toggleReadMore() {
		setIsReadMore(!isReadMore)
	}

	return (
		<>
			<Typography variant="body1">
				{isReadMore ? text.slice(0, character) : text}
			</Typography>

			<span onClick={toggleReadMore} style={style.span}>
				{isReadMore ? 'Read more' : 'Show less'}
			</span>
		</>
	)
}

const style = {
	span: {
		color: '#0768fa',
		cursor: 'pointer',
	},
}
