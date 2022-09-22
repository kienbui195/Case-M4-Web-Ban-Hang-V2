import { UserModel } from "../schemas/userLogin.model";
import * as popup from "node-popup";
import {alert} from 'node-popup';

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

    async getDataRegister(req: any, res: any) {
        const user = await UserModel.findOne({ email: req.body.emailRegister });
        if (!user) {
            const data = req.body;
            const newUser = {
                name: data.nameRegister,
                email: data.emailRegister,
                password: data.passwordRegister
            }
            await UserModel.create(newUser);
            res.render('login', {messageSuccess: 'Register Success!'})
        }
    }

    logout(req: any, res: any) {
        req.flash('message', 'You are now logged out.');
        res.redirect('/login');
    }
}

export default Controller;