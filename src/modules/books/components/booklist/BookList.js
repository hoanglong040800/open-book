import { Grid } from '@material-ui/core'
import Loading from 'common/components/loading/Loading'
import InfiniteScroll from 'react-infinite-scroll-component'
import BookCard from '../bookcard/BookCard'

export default function BookList({ list, next, hasMore }) {
  return (
    <InfiniteScroll
      dataLength={list.length}
      next={next}
      hasMore={hasMore}
      loader={<Loading />}
      style={{ overflow: 'visible' }}
    >
      <Grid container spacing={2}>
        {
          list.map((item, index) => (
            <Grid item xs={6} sm={4} md={3}>
              <BookCard key={index} item={index} />
            </Grid>
          ))
        }
      </Grid>
    </InfiniteScroll>
  )
}