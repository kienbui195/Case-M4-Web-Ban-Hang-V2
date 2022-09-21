
import express from "express";
import Controller from "../controllers/controller";

const router = express.Router();
const controller = new Controller();

router.get('/', (req, res) => {
    console.log(req.originalUrl)
    controller.showHomePage(req, res);
})

export default router;