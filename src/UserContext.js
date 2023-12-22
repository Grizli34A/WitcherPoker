import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [userName, setUserNameContext] = useState("");

  const value = {
    userName,
    setUserNameContext,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
