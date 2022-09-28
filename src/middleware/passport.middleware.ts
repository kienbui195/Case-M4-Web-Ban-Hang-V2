import googleStrategy from 'passport-google-oauth2';
import passport from 'passport';
import bcrynt from 'bcrypt';
import { UserModel } from '../schemas/userLogin.model';
import * as passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = googleStrategy.Strategy;

passport.use(new LocalStrategy(async (username: any, password: any, done: any) => {
  const user = await UserModel.findOne({ email: username });
  if (!user) {
    return done(null, false);
  } else {
    let comparePass = await bcrynt.compare(password, user.password)
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
      let data = {
        email: email,
        google_id: google_id,
        name: nameGoogle,
        isVerified: true,
        role: 'user',
        password: ''
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