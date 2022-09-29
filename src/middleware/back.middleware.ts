import { Request, Response, NextFunction } from "express";
import { LocalStorage } from 'node-localstorage';
export const localStorage = new LocalStorage('./scratch')
const back = (req: Request, res: Response, next: NextFunction) => {
  let oldUrl = req.path
  if (oldUrl.includes('vendors') == false
    && oldUrl.includes('log') == false
    && oldUrl.includes('google') == false
    && oldUrl != '/get-cart-items'
    && oldUrl.includes('verify') == false
    && oldUrl.includes('login') == false
    && oldUrl != '/register'
    && oldUrl.includes('/register') == false) {
    if (oldUrl == undefined) {
      next();
    } else {
      localStorage.setItem('oldUrl', oldUrl)
    }
  }
  next();
}
export default back