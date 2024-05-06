import { Request, Response } from "express";
import { validationResult } from "express-validator";
import authService from "../services/auth";

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const { status, result, token } = await authService.login(email, password);

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    res.status(status).json(result);
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: "Something went wrong." });
  }
};

export const validateToken = (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
};

export const logout = (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });

  res.send();
};
