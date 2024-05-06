import express from "express";
import { check } from "express-validator";
import verifyToken from "../middleware/auth";
import { login, logout, validateToken } from "../controllers/auth";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required.").isEmail(),
    check(
      "password",
      "Password with 6 or more characters are required."
    ).isLength({ min: 6 }),
  ],
  login
);

router.get("/validate-token", verifyToken, validateToken);

router.post("/logout", logout);

export default router;
