import { checkRegisterUser } from "../functions/validateForm";
import { UserModel } from "../schemas/userLogin.model";

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
        if (checkRegisterUser(req.body.nameRegister, req.body.passwordRegister)) {
            const user = await UserModel.findOne({ email: req.body.emailRegister });
            if (!user) {
                const data = req.body;
                const newUser = {
                    name: data.nameRegister,
                    email: data.emailRegister,
                    password: data.passwordRegister,
                    role: 0,
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

    logout(req: any, res: any) {
        req.flash('message', 'You are now logged out.');
        res.redirect('/login');

    }


}

export default Controller;