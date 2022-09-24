import { checkRegisterUser } from "../functions/validateForm";
import { UserModel } from "../schemas/userLogin.model";
import flash from "connect-flash";

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
        res.render('dashboardUserAccManager', {admin: admin, user: user, message: req.flash('message')});
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
                req.flash('message','successRegister');
                res.redirect('/users/list');
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
        req.flash('message', 'successDelete');
        res.redirect('/users/list');
    }

    async showUpdateUserForm(req: any, res: any) {
        let user = await UserModel.findOne({ _id: req.params.id });
        res.render('updateUser', {data: user, message: req.flash('message')});
    }

    async updateUser(req: any, res: any) {
        const data = req.body;
        if (checkRegisterUser(data.passwordUpdate)) {
            await UserModel.findOneAndUpdate({ _id: data.id }, {
                name: data.nameUpdate,
                password: data.passwordUpdate,
                role: data.roleUpdate
            });
            req.flash('message', 'successUpdate')
            res.redirect('/users/list');
        } else {
            req.flash('message','errorUpdate')
            res.redirect(`/user/${data.id}/edit`);
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