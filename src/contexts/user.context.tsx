import { createContext, FC, ReactNode, useContext, useState } from "react";

import { UserContextType } from "../types/context.types";
import { user as UserType } from "../types/user.types";
import { STORAGE_CONSTANTS } from "../constants/storage.constants";

const UserContext = createContext<UserContextType | undefined>({
  user: null,
  access_token: null,
  login: () => { },
  logout: () => { },
  isLoggedIn: false
})

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_CONSTANTS.user);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      return null;
    }
  });

  const [access_token, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_CONSTANTS.access_token) || null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return user ? true : false;
  })

  const login = (user: UserType, access_token: string) => {
    setUser(user);
    setAccessToken(access_token);
    localStorage.setItem(STORAGE_CONSTANTS.user, JSON.stringify(user));
    localStorage.setItem(STORAGE_CONSTANTS.access_token, access_token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem(STORAGE_CONSTANTS.user);
    localStorage.removeItem(STORAGE_CONSTANTS.access_token);
    setIsLoggedIn(false)
  };

  return <UserContext.Provider value={{
    user,
    access_token,
    login,
    logout,
    isLoggedIn
  }}>{children}</UserContext.Provider>
}

// Custom hook to use the UserContext
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error('useUserContext must be used within a UserProvider');
  return context;
};
