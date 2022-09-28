import { checkRegisterUser } from "../functions/validateForm";
import { UserModel } from "../schemas/userLogin.model";
import flash from "connect-flash";
import { UploadedFile } from "express-fileupload";
import { ProductModel } from "../schemas/product.model";
import { CartModel } from "../schemas/cart.model";
import bcrynt from 'bcrypt';
import VerifiedEmail from "../VerifiedMail/mail.setup";
import { TokenModel } from "../schemas/token.schema";

class Controller {

    async randomToken() {
        let otp = '';
        const random = '1234567890';
        for (let i = 0; i < 6; i++){
        otp += random[Math.floor(Math.random() * random.length)];
        }
        return otp;
    }

    showHomePage(req: any, res: any) {
        let online = req.isAuthenticated();
        res.render('home', { online: online });
    }

    showLoginPage(req: any, res: any) {
        res.render('login', { message: req.flash('message') });
    }

    showDashboardPage(req: any, res: any) {
        res.render('dashboard', { info: req.user.name });
    }

    showContactPage(req: any, res: any) {
        let online = req.isAuthenticated();
        res.render('contact', { online: online });
    }

    showAboutPage(req: any, res: any) {
        let online = req.isAuthenticated();
        res.render('about', { online: online });
    }

    async showProductsListPage(req: any, res: any) {
        let products = await ProductModel.find();
        res.render('productsList', { products: products, message: req.flash('message'), info: req.user.name });
    }

