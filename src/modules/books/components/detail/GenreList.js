import { Button } from '@material-ui/core'
import React from 'react'

export default function GenreList({ genres }) {
	return (
		<div
			style={{
				display: 'flex',
				flexWrap: 'wrap',
				gap: '10px',
				marginTop: '20px',
			}}
		>
			{genres.map((genre, index) => (
				<Button
					key={genre.id}
					variant="outlined"
					color="primary"
					style={{
						borderRadius: '50px',
						fontWeight: 'normal',
					}}
				>
					{genre.name_en.toUpperCase()}
				</Button>
			))}
		</div>
	)
}
