import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";
import userActions from "./modules/user/userActions";
import authActions from "./modules/Auth/authActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.get("/api/users", userActions.brows);
router.post(
  "/api/user",
  userActions.verified,
  userActions.hashPassword,
  userActions.add,
);

router.post("/api/user/login", authActions.login);

/* ************************************************************************* */
// !!!!!!!!!!!!!!!!!!!!!!!!!!VERIFICATION WALL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
/* ************************************************************************* */

router.post("/api/user/verify", authActions.verifyToken, authActions.isLogged);

router.get("/api/user/name", userActions.browsName);

/* ************************************************************************* */

export default router;
