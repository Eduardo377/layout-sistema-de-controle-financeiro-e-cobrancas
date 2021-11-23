import { Box } from "@material-ui/core";

import CobrancasIcone from "../../icones/CobrancasPagas";
import CobrancasVencidas from "../../icones/CobrancasVencidas";
import CobrancasPrevistas from "../../icones/CobrancasPrevistas";

import estilo from "./inicio.module.css";

const Home = () => {
  return (
    <Box>
      <Box display="flex" sx={{ gap: "2rem" }}>
        <Box
          display="flex"
          alignItems="center"
          flex="1"
          className={`${estilo.cardResumo} ${estilo.cardResumoPagas}`}
        >
          <CobrancasIcone size={3} />
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            flex="1"
          >
            <Box component="h3" margin={0} marginBottom={1}>
              Cobranças Pagas
            </Box>
            <Box component="span" fontWeight="fontWeightBold" fontSize={20}>
              R$ 30.000
            </Box>
          </Box>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          flex="1"
          className={`${estilo.cardResumo} ${estilo.cardResumoVencidas}`}
        >
          <CobrancasVencidas size={3} />
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            flex="1"
          >
            <Box component="h3" margin={0} marginBottom={1}>
              Cobranças Vencidas
            </Box>
            <Box component="span" fontWeight="fontWeightBold" fontSize={20}>
              R$ 7.000
            </Box>
          </Box>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          flex="1"
          className={`${estilo.cardResumo} ${estilo.cardResumoPrevistas}`}
        >
          <CobrancasPrevistas size={3} />
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            flex="1"
          >
            <Box component="h3" margin={0} marginBottom={1}>
              Cobranças Previstas
            </Box>
            <Box component="span" fontWeight="fontWeightBold" fontSize={20}>
              R$ 10.000
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
