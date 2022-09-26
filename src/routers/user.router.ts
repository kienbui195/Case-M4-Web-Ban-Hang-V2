import express from "express";
import Controller from "../controllers/controller";
import { Request, Response } from "express";
import multer from "multer";
import permission from '../middleware/permission.middleware';
import passport from "../middleware/passport.middleware";
import controller from '../controllers/controller'
import auth from '../middleware/auth.middleware'

const userRouter = express.Router();
userRouter.post('/register', (req, res, next) => {
  controller.getDataRegister(req, res).catch(err => res.render('404page'));
});

export default userRouter;