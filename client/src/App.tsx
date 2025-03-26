import { Link, Outlet } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import useAuth from "./pages/UseAuth";
import { useEffect, useState } from "react";
import type { UserName } from "./types/vite-env";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  pseudo: string;
}

function App() {
  const { isLogged, setIsLogged } = useAuth();
  const [user, setUser] = useState<UserName>();

  useEffect(() => {
    if (isLogged) {
      const token = localStorage.getItem("jwtToken"); // Récupère le token depuis localStorage
      if (token) {
        try {
          // Décoder le token pour obtenir les données de l'utilisateur
          const decodedToken = jwtDecode<DecodedToken>(token);
          // On crée un objet utilisateur à partir des informations décodées
          setUser({ pseudo: decodedToken.pseudo });
        } catch (err) {
          console.error("Erreur lors du décodage du token", err);
        }
      }
    }
  }, [isLogged]);

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setIsLogged(false);
  };

  return (
    <>
      <header>
        <Link to="/login">
          {isLogged === true ? <h1>{user?.pseudo}</h1> : <h1>Login</h1>}
        </Link>
        {isLogged === true ? (
          <Link onClick={logout} to="/login">
            Disconnect
          </Link>
        ) : (
          ""
        )}
      </header>
      <ToastContainer autoClose={1500} />
      <Outlet />
    </>
  );
}

export default App;
