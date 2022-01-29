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
              className={classes.footerHead}
            >
              Theses Share
            </Typography>

            <Typography variant="subtitle1" align="center" gutterBottom>
              <span className={classes.link}>
                <Link href="/">Trang chủ</Link>
              </span>
              <span className={classes.whiteLine}>|</span>
              <span className={classes.link}>
                <Link href="/about">Về chúng tôi</Link>
              </span>
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="subtitle2" className={classes.info}>
              <div>Địa chỉ: 503B Minh Phụng, Phường 9, Quận 11, TP.HCM</div>
              <div>SĐT: (+84) 9633623</div>
              <div>Email: 18520093@gm.uit.edu.vn</div>
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="subtitle2" align="center">
          Copyright &copy; 2021 Theses Share
        </Typography>
      </Container>
    </footer>
  );
}

const useStyle = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: "#ddd",
    padding: "1.5rem 0 0.5rem",
  },

  container: {
    margin: "1rem 0",
  },

  [theme.breakpoints.down("sm")]: {
    info: {
      textAlign: "center",
    },
  },

  [theme.breakpoints.up("md")]: {
    info: {
      borderRight: "1px solid #ddd",
      paddingRight: "1rem",
      textAlign: "right",
    },
  },

  footerHead: {
    color: "white",
    fontWeight: "bold",
  },

  link: {
    "&:hover": {
      textDecoration: "underline",
    },
  },

  whiteLine: {
    padding: "0 10px",
  },
}));
