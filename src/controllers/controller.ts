
class Controller {

    showHomePage(req: any, res: any) {
        res.render('home');
    }

    showLoginPage(req: any, res: any) {
        res.render('login');
    }

    showDashboardPage(req:any, res:any) {
        res.render('dashboard');
    }
}

export default Controller;