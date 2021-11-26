import { useContext } from "react";
import AuthContext from "../../contextos/AuthContext";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
