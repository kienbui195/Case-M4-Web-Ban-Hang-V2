import express from "express";
import router from "./src/routers/web.router";
import mongoose from "mongoose";
import session from "express-session";
import flash from "connect-flash";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
const port = 8000;
const DB_URL = 'mongodb://localhost:27017/caseM4';

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('src/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser('secret'));
app.use(session({
    secret: "secret",
    cookie: { maxAge: 60000 },
}));

app.use(flash());
app.use('/', router);

mongoose.connect(DB_URL)
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err.message));

app.listen(port, () => {
    console.log(`running at http://localhost:${port}`);
});