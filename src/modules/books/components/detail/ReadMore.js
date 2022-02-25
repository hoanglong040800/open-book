import React from 'react'
import { useState } from 'react'

export default function ReadMore({ children }) {
	const text = children
	// const readMore = text.length > 100 ? true : false

	const [isReadMore, setIsReadMore] = useState(true)

	function toggleReadMore() {
		setIsReadMore(!isReadMore)
	}

	return (
		<p>
			{isReadMore ? text.slice(0, 100) : text}
			<span onClick={toggleReadMore} style={{ border: '1px solid red' }}>
				{isReadMore ? '...read more' : 'show less'}
			</span>
		</p>
	)
}
