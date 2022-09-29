import googleStrategy from 'passport-google-oauth2';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { UserModel } from '../schemas/userLogin.model';
import * as passportLocal from 'passport-local';
import {CartModel} from "../schemas/cart.model";
const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = googleStrategy.Strategy;

passport.use(new LocalStrategy(async (username: any, password: any, done: any) => {
  const user = await UserModel.findOne({ email: username });
  if (!user) {
    return done(null, false);
  } else {
    let comparePass = await bcrypt.compare(password, user.password)
    if (comparePass) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  }
}));

passport.use(new GoogleStrategy({
  clientID: '961158771642-jept40cgbe39imihk1qef1ifpm0e0gn6.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: "http://localhost:8000/google/callback"
},
  async function (accessToken: any, refreshToken: any, profile: any, cb: any) {
    let user = await UserModel.findOne({ google_id: profile._json.sub });
    if (user) {
      cb(null, user)
    } else {
      let nameGoogle = profile._json.name;
      let google_id = profile._json.sub;
      let email = profile._json.email;
      const newCart = {
        userEmail: email,
        list: []
      }
      await CartModel.create(newCart);
      let cart = await CartModel.findOne({ userEmail: email });
      let data = {
        email: email,
        google_id: google_id,
        name: nameGoogle,
        isVerified: true,
        role: 'user',
        password: '',
        cartID: cart._id
      }

      let newUserGoogle = new UserModel(data);
      newUserGoogle.save();
      cb(null, newUserGoogle);
    }
  }
));
passport.serializeUser((user, cb) => {
  cb(null, user)
});
passport.deserializeUser((user, cb) => {
  cb(null, user)
})
export default passport;