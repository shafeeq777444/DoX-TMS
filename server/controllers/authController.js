import asyncHandler from "../middlewares/asyncHandler.js";
import { loginUserService, registerUserService } from "../services/authService.js";


export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userData = await registerUserService({ name, email, password });
  res.status(201).json({userEmail:userData.email,
    message:"Registeration Completed"
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const {accessToken,refreshToken} = await loginUserService({ email, password });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: '/',
    maxAge:7*24*60*60*1000
});
res.cookie("accessToken", accessToken, {
    httpOnly: true, 
    secure: true,
    maxAge: 1*24*60*60*1000, 
    sameSite: "none", 
    path: '/'
});
  res.status(200).json({accessToken,refreshToken})

});
