
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

router.get('/products/list', (req, res) => {
    controller.showProductsListPage(req, res);
});

router.get('/products/add', (req, res) => {
    controller.showAddProductsPage(req, res);
});

router.post('/register', upload.none(), (req, res, next) => {
    controller.getDataRegister(req, res).catch(err => res.render('404page'));
});

router.get('/logout', (req, res, next) => {
    controller.logout(req, res, next);
});

router.get('/users/list', (req, res) => {
    controller.showFormUserManager(req, res).catch(err => res.render('404page'));
});

router.get('/users/add', (req, res) => {
    controller.showFormCreateAdminAccount(req, res);
});

router.post('/users/add', upload.none(), (req, res) => {
    controller.createAdminAccount(req, res).catch(err => res.render('404page'));
});

router.get('/user/:id/delete', (req, res) => {
    controller.deleteUser(req, res).catch(err => res.render('404page'));
})

router.get('/user/:id/edit', (req, res) => {
    controller.showUpdateUserForm(req, res);
})

router.post('/user/:id/edit', upload.none() , (req, res) => {
    controller.updateUser(req, res);
})

export default router;