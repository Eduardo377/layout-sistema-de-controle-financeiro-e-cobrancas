import { useEffect } from "react";

const Home = ({ setTituloDaRota }) => {
  useEffect(() => {
    setTituloDaRota("Resumo das cobranças");
  }, []);

  return <div>Home</div>;
};

export default Home;
