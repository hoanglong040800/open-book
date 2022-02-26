import { Grid } from "@material-ui/core";
import Loading from "common/components/loading/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import BookCard from "../bookcard/BookCard";

export default function BookList({ list, next, hasMore }) {
  return (
    <InfiniteScroll
      dataLength={list.length}
      next={next}
      hasMore={hasMore}
      loader={<Loading />}
      style={{ overflow: "visible" }}
    >
      <Grid container spacing={6}>
        {list.map((item) => (
          <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
            <BookCard
              item={item}
            />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
}
