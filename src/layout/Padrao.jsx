import { Link, Outlet } from "react-router-dom";

const Padrao = ({ children }) => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/clientes">Clientes</Link>
        </li>

        <li>
          <Link to="/cobrancas">Cobrancas</Link>
        </li>
      </ul>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Padrao;
