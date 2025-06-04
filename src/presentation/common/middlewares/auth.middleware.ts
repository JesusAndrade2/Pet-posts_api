import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../../config';
import { User, UserRol } from '../../../data';

declare global {
  namespace Express {
    interface Request {
      sessionUser?: User;
    }
  }
}

export class AuthMiddleware {
  static async protect(req: Request, res: Response, next: NextFunction) {
    let token = req.cookies.token;

    /* el codigo a continuación se usa cuando el token es enviado por el authorization, es decir probablemente se guardaba en el localStorage***
    
    const authorization = req.header('Authorization');

    if (!authorization){
      return res.status(401).json({message: 'no token provided'}
    )}

    if (!authorization.startWith('bearer') ){
      return res.status(401).json({message: 'token invalid'}
  )}
  
  const tokenJwt = authorization.split(' ').at(1)
   
  */

    try {
      const payload = (await JwtAdapter.validateToken(token)) as { id: string };
      if (!payload) return res.status(401).json({ message: 'invalid Token ' });

      const user = await User.findOne({
        where: {
          id: payload.id,
          status: true,
        },
        select: ['id', 'name', 'email', 'role', 'status'],
      });

      if (!user) return res.status(401).json({ message: 'invalid user' });

      req.sessionUser = user;

      next();
    } catch (error) {
      return res.status(500).json({ message: 'something went very wrong ' });
    }
  }

  static restrictTo = (...roles: UserRol[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!roles.includes(req.sessionUser!.role)) {
        return res.status(403).json({
          message: 'you are not authorized to acces to this route',
        });
      }
      next();
    };
  };
}
