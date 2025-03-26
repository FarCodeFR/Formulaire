import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

export type User = {
  id: number;
  email: string;
  pseudo: string;
  password: string;
};

class userRepository {
  async create(user: User) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user (email, pseudo, password) VALUES (?,?,?)",
      [user.email, user.pseudo, user.password],
    );
    return result.insertId;
  }

  async readName() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT pseudo FROM user",
      [],
    );
    return rows as User[];
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM user");
    return rows as User[];
  }

  async verifyEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE email = ?",
      [email],
    );
    return rows[0] as User;
  }
  async verifyPseudo(pseudo: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE pseudo = ?",
      [pseudo],
    );
    return rows[0] as User;
  }
  async emailExiste(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE email = ?",
      [email],
    );
    return rows[0] as User;
  }
}

export default new userRepository();
