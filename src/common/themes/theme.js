import { createTheme } from "@material-ui/core";
import { red, deepOrange, teal } from "@material-ui/core/colors";

const theme = createTheme({
  palette: {
    primary: {
      light: teal[200],
      main: teal[400],
      dark: teal[600],
    },
    secondary: {
      light: deepOrange[400],
      main: deepOrange[500],
      dark: deepOrange[600],
    },
    error: {
      main: red[400],
    },

    background: {
      default: "#fff",
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 480, //default: 600
      md: 768, //default: 960
      lg: 1024, //default: 1280
      xl: 1280, //default: 1920
    },
  },

  typography: {
    button: {
      textTransform: "inherit",
    },
  },
});

export default theme;
