import { createContext } from "react";
import useAuthProvider from "../../hooks/Autenticação/useAuthProvider";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthContext;
