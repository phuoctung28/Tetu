import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem("user"));
    if (storageUser) {
      setUser(storageUser);
      console.log(user);
    }
  }, []);

  return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
