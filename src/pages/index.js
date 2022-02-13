import HeadTitle from 'common/components/headtitle/HeadTitle'
import BookList from 'modules/books/components/booklist/BookList'
import { useState } from 'react'

export default function Home() {
  const [books, setBooks] = useState(Array.from({ length: 20 }))
  const [hasMore, setHasMore] = useState(true)

  function fetchMoreData() {
    if (books.length >= 100) {
      setHasMore(false)
      return
    }

    setTimeout(() => {
      setBooks(books.concat(Array.from({ length: 8 })));
    }, 500);
  }

  return (
    <>
      <HeadTitle page='home' />

      <h1>Home Page</h1>

      <BookList
        list={books}
        next={fetchMoreData}
        hasMore={hasMore}
      />
    </>
  )
}
