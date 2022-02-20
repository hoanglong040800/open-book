import HeadTitle from "common/components/headtitle/HeadTitle";
import { getAllBooks } from "modules/books/api/books.api";
import BookList from "modules/books/components/booklist/BookList";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "common/components/loading/Loading";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  function fetchMoreData() {
    // only have 18 books at the moment
    if (books.length >= 18) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setBooks(books.concat(Array.from({ length: 8 })));
    }, 500);
  }

  // fetch all books
  useEffect(() => {
    async function getBooks() {
      setIsLoading((prev) => !prev);
      const data = await getAllBooks();
      setBooks(data);
      setIsLoading((prev) => !prev);
    }
    getBooks();
  }, []);

  return (
    <>
      <HeadTitle page="home" />

      <h1>Home Page</h1>

      {isLoading ? (
        <Loading />
      ) : (
        <BookList list={books} next={fetchMoreData} hasMore={hasMore} />
      )}
    </>
  );
}
