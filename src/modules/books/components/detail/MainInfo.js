import React from 'react'
import { IconButton, Typography } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import { useState } from 'react'

export default function MainInfo({ bookInfo }) {
	const [bookmark, setBookmark] = useState(false)
	const { name, authors } = bookInfo

	function handleClick() {
		setBookmark(prev => !prev)
	}

	return (
		<div>
			<Typography
				variant="h4"
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '10px',
				}}
			>
				{name}{' '}
				<IconButton
					aria-label="bookmark"
					color="secondary"
					onClick={handleClick}
				>
					{bookmark ? (
						<BookmarkIcon style={bookmarkStyle} />
					) : (
						<BookmarkBorderIcon style={bookmarkStyle} />
					)}
				</IconButton>
			</Typography>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '100px',
				}}
			>
				<Typography variant="subtitle1">by {authors}</Typography>
			</div>
		</div>
	)
}

const bookmarkStyle = {
	width: '40px',
	height: '40px',
}
