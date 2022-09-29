import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import { AuthenticatedReq } from "../../middlewares/auth";
import { Roles } from "../../types/enums";

//@desc         create superadmin
//@route        POST /api/v1/superadmins
//@access       private(super admins)
export const createSuperAdmin = async (req: AuthenticatedReq, res:Response, next:NextFunction) => {
    const createdUser = await User.create({...req.body, role: Roles.SUPER_ADMIN});
    const token = createdUser.createToken();
    res.status(201).header('Authorization', token).json({
        success: true,
        message: 'super admin is created successfully',
        data: createdUser
    });
};

//@desc         create root
//@route        POST /api/v1/roots
//@access       private(super admins)
export const createRoot = async (req: AuthenticatedReq, res:Response, next:NextFunction) => {
    const createdUser = await User.create({...req.body, role: Roles.ROOT});
    // Here we need to check if a root was already created or not
    const token = createdUser.createToken();
    res.status(201).header('Authorization', token).json({
        success: true,
        message: 'root is created successfully',
        data: createdUser
    });
};

//@desc         get all admins
//@route        GET /api/v1/admins
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
//@route        GET /api/v1/users
//@access       private(admin, root, employee)
export const getAllEmployees = async (req: AuthenticatedReq, res:Response, next:NextFunction) => {
    const allEmployees = await User.find({role: 'employee', company: req.user!.company});
    return res.send({
        success: true,
        data: allEmployees,
        message: 'Users are fetched successfully'
    });
};

