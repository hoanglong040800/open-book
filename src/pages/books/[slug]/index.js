import { Container, Grid } from "@material-ui/core";
import HeadTitle from "common/components/headtitle/HeadTitle";
import { getBookById } from "modules/books/api/books.api";
import { useEffect } from "react";
import { useState } from "react";
import ImageContainer from "modules/books/components/detail/ImageContainer";
import MainInfo from "modules/books/components/detail/MainInfo";
import Description from "modules/books/components/detail/Description";
import Tags from "modules/books/components/detail/Tags";
import MoreInfo from "modules/books/components/detail/MoreInfo";

export async function getServerSideProps(ctx) {
  return {
    props: {
      slug: ctx.query.slug,
    },
  };
}

export default function ViewBook({ slug }) {
  const gridProps = {
    imgSection: {
      xs: 12,
      md: 4,
      lg: 3,
    },

    infoSection: {
      xs: 12,
      md: 8,
      lg: 9,
    },
  };

  const tags = [
    "romance",
    "fantasy",
    "thriller",
    "philosophy",
    "history",
    "war",
  ];

  const [bookInfo, setBookInfo] = useState();

  useEffect(() => {
    async function getBookInfo() {
      const data = await getBookById(slug);
      setBookInfo(data);
    }
    getBookInfo();
  }, [slug]);

  return (
    <>
      <HeadTitle page="detail" />
      {bookInfo && (
        <Container>
          <Grid container spacing={4}>
            <Grid
              container
              item
              justifyContent="center"
              {...gridProps.imgSection}
            >
              <ImageContainer thumbnail={bookInfo.thumbnail.link_storage} />
            </Grid>
            <Grid item {...gridProps.infoSection}>
              <MainInfo
                title={bookInfo.name}
                authors={bookInfo.authors}
                view={bookInfo.view}
              />
              <br />
              <MoreInfo
                publishedYear={bookInfo.published_year}
                pages={bookInfo.pages}
                publisher={bookInfo.publisher}
              />
              <Description summary={bookInfo.summary} />
              <Tags tags={tags} />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}
