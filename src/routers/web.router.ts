
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

router.get('/contact', (req, res) => {
    controller.showContactPage(req, res);
});

router.get('/about', (req, res) => {
    controller.showAboutPage(req, res);
})

router.get('/products/list', (req, res) => {
    controller.showProductsListPage(req, res).catch(err => res.render('404page'));
});

router.get('/products/add', (req, res) => {
    controller.showAddProductsPage(req, res);
});

router.get('/products/:id', (req, res) => {
    controller.detailProduct(req, res).catch(err => res.render('404page'));
})

router.post('/products/add', (req, res) => {
    controller.createProduct(req, res).catch(err => res.render('404page'));
})

router.post('/register', (req, res, next) => {
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

router.get('/products/edit/:id', (req, res) => {
    controller.showEditProductPage(req, res).catch(err => res.render('404page'));
});

router.post('/products/edit', (req, res) => {
    controller.updateProduct(req, res).catch(err => res.render('404page'));
});

router.get('/products/delete/:id', (req, res) =>{
    controller.deleteProduct(req, res).catch(err => res.render)
})

router.post('/users/add', (req, res) => {
    controller.createAdminAccount(req, res).catch(err => res.render('404page'));
});

router.get('/user/:id/delete', (req, res) => {
    controller.deleteUser(req, res).catch(err => res.render('404page'));
});

router.get('/shop', (req, res) => {
    controller.showShopPage(req, res).catch(err => res.render('404page'))
})

router.get('/user/:id/edit', (req, res) => {
    controller.showUpdateUserForm(req, res).catch(err => res.render('404page'));
})

router.post('/user/:id/edit' , (req, res) => {
    controller.updateUser(req, res).catch(err => res.render('404page'));
})

export default router;