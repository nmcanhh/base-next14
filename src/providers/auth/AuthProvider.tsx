'use client'

import { setCookie, deleteCookie, getCookie } from "@/utils/storage";
import { createContext, useContext, useEffect, useState } from "react";
import { UserSession } from "../../utils/types/auth";
import { LoginData } from "./auth_provider";

interface AuthContextData {
  isAuthenticated: boolean;
  currentUser: UserSession | null;
  logInSuccess: (_data: LoginData) => Promise<void>;
  logOutSuccess: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({
  isAuthenticated: false,
  currentUser: null,
  logInSuccess: () => Promise.resolve(),
  logOutSuccess: () => {},
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Watch currentUser
  useEffect(() => {
    // console.log("current user changed");
    if (!currentUser) {
      // try to get user from local storage
      const user = getCookie("currentUser");
      if (user) {
        setCurrentUser(JSON.parse(user) as UserSession);
        setIsAuthenticated(true);
      } else {
        setCurrentUser({});
        setIsAuthenticated(false);
      }
    }
  }, [currentUser]);

  const logInSuccess = async (data: any) => {
    const {
      accessToken,
      refreshToken,
      resultUser: { email, _id },
    } = data;

    // save access token in cookies
    setCookie("accessToken", accessToken);

    setCookie("refreshToken", refreshToken);

    const dataUser = {
      email,
      userId: _id,
    };
    setCookie("currentUser", JSON.stringify(dataUser));
    setCurrentUser(dataUser);
    setIsAuthenticated(true);
  };

  const logOutSuccess = () => {
    // Remove access token from cookies
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    deleteCookie("currentUser");

    // Clear provider state
    setCurrentUser(null);
    setIsAuthenticated(false);

    // Remove currentUser from cookies
    deleteCookie("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        logInSuccess,
        logOutSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  // Custom hook to use auth context
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
