import { useSession } from 'next-auth/client'
import { useContext } from 'react'
import { Box, IconButton, makeStyles, Typography } from '@material-ui/core'
import Link from 'next/link'
import { USER_ROLES } from 'common/constants'
import { BookmarkContext } from 'pages/books/[slug]'
import { Bookmark, BookmarkBorder } from '@material-ui/icons'

export default function MainInfo({ bookInfo: { name, authors } }) {
	const mui = useStyles()
	const [session] = useSession()
	const filterAuthorsUrl = `/books/filter?authors=${authors}`
	const {
		state: { isBookmarked },
		dispatch: { handleToggleBookmark },
	} = useContext(BookmarkContext)

	return (
		<>
			<Box className={mui.titleContainer}>
				<Typography variant="h4">{name}</Typography>

				<IconButton color="secondary" onClick={handleToggleBookmark}>
					{session?.user.role === USER_ROLES.viewer &&
						(isBookmarked ? (
							<Bookmark className={mui.bookmark} />
						) : (
							<BookmarkBorder className={mui.bookmark} />
						))}
				</IconButton>
			</Box>

			<Typography variant="subtitle1">
				by{' '}
				<Link href={filterAuthorsUrl}>
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
