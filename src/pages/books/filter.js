import HeadTitle from 'common/components/headtitle/HeadTitle'
import { getBooksByFilter } from 'modules/books/api/books.api'
import BookList from 'modules/books/components/booklist/BookList'
import { useEffect } from 'react'
import { BOOK_LIMIT } from 'common/constants/common.constant'
import { useRouter } from 'next/router'
import useState from 'react-usestateref'

export default function Filter() {
	const router = useRouter()
	const [books, setBooks, booksRef] = useState([])
	const [hasMore, setHasMore] = useState(true)
	const [params, setParams, paramsRef] = useState()

	/*
	 *	Hooks
	 */
	useEffect(async () => {
		setParams({ cursor:null, limit: BOOK_LIMIT, ...router.query })

		// reset value when change filter
		if(Object.keys(router.query).length !== 0) {
			setHasMore(true)
			setBooks([])
			getNextBooks()
		}
	}, [router.query])

	/*
	 * Async Functions
	 */

	async function getNextBooks() {
		const res = await getBooksByFilter(paramsRef.current)

		if (res.data == null) {
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
			<HeadTitle page="Filter" />

			<BookList list={books} next={getNextBooks} hasMore={hasMore} />
		</>
	)
}
