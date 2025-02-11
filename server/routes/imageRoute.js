import express from "express"

import { generateImage } from "../controllers/imageControlller.js"
import { userAuth } from "../middleware/userAuth.js";


export const imageRouter= express.Router();

imageRouter.post("/generate-image",userAuth, generateImage) 

//as we need the user_id from the body so that's why we have "userAuth"