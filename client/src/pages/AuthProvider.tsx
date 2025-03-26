import { createContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "react-toastify";
import type { AuthContextType } from "../types/vite-env";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);

  async function checkLogin() {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setIsLogged(false);
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/verify`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
        localStorage.removeItem("jwtToken");
        toast.error("Connexion expirée. Veuillez vous reconnecter");
      }
    } catch (err) {
      console.error(err);
      setIsLogged(false);
      toast.error("Une erreur s'est produite, veuillez réessayer.");
    }
  }
  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, checkLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
