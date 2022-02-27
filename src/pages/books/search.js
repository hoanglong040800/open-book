import HeadTitle from 'common/components/headtitle/HeadTitle'
import { getBooksBySearch } from 'modules/books/api/books.api'
import BookList from 'modules/books/components/booklist/BookList'
import { useEffect } from 'react'
import { BOOK_LIMIT } from 'common/constants/common.constant'
import { useRouter } from 'next/router'
import useState from 'react-usestateref'
import { makeStyles } from '@material-ui/styles'

export default function Search() {
	const mui = useStyles()
	const router = useRouter()
	const [books, setBooks, booksRef] = useState([])
	const [hasMore, setHasMore] = useState(true)
	const [params, setParams, paramsRef] = useState({
		search_query: null,
		cursor: null,
		limit: BOOK_LIMIT,
	})

	/*
	 *	Hooks
	 */
	useEffect(async () => {
		setParams({ ...params, cursor: null, search_query: router.query.q })

		if (paramsRef.current.search_query) {
			setHasMore(true)
			setBooks([])
			getNextBooks()
		}
	}, [router.query.q])

	/*
	 * Async Functions
	 */

	async function getNextBooks() {
		const res = await getBooksBySearch(paramsRef.current)

		if (res.data.length == 0) {
			setHasMore(false)
			return
		}

		setParams({ ...paramsRef.current, cursor: res?.paging.next_cursor })
		setBooks([...booksRef.current, ...res.data])
	}

	/*
	 *	JSX
	 */
	return (
		<>
			<HeadTitle page="Search" />

			<h1 className={mui.title}>Search result for: {router.query.q}</h1>

			<BookList list={books} next={getNextBooks} hasMore={hasMore} />
		</>
	)
}

const useStyles = makeStyles(theme => ({
	title: {
		marginBottom: theme.spacing(5),
	},
}))
