import { NavLink, useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "./UseAuth";

function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const { setIsLogged } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = login;
    if (!email || !password) {
      toast.error("Veuillez remplir les champs");
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(login),
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Erreur d'authentification";
        toast.error(errorMessage);
        return;
      }
      const data = await response.json();

      if (data.token) {
        localStorage.setItem("jwtToken", data.token);
        setIsLogged(true);
        navigate("/home");
        toast.success("Vous êtes connecté !");
      } else {
        toast.error(
          "Email ou mot de passe non-reconnu. Veuillez réessayer ou vous inscrire.",
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange}
          type="text"
          name="email"
          required
          placeholder="toto@live.fr"
        />
        <label htmlFor="password">Mots de passe</label>
        <input
          onChange={handleChange}
          type="password"
          required
          name="password"
          placeholder="*******"
        />
        <button type="submit">Login</button>
        <NavLink className="register-button" to="/register">
          <button type="button">Register</button>
        </NavLink>
      </form>
    </>
  );
}

export default Login;
