import express from "express";
import { Request, Response } from "express";
import multer from "multer";
import permission from '../middleware/permission.middleware';
import passport from "../middleware/passport.middleware";
import controller from '../controllers/controller'
import auth from '../middleware/auth.middleware'

const userRouter = express.Router();

userRouter.use(auth)



export default userRouter;