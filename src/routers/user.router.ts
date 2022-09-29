import express from "express";
import controller from '../controllers/controller'
import auth from '../middleware/auth.middleware'


const userRouter = express.Router();


userRouter.get('/cart',auth, (req, res) => {
    controller.showCartPage(req, res).catch(err => res.render('404page'));
});

userRouter.post('/add-to-cart/:id', (req, res)=>{
    controller.addToCart(req, res).catch(err => res.render('404page'));
});

userRouter.post('/check-out', (req, res)=>{
    controller.checkOut(req, res).catch(err => res.render('404page'));
})

export default userRouter;