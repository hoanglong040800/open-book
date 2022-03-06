import React from 'react'
import { Box, IconButton, makeStyles, Typography } from '@material-ui/core'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import { useState } from 'react'
import Link from 'next/link'

export default function MainInfo({ bookInfo }) {
	const [bookmark, setBookmark] = useState(false)
	const { name, authors } = bookInfo
	const mui = useStyles()
	const href = `/books/filter?authors=${authors}`

	function handleClick() {
		setBookmark(prev => !prev)
	}

	return (
		<>
			<Box className={mui.titleContainer}>
				<Typography variant="h4">{name}</Typography>

				<IconButton color="secondary" onClick={handleClick}>
					{bookmark ? (
						<BookmarkIcon className={mui.bookmark} />
					) : (
						<BookmarkBorderIcon className={mui.bookmark} />
					)}
				</IconButton>
			</Box>

			<Typography variant="subtitle1">
				by{' '}
				<Link href={href}>
					<a className={mui.link}>{authors}</a>
				</Link>
			</Typography>
		</>
	)
}

const useStyles = makeStyles(theme => ({
	titleContainer: {
		display: 'flex',
		alignItems: 'center',
		gap: 10,
	},

	bookmark: {
		width: 40,
	},

	link: {
		color: theme.palette.primary.main,

		'&:hover': {
			textDecoration: 'underline',
		},
	},
}))
