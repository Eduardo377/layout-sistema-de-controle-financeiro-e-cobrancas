import { ThemeProvider } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";
import temaPersonalizado from "./temaPersonalizado";
import Routes from "./rotas";

function App() {
  return (
    <ThemeProvider theme={temaPersonalizado}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
