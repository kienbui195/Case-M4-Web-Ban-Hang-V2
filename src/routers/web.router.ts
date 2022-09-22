
import express from "express";
import Controller from "../controllers/controller";
import multer from "multer";

const router = express.Router();
const controller = new Controller();
const upload = multer();    

router.get('/', (req, res) => {
    controller.showHomePage(req, res);
});

router.get('/login', (req, res) => {
    controller.showLoginPage(req, res);
});

router.get('/dashboard', (req, res) => {
    controller.showDashboardPage(req, res);
});

router.post('/register', upload.none(), (req, res, next) => {
    controller.getDataRegister(req, res).catch(err => res.render('error'));
})

router.get('/logout', (req, res) => {
    controller.logout(req, res);
})

export default router;