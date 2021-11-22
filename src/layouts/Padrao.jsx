import { Outlet, Link } from "react-router-dom";

const Default = () => {
  return (
    <>
      <p>LAYOUT PADRAO</p>
      <nav>
        <ul>
          <li>
            <Link to="/">Início</Link>
          </li>
          <li>
            <Link to="/clientes">Clientes</Link>
          </li>
          <li>
            <Link to="/cobrancas">Cobranças</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Default;
