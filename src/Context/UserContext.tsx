import { createContext } from "react";
type UserContextType = {
  userId: string;
  setUserId: (value: string) => void;
};

export const UserContext = createContext<UserContextType>({
  userId: "",
  setUserId: () => {},
});
