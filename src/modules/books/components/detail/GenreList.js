import { Button } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'

export default function GenreList({ genres }) {
	const router = useRouter()

	function onClickButton(id) {
		router.push({
			pathname: '/books/filter',
			query: { genre: id },
		})
	}

	return (
		<div style={styles.container}>
			{genres.map((genre, index) => (
				<Button
					key={genre.id}
					onClick={() => onClickButton(genre.id)}
					{...props.btn}
				>
					{genre.name_en.toUpperCase()}
				</Button>
			))}
		</div>
	)
}

const styles = {
	btn: {
		borderRadius: '50px',
		fontWeight: 'normal',
	},

	container: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: '10px',
		marginTop: '20px',
	},
}

const props = {
	btn: {
		variant: 'outlined',
		color: 'primary',
		style: styles.btn,
	},
}
