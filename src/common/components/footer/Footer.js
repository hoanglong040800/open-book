import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import Link from "next/link";

export default function Footer() {
  const classes = useStyle();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="xl">
        <Grid container className={classes.container}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              align="center"
              className={classes.footerHeading}
            >
              EBook Share
            </Typography>

            <Typography variant="subtitle1" align="center" gutterBottom>
              <span className={classes.link}>
                <Link href="/">Home page</Link>
              </span>
              <span className={classes.whiteLine}>|</span>
              <span className={classes.link}>
                <Link href="/about">About us</Link>
              </span>
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className={classes.infoHeading}>
              About us
            </Typography>
            <Typography variant="subtitle2" className={classes.info}>
              EBook Share is a website where Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Aspernatur, blanditiis.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className={classes.infoHeading}>
              Social media
            </Typography>
            <Typography variant="subtitle2" className={classes.info}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum, provident ducimus, iure consequuntur fuga quos
              inventore possimus natus quod facere rem sapiente neque
              perferendis ad alias iusto sint, aliquid magnam.
            </Typography>
          </Grid>
        </Grid>
        <hr className={classes.lineBreak} />
        <Typography variant="subtitle2" className={classes.copyright}>
          Copyright &copy; 2021 EBook Share
        </Typography>
      </Container>
    </footer>
  );
}

const useStyle = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    padding: "0.5rem 0",
  },

  container: {
    margin: "1rem 0",
  },

  [theme.breakpoints.down("sm")]: {
    infoHeading: {
      marginTop: "1.25rem",
    },
  },

  [theme.breakpoints.up("md")]: {
    info: {
      borderLeft: "1px solid #fff",
      padding: "0 1rem",
    },
  },

  footerHeading: {
    color: "white",
    fontWeight: "bold",
  },

  infoHeading: {
    marginBottom: "0.3rem",
  },

  link: {
    "&:hover": {
      textDecoration: "underline",
    },
  },

  whiteLine: {
    padding: "0 10px",
  },

  lineBreak: {
    opacity: 0.4,
  },

  copyright: {
    opacity: 0.4,
  },
}));
