import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "#F8F8F9",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#da0175",
    },
  },
  props: {
    MuiButton: {
      size: "small",
      variant: "contained",
      color: "primary",
    },
  },
});

export default theme;
