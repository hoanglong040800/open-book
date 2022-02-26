import HeadTitle from 'common/components/headtitle/HeadTitle'
import { getAllBooks } from 'modules/books/api/books.api'
import BookList from 'modules/books/components/booklist/BookList'
import { useEffect } from 'react'
import { useState } from 'react'
import Loading from 'common/components/loading/Loading'

export default function Home() {
	const [books, setBooks] = useState()
	const [hasMore, setHasMore] = useState(true)

	function fetchMoreData() {
		// only have 18 books at the moment
		if (books.length >= 18) {
			setHasMore(false)
			return
		}

		setTimeout(() => {
			setBooks(books.concat(Array.from({ length: 8 })))
		}, 500)
	}

	/*
			Hooks
	*/
	useEffect(() => {
		async function getBooks() {
			const data = await getAllBooks()
			setBooks(data)
			console.log(data)
		}
		getBooks()
	}, [])

	/*
			JSX
	*/
	return (
		<>
			<HeadTitle page="home" />

			{books ? (
				<BookList list={books} next={fetchMoreData} hasMore={hasMore} />
			) : (
				<Loading />
			)}
		</>
	)
}
