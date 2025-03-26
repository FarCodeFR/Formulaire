import type { RequestHandler } from "express";
import userRepository, { type User } from "./userRepository";
import argon2 from "argon2";
const brows: RequestHandler = async (req, res, next) => {
  try {
    const users = await userRepository.readAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
const browsName: RequestHandler = async (req, res, next) => {
  try {
    const user = await userRepository.readName();
    res.json(user);
  } catch (err) {
    console.error(err);
  }
};
const add: RequestHandler = async (req, res, next) => {
  try {
    const newUser: {
      id: number;
      email: string;
      pseudo: string;
      password: string;
    } = req.body;
    const insertId = await userRepository.create(newUser);
    res.status(201).json({ insertId });
  } catch (err) {
    console.error(err);
  }
};

const verified: RequestHandler = async (req, res, next) => {
  try {
    const { email, pseudo } = req.body;
    const existeEmail = await userRepository.verifyEmail(email);
    const existePseudo = await userRepository.verifyPseudo(pseudo);
    if (existeEmail) {
      res.status(409).send("Email déja utilisé");
      return;
    }
    if (existePseudo) {
      res.status(408).send("Identifiant déja utilisé");
      return;
    }
    next();
  } catch (err) {
    console.error(err);
  }
};

const hashPassword: RequestHandler = async (req, res, next) => {
  //Definir les options de hashage
  const hashOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 17,
    hashLength: 50,
    parallelism: 1,
    iteration: 2,
  };
  try {
    const { password } = req.body;
    const hash = await argon2.hash(password, hashOptions);
    if (hash) {
      req.body.password = hash;
      next();
    }
  } catch (err) {
    next(err);
  }
};
export default { add, brows, verified, hashPassword, browsName };
