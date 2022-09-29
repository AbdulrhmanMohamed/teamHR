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
    // We need to check if this admin is in the same company
    if(req.user?.role === Roles.ADMIN && req.user.company !== req.body.company){
        return res.status(400).send({
            success: false,
            message: 'admins can only be accessed in the same company'
        })
    };

    // We need to check if root can add admins only to his companies
    if(req.user?.role === Roles.ROOT){
        const company = await Company.findOne({owner: req.user._id, _id: req.user.company})
        if(company === null) return res.status(400).send({
            success: false,
            message: 'admins can only be accessed in root companies'
        });
    };

    const admin = await User.create({...req.body, role: Roles.ADMIN});
    return res.send({
        success: true,
        data: admin,
        message: 'admin is created successfully',
    });
};

//@desc         get all employees
//@route        GET /api/v1/users
//@access       private(admin, root)
export const createEmployee = async (req: AuthenticatedReq, res:Response, next:NextFunction) => {
    // We need to check if this employee is in the same company
    if(req.user?.role === Roles.ADMIN && req.user.company !== req.body.company){
        return res.status(400).send({
            success: false,
            message: 'employees can only be accessed in the same company'
        });
    };

    // We need to check if root can add employees only to his companies
    if(req.user?.role === Roles.ROOT){
        const company = await Company.findOne({owner: req.user._id, _id: req.user.company})
        if(company === null) return res.status(400).send({
            success: false,
            message: "employees can only be accessed in root's companies"
        });
    };

    const admin = await User.create({...req.body, role: Roles.ADMIN});
    return res.send({
        success: true,
        data: admin,
        message: 'employee is created successfully',
    });
};

