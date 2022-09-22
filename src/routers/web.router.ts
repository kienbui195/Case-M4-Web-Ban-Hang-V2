
import express from "express";
import Controller from "../controllers/controller";

const router = express.Router();
const controller = new Controller();

router.get('/', (req, res) => {
    controller.showHomePage(req, res);
});

router.get('/login', (req, res) => {
    controller.showLoginPage(req, res);
});

router.get('/dashboard', (req, res) => {
    controller.showDashboardPage(req, res);
})

router.get('/about', (req, res) => {
    controller.showAbout(req, res);
})

export default router;