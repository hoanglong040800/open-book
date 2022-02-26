import React from 'react'
import { makeStyles } from '@material-ui/core'

export default function MoreInfo({ publishedYear, publisher, pages }) {
	const mui = useStyles()

	return (
		<div className={mui.container}>
			<h3>
				Published year: <span className={mui.value}>{publishedYear}</span>
			</h3>
			<h3>
				Publisher: <span className={mui.value}>{publisher}</span>
			</h3>

			<h3>
				Pages: <span className={mui.value}>{pages}</span>
			</h3>
		</div>
	)
}

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		alignItems: 'center',
		gap: '20px',
	},

	value: {
		fontSize: '1rem',
		fontWeight: 'normal',
	},

	[theme.breakpoints.down('sm')]: {
		container: {
			flexDirection: 'column',
			gap: '5px',
		},
	},
}))
