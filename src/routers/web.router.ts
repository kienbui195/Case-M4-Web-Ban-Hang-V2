import express from "express";
import Controller from "../controllers/controller";
import { Request, Response } from "express";
import multer from "multer";
import passport from "../middleware/passport.middleware";
import controller from '../controllers/controller';
import auth from '../middleware/auth.middleware';
import permissionLogin from '../middleware/permissionLogin.middleware'

const router = express.Router();
const upload = multer();

router.get('/', (req, res) => {
    controller.showHomePage(req, res);
});

router.get('/login', (req, res) => {
    controller.showLoginPage(req, res);
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login'
}), permissionLogin);

router.get('/google/login', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), permissionLogin)
router.get('/contact', (req, res) => {
    controller.showContactPage(req, res);
});

router.get('/about', (req, res) => {
    controller.showAboutPage(req, res);
})

router.get('/logout', auth, (req, res, next) => {
    controller.logout(req, res, next);
});

router.get('/shop', (req, res) => {
    controller.showShopPage(req, res).catch(err => res.render('404page'))
});

router.get('/products/:id', (req, res) => {
    controller.detailProduct(req, res).catch(err => res.render('404'));
})
router.post('/register', (req, res, next) => {
    controller.getDataRegister(req, res).catch(err => console.log(err.message));
});

export default router;