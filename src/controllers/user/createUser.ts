import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import { AuthenticatedReq } from "../../middlewares/auth";
import { Roles } from "../../types/enums";
import { Company } from "../../models/Company";

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
export const createAdmin = async (req: AuthenticatedReq, res:Response, next:NextFunction) => {
    const admin = await User.create({...req.body, role: Roles.ADMIN});
    return res.status(201).send({
        success: true,
        data: admin,
        message: 'admin is created successfully',
    });
};

//@desc         get all employees
//@route        GET /api/v1/users
//@access       private(admin, root)
export const createEmployee = async (req: AuthenticatedReq, res:Response, next:NextFunction) => {
    const employee = await User.create({...req.body, role: Roles.EMPLOYEE});
    return res.status(201).send({
        success: true,
        data: employee,
        message: 'employee is created successfully',
    });
};

