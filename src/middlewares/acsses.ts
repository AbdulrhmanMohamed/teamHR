import { NextFunction, Request, Response } from "express";
import { AuthenticatedReq } from "./auth";
export const checkRole = (...roles: Array<any>) => (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes((req as AuthenticatedReq).user!.role)) {
        return res.status(403).send('Access Forbidden!! ');
    }
    next();
}
