import type { RequestHandler } from "express";
import userRepository, { type User } from "./userRepository";

const brows: RequestHandler = async (req, res, next) => {
  try {
    const users = await userRepository.readAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
const add: RequestHandler = async (req, res, next) => {
  try {
    const newUser: { email: string; pseudo: string; password: string } =
      req.body;
    const insertId = await userRepository.create(newUser);
    res.status(201).json({ insertId });
  } catch (err) {
    console.error(err);
  }
};

export default { add, brows };
