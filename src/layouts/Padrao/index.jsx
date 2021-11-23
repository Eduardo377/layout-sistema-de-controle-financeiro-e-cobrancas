import { Outlet, Link as RouterLink, useLocation } from "react-router-dom";
import { Box, Link, Container, Avatar, Button } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import HomeIcone from "../../icones/Home";
import ClientesIcone from "../../icones/Clientes";
import CobrancasIcone from "../../icones/Cobrancas";
import estilo from "./estilo.module.css";

const Default = () => {
  const { pathname } = useLocation();

  const tamanhoIcone = 3;
  const menuLinks = [
    {
      url: "/",
      nome: "Home",
      icone: <HomeIcone size={tamanhoIcone} />,
    },
    {
      url: "/clientes",
      nome: "Clientes",
      icone: <ClientesIcone size={tamanhoIcone} />,
    },
    {
      url: "/cobrancas",
      nome: "Cobranças",
      icone: <CobrancasIcone size={tamanhoIcone} />,
    },
  ];

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
          {menuLinks.map((item) => {
            return (
              <Box
                width="100%"
                key={item.nome}
                color={pathname !== item.url ? "inherit" : "primary.main"}
                sx={{
                  borderRight: `2px solid ${
                    pathname === item.url ? "currentColor" : "transparent"
                  }`,
                }}
              >
                <Link
                  component={RouterLink}
                  to={item.url}
                  color={pathname !== item.url ? "inherit" : "primary"}
                >
                  {item.icone}
                  <Box component="span">{item.nome}</Box>
                </Link>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box flex="1" paddingX={4}>
        <Box
          paddingTop={4}
          paddingBottom={2}
          marginBottom={2}
          sx={{ borderBottom: "1px solid #ACD9C5" }}
        >
          <Container maxWidth="lg">
            <Box display="flex" alignItems="center">
              <Box component="h2" margin={0} flex="1">
                Resumo das cobranças
              </Box>

              <Box
                display="flex"
                alignItems="center"
                sx={{ color: "#0E8750", cursor: "pointer" }}
              >
                <Box marginRight={2}>
                  <Avatar>LR</Avatar>
                </Box>
                <Box component="h3" margin={0} fontWeight="600">
                  Lorena
                </Box>
                <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
              </Box>
            </Box>
          </Container>
        </Box>
        <main>
          <Container maxWidth="lg">
            <Outlet />
          </Container>
        </main>
      </Box>
    </Box>
  );
};

export default Default;
