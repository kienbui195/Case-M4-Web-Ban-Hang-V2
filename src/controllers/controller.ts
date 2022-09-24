import { checkRegisterUser } from "../functions/validateForm";
import { UserModel } from "../schemas/userLogin.model";
import {UploadedFile} from "express-fileupload";
import passport from "passport";
import { resolve } from "path";
import {ProductModel} from "../schemas/product.model";

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
        res.render('productsList', {products: products});
    }

    async showEditProductPage(req: any, res: any) {
        let updateProduct = await ProductModel.findOne({_id: req.params.id});
        res.render('updateProduct', {updateProduct: updateProduct});
    }

    async updateProduct(req: any, res: any) {
        let newFiles = req.files;
        let newProduct = req.body;
        if(newFiles){
            let image = newFiles.image as UploadedFile;
            await image.mv('./src/public/images/upload/' + image.name);
            newProduct.image = 'images/upload/' + image.name;
            await ProductModel.findOneAndUpdate({_id:newProduct._id}, newProduct);
            res.redirect('/products/list');
        }else{
            await ProductModel.findOneAndUpdate({_id:newProduct._id}, newProduct);
            res.redirect('/products/list');
        }
    }

    async deleteProduct(req: any, res: any) {
        await ProductModel.findOneAndDelete({_id:req.params.id});
        res.redirect('/products/list');
    }

    showAddProductsPage(req: any, res: any) {
        res.render('addProduct');
    }

    async showShopPage(req: any, res: any) {
        let products = await ProductModel.find();
        res.render('shop', {products:products});
    }

    async createProduct(req: any, res: any) {
        let files = req.files;
        if(files){
            let newProduct = req.body;
            if(files.image && newProduct.name){
                let image = files.image as UploadedFile;
                await image.mv('./src/public/images/upload/' + image.name);
                newProduct.image = 'images/upload/' + image.name;
                await ProductModel.create(newProduct);
                res.redirect('/products/list');
            }else{
                res.render('404page');
            }
        }else{
            res.render('404page');
        }
    }
        
    async getDataRegister(req: any, res: any) {
        if (checkRegisterUser( req.body.passwordRegister )) {
            const user = await UserModel.findOne({ email: req.body.emailRegister });
            if (!user) {
                const data = req.body;
                const newUser = {
                    name: data.nameRegister,
                    email: data.emailRegister,
                    password: data.passwordRegister,
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
        let user = await UserModel.find({ role: 'user'})
        res.render('dashboardUserAccManager', {admin: admin, user: user});
    }

    async createAdminAccount(req: any, res: any) {
        if (checkRegisterUser(req.body.adminPassword)) {
            let user = await UserModel.findOne({ email: req.body.adminEmail });
            if (!user) {
                const data = req.body;
                const newUser = {
                    name: data.adminName,
                    email: data.adminEmail,
                    password: data.adminPassword,
                    role: "admin",
                }
                await UserModel.create(newUser);
                res.locals.message = 'success';
                res.render('dashboardAdminRegister');
            } else {
                res.locals.message = 'fail';
                res.render('dashboardAdminRegister');
            }
        } else {
            res.locals.message = 'error';
            res.render('dashboardAdminRegister');
        }
    }

    showFormCreateAdminAccount(req: any, res: any) {
        res.render('dashboardAdminRegister');
    }

    async deleteUser(req: any, res: any) {
        await UserModel.findOneAndDelete({ _id: req.params.id });
        res.redirect('/users/list');
    }

    async showEditUserForm(req: any, res: any) {
        let user = await UserModel.findOne({ _id: req.params.id });
        res.render('updateUser', {data: user});
    }

    async updateUser(req: any, res: any) {
        const data = req.body;
        if (checkRegisterUser(data.passwordUpdate)) {
            await UserModel.findOneAndUpdate({ _id: data.id }, {
                name: data.nameUpdate,
                password: data.passwordUpdate,
                role: data.roleUpdate
            });
            res.redirect('/users/list')
        }
    }

    logout(req: any, res: any, next: any) {
        req.logout((err: any) =>{
            if (err) { return next(err); }
            res.redirect('/login');
          });
    }
}

export default Controller;