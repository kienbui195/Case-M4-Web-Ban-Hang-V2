import { checkRegisterUser } from "../functions/validateForm";
import { UserModel } from "../schemas/userLogin.model";
import {UploadedFile} from "express-fileupload";
import passport from "passport";

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

    showProductsListPage(req: any, res: any) {
        res.render('productsList');
    }

    showAddProductsPage(req: any, res: any) {
        res.render('addProduct');
    }

    createProduct(req: any, res: any) {
        let files = req.files;
        if(files){

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
        res.redirect('/users/list')
    }

    async showEditUserForm(req: any, res: any) {
        
    }

    async updateUser(req: any, res: any) {
        
    }

    logout(req: any, res: any, next: any) {
        req.logout((err: any) =>{
            if (err) { return next(err); }
            res.redirect('/login');
          });
    }
}

export default Controller;