import User from "../models/user";
import jwt from "jsonwebtoken";
import { UserType } from "../shared/types";

const fetchCurrentUser = async (userId: string) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    return {
      status: 400,
      result: {
        message: "User not found",
      },
    };
  }

  return {
    status: 200,
    result: user,
  };
};

const register = async (userData: UserType) => {
  let user = await User.findOne({
    email: userData.email,
  });

  if (user) {
    return {
      status: 400,
      result: {
        message: "User already exists",
      },
    };
  }

  user = new User(userData);
  await user.save();

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "1d",
    }
  );

  return {
    status: 200,
    result: {
        message: "User registered"
    },
    token
  }
};

export default {
  fetchCurrentUser,
  register,
};
