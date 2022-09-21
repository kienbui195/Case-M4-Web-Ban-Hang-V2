import express from "express";
import router from "./src/routers/web.router";

const app = express();
const port = 8000;

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('src/public'));

app.use('/', router);

app.listen(port, () => {
    console.log(`running at http://localhost:${port}`);
});