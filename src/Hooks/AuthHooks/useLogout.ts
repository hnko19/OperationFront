import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";




export const useLogout = () => {
  const { setUserToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    setUserToken("");
    localStorage.removeItem("fidsToken");
    navigate("/login"); // إعادة التوجيه لصفحة تسجيل الدخول
  };

  return logout;
};