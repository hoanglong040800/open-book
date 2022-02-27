import HeadTitle from 'common/components/headtitle/HeadTitle'
import { getBooksByFilter } from 'modules/books/api/books.api'
import BookList from 'modules/books/components/booklist/BookList'
import { useEffect } from 'react'
import { useState } from 'react'
import { BOOK_LIMIT } from 'common/constants/common.constant'

export default function Home() {
	const [books, setBooks] = useState([])
	const [params, setParams] = useState({
		cursor: null,
		limit: BOOK_LIMIT,
	})
	const [hasMore, setHasMore] = useState(true)

	/*
	 *	Hooks
	 */
	useEffect(() => {
		console.clear()
		getNextBooks()
	}, [])

	/*
	 * Async Functions
	 */
	async function getNextBooks() {
		const res = await getBooksByFilter(params)
		if (res.data == null) {
			setHasMore(false)
			return
		}
		setParams({ ...params, cursor: res.paging.next_cursor })
		setBooks([...books, ...res.data])
	}

	/*
	 *	JSX
	 */
	return (
		<>
			<HeadTitle page="home" />

			<BookList list={books} next={getNextBooks} hasMore={hasMore} />
		</>
	)
}
