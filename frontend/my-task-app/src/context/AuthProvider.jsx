import React, { createContext, useEffect, useState } from "react";
import { getMe } from "../api/auth";
import { isTokenExpired } from "../utils/token";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const token = localStorage.getItem("token");

      if (!token || isTokenExpired(token)) {
        localStorage.removeItem("token");
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const me = await getMe();
        setUser(me);
      } catch (err) {
        // Fallback to decode minimal JWT info
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          setUser({
            email: payload?.sub || null,
            role: payload?.role || null,
          });
        } catch {
          setUser(null);
          localStorage.removeItem("token");
        }
      }

      setLoading(false);
    }

    init();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login"; // Force rerender + redirect
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
