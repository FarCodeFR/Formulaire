import type { RequestHandler } from "express";
import userRepository from "../user/userRepository";
import { verify } from "argon2";
import type { JwtPayload } from "jsonwebtoken";
import jwt, { sign } from "jsonwebtoken";

const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userRepository.emailExiste(email);
  if (user === null || user === undefined) {
    res.status(404).json({ message: "Email invalide !" });
    return;
  }

  try {
    const isValide = await verify(user.password, password);

    if (isValide) {
      const payload = {
        id: user.id,
        email: user.email,
        pseudo: user.pseudo,
      };
      const secretKey = process.env.APP_SECRET;
      if (!secretKey) {
        throw new Error("APP_SECRET is not defined");
      }
      const token = sign(payload, secretKey, { expiresIn: "1h" });
      res.json({ token, email: user.email, pseudo: user.pseudo });
      return;
    }
    if (!isValide) {
      res.status(404).json({ message: "Mot de passe incorrect !" });
    } else {
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalide" });
    return;
  }
};

const verifyToken: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      throw new Error("Pas de token");
    }
    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer") {
      throw new Error("Token invalide");
    }
    const secretKey = process.env.APP_SECRET;
    if (!secretKey) {
      throw new Error("APP_SECRET n'est pas défini");
    }
    const decodedToken = jwt.verify(token, secretKey) as JwtPayload;
    if (decodedToken !== undefined) {
      res.locals.decodedToken = decodedToken;
      next();
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Token invalide" });
  }
};

const isLogged: RequestHandler = (req, res) => {
  if (res.locals.decodedToken) {
    res.status(200).json({ message: "Vous êtes connecté" });
    return;
  }
  res.sendStatus(403);
};

export default { login, isLogged, verifyToken };
