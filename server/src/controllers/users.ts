import { Request, Response } from "express";
import usersService from "../services/users";
import { validationResult } from "express-validator";

export const fetchCurrentUser = async (req: Request, res: Response) => {
  const { userId } = req;

  try {
    const {status, result} = await usersService.fetchCurrentUser(userId);
    
    res.status(status).json(result);
  } catch (error) {
    console.log("Error: getting my details \n", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const register = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const userData = req.body;

    try {
      const {status, result, token} = await usersService.register(userData);

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      return res.status(status).json(result);
    } catch (error) {
      console.log("Error: registering user \n", error);
      res.status(500).json({ message: "Something went wrong" });
    }
}