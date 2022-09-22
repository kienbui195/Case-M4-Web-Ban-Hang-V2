import passport from "passport";
import * as passportLocal from 'passport-local';
import { UserModel } from "../schemas/userLogin.model"

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy(async (email, password, done) => {
    const user = await UserModel.findOne({email});
    if (!user) {
        return done(null, false, { message: 'Incorrect username and password' });
    }

    if (user.password !== password) {
        return done(null, false, { message: 'Incorrect username and password' });
    }

    return done(null, user)
}))