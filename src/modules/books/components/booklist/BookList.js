import { Grid } from "@material-ui/core";
import Loading from "common/components/loading/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import BookCard from "../bookcard/BookCard";
import { MOCKUP_BOOK } from "common/constants/common.constant";

export default function BookList({ list, next, hasMore }) {
  return (
    <InfiniteScroll
      dataLength={list.length}
      next={next}
      hasMore={hasMore}
      loader={<Loading />}
      style={{ overflow: "visible" }}
    >
      <Grid container spacing={4}>
        {list.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <BookCard
              img={MOCKUP_BOOK.thumbnail.link_storage}
              title={MOCKUP_BOOK.name}
              rating={MOCKUP_BOOK.rating}
              view={MOCKUP_BOOK.view}
            />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
}
