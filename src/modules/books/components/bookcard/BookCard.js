import { MOCKUP_BOOK } from "common/constants/common.constant";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";
import VisibilityIcon from "@material-ui/icons/Visibility";

export default function BookCard({ img, title, rating, view }) {
  const classes = useStyles();

  return (
    <Card
      style={{
        boxShadow: "0 0 10px #bbb",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          alt={title}
          height={300}
          title={title}
          image={img}
          className={classes.bookCover}
        />
        <CardContent
          style={{
            backgroundColor: "rgba(238, 238, 238, 0.7)",
          }}
        >
          <Typography gutterBottom variant="h5" className={classes.title}>
            {title}
          </Typography>
          <div className={classes.lowerSection}>
            <Typography
              variant="body1"
              color="textSecondary"
              component="p"
              className={classes.rating}
            >
              {rating}{" "}
              <StarIcon color="secondary" className={classes.starIcon} />
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              component="p"
              className={classes.view}
            >
              <VisibilityIcon className={classes.viewIcon} /> {view}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  title: {
    minHeight: 70,
    marginBottom: 20,
    letterSpacing: 0.5,
  },

  rating: {
    display: "flex",
    alignItems: "center",
    marginRight: "auto",
  },

  view: {
    display: "flex",
    alignItems: "center",
  },

  starIcon: {
    marginLeft: "0.25rem",
  },

  viewIcon: {
    marginRight: "0.35rem",
  },

  lowerSection: {
    display: "flex",
  },

  bookCover: {
    objectFit: "contain",
    borderBottom: "1px solid #ccc",
  },
}));
