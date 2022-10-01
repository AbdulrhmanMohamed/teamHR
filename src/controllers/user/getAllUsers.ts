import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import { AuthenticatedReq } from "../../middlewares/auth";

//@desc         get all superadmins
//@route        GET /api/v1/users/superadmins
//@access       private(super admins)
export const getAllSuperAdmins = async (req: AuthenticatedReq, res:Response, next:NextFunction) => {
    const allSupervisors = await User.find({role: 'super admin'});
    return res.send({
        success: true,
        data: allSupervisors,
        message: 'Users are fetched successfully',
    });
};

//@desc         get all roots
//@route        GET /api/v1/users/roots
//@access       private(super admins)
export const getAllRoots = async (req: AuthenticatedReq, res:Response, next:NextFunction) => {
    const allRoots = await User.find({role: 'root'});
    return res.send({
        success: true,
        data: allRoots,
        message: 'Users are fetched successfully',
    });
};

//@desc         get all admins
//@route        GET /api/v1/users/admins
//@access       private(admin, root)
export const getAllAdmins = async (req: AuthenticatedReq, res:Response, next:NextFunction) => {
    const allAdmins = await User.find({role: 'admin', company: req.user!.company});
    return res.send({
        success: true,
        data: allAdmins,
        message: 'Users are fetched successfully',
    });
};

//@desc         get all employees
//@route        GET /api/v1/users/employyes
//@access       private(admin, root, employee)
export const getAllEmployees = async (req: AuthenticatedReq, res:Response, next:NextFunction) => {
    const allEmployees = await User.find({role: 'employee', company: req.user!.company});
    return res.send({
        success: true,
        data: allEmployees,
        message: 'Users are fetched successfully'
    });
};

