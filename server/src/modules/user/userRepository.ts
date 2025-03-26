import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

export type User = {
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

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM user");
    return rows as User[];
  }
}

export default new userRepository();
