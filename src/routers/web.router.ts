import express from "express";
import { Request, Response } from "express";
import permission from '../middleware/permission.middleware';
import passport from "../middleware/passport.middleware";
import controller from '../controllers/controller';
import auth from '../middleware/auth.middleware';

const router = express.Router();
 
router.get('/', (req, res) => {
    controller.showHomePage(req, res);
});

router.get('/login', (req, res) => {
    controller.showLoginPage(req, res);
});
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
}))
router.get('/google/login', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
})
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
    controller.showShopPage(req, res).catch(err => console.log(err.messages));
});

router.get('/products/:id', (req, res) => {
    controller.detailProduct(req, res).catch(err => console.log(err.messages));
});

router.post('/products-search', (req, res) => {
    controller.searchProduct(req, res).catch(err => console.log(err.messages));
});

 
export default router;