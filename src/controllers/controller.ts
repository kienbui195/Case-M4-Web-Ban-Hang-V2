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

    async getDataRegister(req: any, res: any) {
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
    }

    logout(req: any, res: any) {
        req.flash('message', 'You are now logged out.');
        res.redirect('/login');
    }
}

export default Controller;