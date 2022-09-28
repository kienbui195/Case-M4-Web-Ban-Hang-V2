import { Request, Response, NextFunction } from 'express';
import { localStorage } from '../middleware/back.middleware'
const permissionLogin = (req: Request, res: Response, next: NextFunction) => {
  let user: any = req.user;
  let role = user.role;
  let oldUrl = localStorage.getItem('oldUrl')
  if (role == 'user') {
    res.redirect(oldUrl)
  } else {
    res.redirect(oldUrl)
  }

}

export default permissionLogin;