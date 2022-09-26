import { Request, Response, NextFunction } from 'express';
const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}
export default auth;