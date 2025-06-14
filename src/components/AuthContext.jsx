import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) 
{
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => 
  {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }
  }, []);

  // Modificado: ahora consulta la API para validar usuario y password
  const login = async (username, password) => 
  {
    // Acceso especial para admin
    if (username === "admin" && password === "1234") 
    {
      const tokenFalso = "dG9rZW5GYWxzbzEyMzQ=";
      setToken(tokenFalso);
      setUser(username);
      localStorage.setItem("token", tokenFalso);
      localStorage.setItem("user", username);
      return true;
    }

    // Validar contra la API de usuarios
    try {
      const res = await fetch("https://684d83f765ed0871391657f8.mockapi.io/api/v1/usuarios");
      const users = await res.json();
      // Busca por username y password
      const found = users.find(u => u.username === username && u.password === password);
      if (found) {
        const tokenFalso = "tokenUsuarioNormal";
        setToken(tokenFalso);
        setUser(username);
        localStorage.setItem("token", tokenFalso);
        localStorage.setItem("user", username);
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const logout = () => 
  {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);