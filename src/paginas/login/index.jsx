import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/Autenticação/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      return navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  return <div>Login</div>;
};

export default Login;
