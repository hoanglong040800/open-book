import { Button } from '@material-ui/core'
import React from 'react'

export default function Tags({ tags }) {
	return (
		<div
			style={{
				display: 'flex',
				flexWrap: 'wrap',
				gap: '10px',
				marginTop: '20px',
			}}
		>
			{tags.map((tag, index) => (
				<Button
					key={index}
					variant="outlined"
					color="primary"
					style={{
						borderRadius: '50px',
						fontWeight: 'normal',
					}}
				>
					{tag.toUpperCase()}
				</Button>
			))}
		</div>
	)
}
