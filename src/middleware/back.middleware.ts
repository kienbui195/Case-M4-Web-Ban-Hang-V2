import { Request, Response, NextFunction } from "express";
import { LocalStorage } from 'node-localstorage';
export const localStorage = new LocalStorage('./scratch')
const back = (req: Request, res: Response, next: NextFunction) => {
  let oldUrl = req.path
  if (oldUrl.includes('vendors') == false && oldUrl != '/login' && oldUrl != '/logout') {
    localStorage.setItem('oldUrl', oldUrl)
  }
  next();
}
export default back