import { checkRegisterUser } from "../functions/validateForm";
import { UserModel } from "../schemas/userLogin.model";
import flash from "connect-flash";
import { UploadedFile } from "express-fileupload";
import { ProductModel } from "../schemas/product.model";
import bcrynt from 'bcrypt';

class Controller {

    showHomePage(req: any, res: any) {
        res.render('home');
    }

    showLoginPage(req: any, res: any) {
        res.render('login');
    }

    showDashboardPage(req: any, res: any) {
        res.render('dashboard');
    }

    showContactPage(req: any, res: any) {
        res.render('contact');
    }

    showAboutPage(req: any, res: any) {
        res.render('about');
    }

    async showProductsListPage(req: any, res: any) {
        let products = await ProductModel.find();
        res.render('productsList', { products: products, message: req.flash('message') });
    }

    async showEditProductPage(req: any, res: any) {
        let updateProduct = await ProductModel.findOne({ _id: req.params.id });
        res.render('updateProduct', { updateProduct: updateProduct, message: req.flash('message') });
    }

    async updateProduct(req: any, res: any) {
        let newFiles = req.files;
        let newProduct = req.body;
        if (newFiles) {
            let image = newFiles.image as UploadedFile;
            await image.mv('./src/public/images/upload/' + image.name);
            newProduct.image = 'images/upload/' + image.name;
            await ProductModel.findOneAndUpdate({ _id: newProduct._id }, newProduct);
            req.flash('message', 'successUpdate');
            res.redirect('/products/list');
        } else {
            await ProductModel.findOneAndUpdate({ _id: newProduct._id }, newProduct);
            req.flash('message', 'successUpdate');
            res.redirect('/products/list');
        }
    }

    async deleteProduct(req: any, res: any) {
        await ProductModel.findOneAndDelete({ _id: req.params.id });
        req.flash('message', 'successDelete');
        res.redirect('/products/list');
    }

    async detailProduct(req: any, res: any) {
        let product = await ProductModel.findOne({ _id: req.params.id });
        res.render('detail', { product: product })
    }

    showAddProductsPage(req: any, res: any) {
        res.render('addProduct', { message: req.flash('message') });
    }

    async showShopPage(req: any, res: any) {
        let products = await ProductModel.find();
        res.render('shop', { products: products, message: req.flash('message') });
    }

    async createProduct(req: any, res: any) {
        let files = req.files;
        if (files) {
            let newProduct = req.body;
            if (files.image && newProduct.name) {
                let product = await ProductModel.findOne({ category: newProduct.category });
                if (!product) {
                    let image = files.image as UploadedFile;
                    await image.mv('./src/public/images/upload/' + image.name);
                    newProduct.image = 'images/upload/' + image.name;
                    await ProductModel.create(newProduct);
                    req.flash('message', 'successCreate');
                    res.redirect('/products/list');
                } else {
                    req.flash('message', 'duplicateCreate');
                    res.redirect('/products/add');
                }

            } else {
                req.flash('message', 'errorCreate');
                res.redirect('/products/add');
            }
        } else {
            req.flash('message', 'errorCreate');
            res.redirect('/products/add');
        }
    }

    async getDataRegister(req: any, res: any) {
        if (checkRegisterUser(req.body.passwordRegister)) {
            const user = await UserModel.findOne({ email: req.body.emailRegister });
            if (!user) {
                const data = req.body;
                let password = await bcrynt.hash(data.password, 10)
                const newUser = {
                    name: data.nameRegister,
                    email: data.emailRegister,
                    password: password,
                    role: "user",
                }
                await UserModel.create(newUser);
                res.locals.message = 'success';
                res.render('login');
            } else {
                res.locals.message = 'fail';
                res.render('login');
            }
        } else {
            res.locals.message = 'error';
            res.render('login');
        }

    }

    async showFormUserManager(req: any, res: any) {
        let admin = await UserModel.find({ role: 'admin' });
        let user = await UserModel.find({ role: 'user' })
        res.render('dashboardUserAccManager', { admin: admin, user: user, message: req.flash('message') });
    }

    async createAdminAccount(req: any, res: any) {
        if (checkRegisterUser(req.body.adminPassword)) {
            let user = await UserModel.findOne({ email: req.body.adminEmail });
            if (!user) {
                const data = req.body;
                let password = await bcrynt.hash(data.adminPassword, 10);
                const newUser = {
                    name: data.adminName,
                    email: data.adminEmail,
                    password: password,
                    role: "admin",
                }
                await UserModel.create(newUser);
                req.flash('message', 'successRegister');
                res.redirect('/users/list');
            } else {
                req.flash('message', 'fail');
                res.redirect('/users/add');
            }
        } else {
            req.flash('message', 'error');
            res.redirect('/users/add');
        }
    }

    showFormCreateAdminAccount(req: any, res: any) {
        res.render('dashboardAdminRegister', { message: req.flash('message') });
    }

    async deleteUser(req: any, res: any) {
        await UserModel.findOneAndDelete({ _id: req.params.id });
        req.flash('message', 'successDelete');
        res.redirect('/users/list');
    }

    async showUpdateUserForm(req: any, res: any) {
        let user = await UserModel.findOne({ _id: req.params.id });
        res.render('updateUser', { data: user, message: req.flash('message') });
    }

    async updateUser(req: any, res: any) {
        const data = req.body;
        if (checkRegisterUser(data.passwordUpdate)) {
            let password = await bcrynt.hash(data.passwordUpdate, 10)
            await UserModel.findOneAndUpdate({ _id: data.id }, {
                name: data.nameUpdate,
                password: password,
                role: data.role
            });
            req.flash('message', 'successUpdate')
            res.redirect('/users/list');
        } else {
            req.flash('message', 'errorUpdate')
            res.redirect(`/user/${data.id}/edit`);
        }
    }

    showFormSearchProduct(req: any, res: any) {
        res.render('searchProduct', { message: req.flash('message') });
    }

    async searchProduct(req: any, res: any) {
        let products = await ProductModel.find({ name: { $regex: `${req.body.keyword}`, $options: 'i' } });
        if (products.length === 0) {
            res.render('searchProduct');
        } else {
            res.render('shop', { products: products });
        }
    }

    async searchAdminProducts(req: any, res: any) {
        let products = await ProductModel.find({ name: { $regex: `${req.body.keyword}`, $options: 'i' } });
        if (products.length === 0) {
            res.render('searchAdminProduct');
        } else {
            res.render('productsList', { products: products, message: req.flash('message') });
        }
    }

    logout(req: any, res: any, next: any) {
        req.logout((err: any) => {
            if (err) { return next(err); }
            res.redirect('/login');
        });
    }
}

const controller = new Controller();
export default controller;