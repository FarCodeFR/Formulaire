import { useState } from "react";
import "./register.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    email: "",
    pseudo: "",
    password: "",
    passwordconfirme: "",
  });

  const [values, setValue] = useState({
    password: "",
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValue({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const { email, pseudo, password, passwordconfirme } = user;
    if (!email || !pseudo || !password || !passwordconfirme) {
      toast.error("Veuillez remplir touts les champs...");
    } else if (!emailRegex.test(email)) {
      toast.error("Email invalide");
    } else if (!passwordRegex.test(password)) {
      toast.error(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.",
      );
    } else if (!passwordRegex.test(passwordconfirme)) {
      toast.error(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.",
      );
    } else if (password !== passwordconfirme) {
      toast.error("Le mots de passe ne correspond pas");
    } else {
      const response = await fetch(`${import.meta.env.VIT_API_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        toast.success("Inscription réussie 🎉");
        navigate("/login");
      } else if (response.status === 409) {
        toast.error("Email déja utilisé");
      } else if (response.status === 408) {
        toast.error("Identifiant déja utilisé");
      } else {
        toast.error("Erreur avec l'application");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        onChange={handleChange}
        type="text"
        name="email"
        required
        placeholder="test@live.fr"
      />
      <label htmlFor="pseudo">Identifiant</label>
      <input
        name="pseudo"
        onChange={handleChange}
        type="text"
        required
        placeholder="test2"
      />
      <label htmlFor="password">Mots de passe</label>
      <button type="button" onClick={handleClickShowPassword}>
        <img src="public/images/oeil.png" alt="" />
      </button>
      <input
        onChange={handleChange}
        type={values.showPassword ? "text" : "password"}
        name="password"
        required
        placeholder="*****"
      />
      <label htmlFor="passwordconfirme">
        Confirmer votre mots de passe{" "}
        {`${user.password === user.passwordconfirme ? "✅" : "❌"}`}
      </label>
      <input
        onChange={handleChange}
        type="password"
        name="passwordconfirme"
        placeholder="*****"
        required
      />
      <button type="submit">S'inscrire</button>
    </form>
  );
}

export default Register;
