import express from "express";
import { check } from "express-validator";
import verifyToken from "../middleware/auth";
import { fetchCurrentUser, register } from "../controllers/users";

const router = express.Router();

router.get("/me", verifyToken, fetchCurrentUser);

router.post(
  "/register",
  [
    check("firstName", "First Name is required.").isString(),
    check("lastName", "Last Name is required.").isString(),
    check("email", "Email is required.").isEmail(),
    check(
      "password",
      "Password with 6 or more characters are required."
    ).isLength({ min: 6 }),
  ],
  register
);

export default router;
