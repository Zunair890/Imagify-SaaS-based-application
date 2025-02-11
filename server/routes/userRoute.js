import express from "express"
import { loginUser, registerUser, userCredits } from "../controllers/userController.js";
import { userAuth } from "../middleware/userAuth.js";

const userRouter= express.Router();

userRouter.post("/register",registerUser)   // http://localhost:4000/api/user/register
userRouter.post("/login",loginUser)
userRouter.get("/credits",userAuth,userCredits)


export default userRouter