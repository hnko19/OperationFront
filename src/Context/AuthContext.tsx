import { createContext } from "react";
type AuthContextType = {
  userToken: string;
  setUserToken: (value: string) => void;
};

export const AuthContext = createContext<AuthContextType>({
  userToken: "",
  setUserToken: () => {},
});
