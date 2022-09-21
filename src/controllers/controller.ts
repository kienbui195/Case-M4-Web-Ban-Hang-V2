
class Controller {

    showHomePage(req: any, res: any) {
        res.render('home');
    }

    showAbout(req: any, res: any) {
        res.render('about');
    }
}

export default Controller;