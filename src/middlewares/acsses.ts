import { NextFunction, Request, Response } from "express";
export const checkRole = (...roles: Array<any>) => (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).send('Access Forbidden!! ');
    }
    next();
}