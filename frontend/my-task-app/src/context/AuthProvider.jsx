import React, { useState, useEffect } from "react";
import { getMe } from "../api/auth";
import { isTokenExpired } from "../utils/token";

// IMPORT the context from the new file
import { AuthContext } from "./AuthContext"; 

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
      } catch {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          setUser({
            email: payload?.sub ?? null,
            role: payload?.role ?? null,
            id: null,
            departmentId: null,
            departmentName: null,
          });
        } catch {
          localStorage.removeItem("token");
          setUser(null);
        }
      }

      setLoading(false);
    }

    init();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}