    async showEditProductPage(req: any, res: any) {
        let updateProduct = await ProductModel.findOne({ _id: req.params.id });
        res.render('updateProduct', { updateProduct: updateProduct, message: req.flash('message'), info: req.user.name });
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
            res.redirect('/admin/products-list');
        } else {
            await ProductModel.findOneAndUpdate({ _id: newProduct._id }, newProduct);
            req.flash('message', 'successUpdate');
            res.redirect('/admin/products-list');
        }
    }

    async deleteProduct(req: any, res: any) {
        await ProductModel.findOneAndDelete({ _id: req.params.id });
        req.flash('message', 'successDelete');
        res.redirect('/admin/products-list');
    }

    async detailProduct(req: any, res: any) {
        let online = req.isAuthenticated();
        let product = await ProductModel.findOne({ _id: req.params.id });
        res.render('detail', { product: product, online: online });
    }

    showAddProductsPage(req: any, res: any) {
        res.render('addProduct', { message: req.flash('message'), info: req.user.name });
    }

    async showShopPage(req: any, res: any) {
        let products = await ProductModel.find();
        let online = req.isAuthenticated();
        res.render('shop', { products: products, message: req.flash('message'), online: online });
    }

    async createProduct(req: any, res: any) {
        let files = req.files;
        if (files) {
            let newProduct = req.body;
            if (files.image && newProduct.name) {
                let product = await ProductModel.findOne({ category: newProduct.category, name: newProduct.name });
                if (!product) {
                    let image = files.image as UploadedFile;
                    await image.mv('./src/public/images/upload/' + image.name);
                    newProduct.image = 'images/upload/' + image.name;
                    await ProductModel.create(newProduct);
                    req.flash('message', 'successCreate');
                    res.redirect('/admin/products-list');
                } else {
                    req.flash('message', 'duplicateCreate');
                    res.redirect('/admin/products-add');
                }

            } else {
                req.flash('message', 'errorCreate');
                res.redirect('/admin/products-add');
            }
        } else {
            req.flash('message', 'errorCreate');
            res.redirect('/admin/products-add');
        }
    }

    async getDataRegister(req: any, res: any) {
        const user = await UserModel.findOne({ email: req.body.emailRegister });

        if (!user) {
            if (checkRegisterUser(req.body.passwordRegister)) {
                const data = req.body;
                let password = await bcrynt.hash(data.passwordRegister, 10);
                let otp = await this.randomToken();
                const newCart = {
                    userEmail: data.emailRegister,
                    list: []
                }
                await CartModel.create(newCart);
                let cart = await CartModel.findOne({ userEmail: data.emailRegister });
                const newUser = {
                    name: data.nameRegister,
                    email: data.emailRegister,
                    password: password,
                    role: "user",
                    isVerified: false,
                    google_id: '',
                    cartID: cart._id
                }
                await UserModel.create(newUser);
                const token = {
                    email: data.emailRegister,
                    token: otp
                }
                await TokenModel.create(token);
                VerifiedEmail(req, res, otp);
                req.flash('message', 'sendEmail');
                res.render('verify', { message: req.flash('message'), email: data.emailRegister });
            } else {
                req.flash('message', 'error');
                res.redirect('/login');
            }
        } else {
            req.flash('message', 'fail');
            res.redirect('/login');
        }
    }

    async showFormVerify(req: any, res: any) {
        let deleteToken =  () => {
             TokenModel.findOneAndDelete({email: req.params.email})
        }
        setTimeout(deleteToken, 10000);
        res.render('verify', { message: req.flash('message') });
    }

    async verifiedEmail(req: any, res: any) {
        let data = req.body;
        let token = await TokenModel.findOne({ email: data.email });
        if (token) {
            if (req.body.code == token.token) {
                await UserModel.findOneAndUpdate({ email: data.email }, { isVerified: true });
                await TokenModel.findOneAndDelete({ email: data.email });
                req.flash('message', 'successVerify');
                res.redirect('/login');
            } else {
                req.flash('message', 'codeWrong');
                res.redirect('/login');
            }
        } else {
            req.flash('message', 'codeExpired');
            res.redirect('/login');
        }
    }

    async showFormUserManager(req: any, res: any) {
        let admin = await UserModel.find({ role: 'admin' });
        let user = await UserModel.find({ role: 'user' })
        res.render('dashboardUserAccManager', { admin: admin, user: user, message: req.flash('message'), info: req.user.name });
    }

    async createAdminAccount(req: any, res: any) {
        const data = req.body;
        if (checkRegisterUser(data.adminPassword)) {
            let user = await UserModel.findOne({ email: data.adminEmail });
            if (!user) {
                let password = await bcrynt.hash(data.adminPassword, 10);
                const newUser = {
                    name: data.adminName,
                    email: data.adminEmail,
                    password: password,
                    isVerified: true,
                    role: "admin",
                    google_id: ''
                }
                await UserModel.create(newUser);
                req.flash('message', 'successRegister');
                res.redirect('/admin/users-list');
            } else {
                req.flash('message', 'fail');
                res.redirect('/admin/users-add');
            }
        } else {
            req.flash('message', 'error');
            res.redirect('/admin/users-add');
        }
    }

    showFormCreateAdminAccount(req: any, res: any) {
        res.render('dashboardAdminRegister', { message: req.flash('message'), info: req.user.name });
    }

    async deleteUser(req: any, res: any) {
        await UserModel.findOneAndDelete({ _id: req.params.id });
        req.flash('message', 'successDelete');
        res.redirect('/admin/users-list');
    }

    async showUpdateUserForm(req: any, res: any) {
        let user = await UserModel.findOne({ _id: req.params.id });
        res.render('updateUser', { data: user, message: req.flash('message'), info: req.user.name });
    }

    async updateUser(req: any, res: any) {
        const data = req.body;
        const unit = await UserModel.findOne({ _id: data.id });
        if (unit.password == '') {
            await UserModel.findOneAndUpdate({ _id: data.id }, {
                name: data.nameUpdate,
                role: data.role
            });
            req.flash('message', 'successUpdate')
            res.redirect('/admin/users-list');
        } else {
            if (checkRegisterUser(data.passwordUpdate)) {
                let password = await bcrynt.hash(data.passwordUpdate, 10)
                await UserModel.findOneAndUpdate({ _id: data.id }, {
                    name: data.nameUpdate,
                    password: password,
                    role: data.role
                });
                req.flash('message', 'successUpdate')
                res.redirect('/admin/users-list');
            } else {
                req.flash('message', 'errorUpdate')
                res.redirect(`/admin/user-edit/${data.id}`);
            }
        }
    }

    showFormSearchProduct(req: any, res: any) {
        res.render('searchProduct', { message: req.flash('message'), info: req.user.name });
    }

    async searchProduct(req: any, res: any) {
        let online = req.isAuthenticated();
        let products = await ProductModel.find({ name: { $regex: `${req.body.keyword}`, $options: 'i' } });
        if (products.length === 0) {
            res.render('searchProduct', { online: online });
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

    async showCartPage(req: any, res: any) {
        let online = req.isAuthenticated();
        let products = [];
        let cartID = req.user.cartID;
        let cart = await CartModel.findOne({ _id: cartID })
        let listCart = cart.list;
        for (let i = 0; i < listCart.length; i++) {
            let product = await ProductModel.findOne({ _id: listCart[i] });
            products.push(product);
        }
        console.log(products);
        res.render('cart', { online: online, products: products });
    }

    async getCartItems(req: any, res: any) {
        let user = req.user;
        if (!user) {
            res.json(0);
        } else {
            let userCartID = user.cartID;
            let cart = await CartModel.findOne({ cartID: userCartID });
            let listCart = cart.list
            res.json(listCart.length);
        }
    }

    async addToCart(req: any, res: any) {
        let user = req.user;
        if (!user) {
            res.status(401).json({ message: '401' })
        } else {
            let user = req.user;
            let productID: string = req.params.id;
            let userCartID = user.cartID;
            let cart = await CartModel.findOne({ cartID: userCartID });
            let listCart: string[] = cart.list
            if (listCart.indexOf(productID) === -1) {
                listCart.push(productID);
                await CartModel.findByIdAndUpdate(userCartID, { list: listCart });
            }
            let numberOfCart = listCart.length;
            res.json(numberOfCart);
        }
    }
}

const controller = new Controller();
export default controller;