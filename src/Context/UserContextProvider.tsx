import React, { useState } from "react";
import { UserContext } from "./UserContext";

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState(
    localStorage.getItem("operationsUserId") ?? "",
  );

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}
