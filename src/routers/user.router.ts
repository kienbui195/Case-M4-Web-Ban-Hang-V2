import express from "express";
import { Request, Response } from "express";
import multer from "multer";
import permission from '../middleware/permission.middleware';
import passport from "../middleware/passport.middleware";
import controller from '../controllers/controller'
import auth from '../middleware/auth.middleware'
import router from "./web.router";

const userRouter = express.Router();

userRouter.use(auth)

userRouter.get('/cart', (req, res) => {
    controller.showCartPage(req, res).catch(err => console.log(err.messages));
});

export default userRouter;