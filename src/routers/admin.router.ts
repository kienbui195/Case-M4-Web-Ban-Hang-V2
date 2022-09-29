import express from "express";
import controller from '../controllers/controller';
import auth from '../middleware/auth.middleware';
import permission from '../middleware/permission.middleware';

const adminRouter = express.Router();

adminRouter.use(auth);
adminRouter.use(permission);

adminRouter.get('/dashboard', (req, res) => {
    controller.showDashboardPage(req, res);
});


adminRouter.get('/products-list', (req, res) => {
    controller.showProductsListPage(req, res).catch(err => res.render('404page'));
});

adminRouter.get('/products-add', (req, res) => {
    controller.showAddProductsPage(req, res);
});

adminRouter.get('/users-list', (req, res) => {
    controller.showFormUserManager(req, res).catch(err => res.render('404page'));
});

adminRouter.get('/users-add', (req, res) => {
    controller.showFormCreateAdminAccount(req, res);
});

adminRouter.get('/products-edit/:id', (req, res) => {
    controller.showEditProductPage(req, res).catch(err => res.render('404page'));
});

adminRouter.post('/products-edit', (req, res) => {
    controller.updateProduct(req, res).catch(err => res.render('404page'));
});

adminRouter.get('/products-delete/:id', (req, res) => {
    controller.deleteProduct(req, res).catch(err => res.render('404page'));
});

adminRouter.post('/users-add', (req, res) => {
    controller.createAdminAccount(req, res).catch(err => res.render('404page'));
});

adminRouter.get('/user-delete/:id', (req, res) => {
    controller.deleteUser(req, res).catch(err => res.render('404page'));
});

adminRouter.get('/user-edit/:id', (req, res) => {
    controller.showUpdateUserForm(req, res).catch(err => res.render('404page'));
});

adminRouter.post('/user-edit/:id', (req, res) => {
    controller.updateUser(req, res).catch(err => res.render('404page'));
});


adminRouter.post('/products-add', (req, res) => {
    controller.createProduct(req, res).catch(err => res.render('404page'));
});

adminRouter.post('/users-searchProducts', (req, res) => {
  controller.searchAdminProducts(req, res).catch(err => res.render('404page'));
});

adminRouter.get('/orders-list', (req, res) => {
    controller.showOrderListPage(req, res).catch(err => res.render('404page'));
})

export default adminRouter; 