import express from "express";
import router from "./src/routers/web.router";
import mongoose from "mongoose";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import flush from "connect-flash";
import fileUpload from 'express-fileupload';
import passport from 'passport';
import adminRouter from './src/routers/admin.router'
import userRouter from './src/routers/user.router'
import { Request, Response } from "express";
const app = express();
const port = 8000;
const DB_URL = 'mongodb://localhost:27017/caseM4';
mongoose.connect(DB_URL)
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err.message));
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('src/public'));
app.use(bodyParser.json());
app.use(express.json());
app.use(flush());
app.use(fileUpload({
    createParentPath: true
}));

app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: ({ maxAge: 15 * 60 * 1000, secure: false })
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));
app.use(express.urlencoded({ extended: false }));



app.use('/', router);
app.use('/admin', adminRouter)
app.use('/user', userRouter)

app.get('/*', (req: Request, res: Response) => {
    res.render('404page')
})
app.listen(port, () => {
    console.log(`running at http://localhost:${port}`);
});