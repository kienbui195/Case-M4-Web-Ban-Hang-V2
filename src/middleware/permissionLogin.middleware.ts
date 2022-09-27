import { Request, Response, NextFunction } from 'express';

const permissionLogin = (req: Request, res: Response, next: NextFunction) => {
  let user: any = req.user;
  let role = user.role;
  if (user.role == 'user') {
    res.redirect('/')
  } else {
    res.redirect('/admin/dashboard')
  }

}

export default permissionLogin;