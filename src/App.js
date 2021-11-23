import { ThemeProvider } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";
import temaPersonalizado from "./temaPersonalizado";
import Routes from "./rotas";

import "./estilos/global.css";

function App() {
  return (
    <ThemeProvider theme={temaPersonalizado}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
