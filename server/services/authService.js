
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import CustomError from "../middlewares/customError.js";
import { generateAccessToken, generateRefreshToken } from "../middlewares/generateToken.js";

/**
 * Register User
 */
export const registerUserService = async ({ name, email, password }) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new CustomError("User already exists", 400);
  const user = await User.create({ name, email, password });
    return user
};

/**
 * Login User
 */
export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new CustomError("Invalid credentials", 401);
  }
  const accessToken =await generateAccessToken(user);
  const refreshToken =await generateRefreshToken(user);
  return {accessToken,refreshToken}
};
