import { Outlet, Link as RouterLink, useLocation } from "react-router-dom";
import { Box, Link } from "@material-ui/core";

import HomeIcone from "../../icones/Home";
import ClientesIcone from "../../icones/Clientes";
import CobrancasIcone from "../../icones/Cobrancas";
import estilo from "./estilo.module.css";

const Default = () => {
  const { pathname } = useLocation();

  return (
    <Box display="flex" minHeight="100vh">
      <Box sx={{ background: "#f0f0f5" }}>
        <Box
          display="flex"
          flexDirection="column"
          sx={{ gap: "2rem" }}
          alignItems="center"
          paddingY="2rem"
          className={estilo.menu}
        >
          <Link
            component={RouterLink}
            to="/"
            color={pathname !== "/" ? "inherit" : "primary"}
          >
            <HomeIcone size="3" />
            <Box component="span">Home</Box>
          </Link>

          <Link
            component={RouterLink}
            to="/clientes"
            color={pathname !== "/clientes" ? "inherit" : "primary"}
          >
            <ClientesIcone size="3" />
            <Box component="span">Clientes</Box>
          </Link>

          <Link
            component={RouterLink}
            to="/cobrancas"
            color={pathname !== "/cobrancas" ? "inherit" : "primary"}
          >
            <CobrancasIcone size="3" />
            <Box component="span">Cobranças</Box>
          </Link>
        </Box>
      </Box>
      <Box flex="1">
        <main>
          <Outlet />
        </main>
      </Box>
    </Box>
  );
};

export default Default;
