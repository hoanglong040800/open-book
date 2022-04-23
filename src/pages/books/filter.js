import HeadTitle from 'common/components/headtitle/HeadTitle'
import { getBooksByFilter } from 'modules/books/api/books.api'
import BookList from 'modules/books/components/booklist/BookList'
import { useEffect } from 'react'
import { BOOK_LIMIT } from 'common/constants/common.constant'
import { useRouter } from 'next/router'
import useState from 'react-usestateref'
import { FilterController } from 'modules/books/components/filtercontroller/FilterController'
import { getAllGenres } from 'modules/common/api/common.api'
import { filterObject } from 'common/utils/common.util'

export default function Filter() {
	const router = useRouter()
	const [books, setBooks, booksRef] = useState([])
	const [hasMore, setHasMore] = useState(true)
	const [params, setParams, paramsRef] = useState()
	const [genres, setGenres] = useState([])

	useEffect(async () => {
		setParams({ cursor: null, limit: BOOK_LIMIT, ...router.query })

		genres.length == 0 && getGenres()

		// reset value when change filter
		if (Object.keys(router.query).length !== 0) {
			setHasMore(true)
			setBooks([])
			getNextBooks()
		}
	}, [router.query])


	async function getNextBooks() {
		const res = await getBooksByFilter(paramsRef.current)

		if (res.data == null) {
			setHasMore(false)
			return
		}

		setParams({ ...paramsRef.current, cursor: res?.paging.next_cursor })
		setBooks([...booksRef.current, ...res.data])
	}

	async function getGenres() {
		const data = await getAllGenres()
		setGenres(data)
	}

	/*
	 * Functions
	 */

	function onChangeFilter(query) {
		// clean empty data -> cleaner url
		const newQuery = filterObject(query, value => value !== '')

		router.push({
			pathname: '/books/filter',
			query: newQuery,
		})
	}

	return (
		<>
			<HeadTitle page="Filter" />

			<FilterController params={router.query} genres={genres} onChangeFilter={onChangeFilter} />

			<BookList list={books} next={getNextBooks} hasMore={hasMore} />
		</>
	)
}
