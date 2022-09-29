import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import { AuthenticatedReq } from "../../middlewares/auth";
import { Roles } from "../../types/enums";

//@desc         update superadmin
//@route        UPDATE /api/v1/users/superadmins/:id
//@access       private(super admins)
export const updateSuperAdmin = async (req: AuthenticatedReq, res:Response, next:NextFunction) => {
    const updatedSuperAdmin = await User.updateOne({_id: req.params.id, role: Roles.SUPER_ADMIN}, req.body, {new: true});
    if(updatedSuperAdmin === null) return res.status(400).send({
        success: false,
        message: 'user not found'
    });
    res.json({
        success: true,
        message: 'super admin is updated successfully',
        data: updatedSuperAdmin
    });
};

//@desc         update root
//@route        UPDATE /api/v1/users/roots/:id
//@access       private(super admins)
export const updateRoot = async (req: AuthenticatedReq, res:Response, next:NextFunction) => {
    const updatedRoot = await User.updateOne({_id: req.params.id, role: Roles.ROOT}, req.body, {new: true});
    if(updatedRoot === null) return res.status(400).send({
        success: false,
        message: 'user not found'
    });
    res.json({
        success: true,
        message: 'super admin is updated successfully',
        data: updatedRoot
    });
};

//@desc         Update admin
//@route        UPDATE /api/v1/users/admins/:id
//@access       private(admin, root)
export const updateAdmin = async (req: AuthenticatedReq, res:Response, next:NextFunction) => {
    const updatedAdmin = await User.updateOne({_id: req.params.id, role: Roles.ADMIN, company: req.user!.company}, req.body, {new: true});
    // We need to check if this admin is in the same company
    if(updatedAdmin === null) return res.status(400).send({
        success: false,
        message: 'user not found'
    });

    res.json({
        success: true,
        message: 'super admin is updated successfully',
        data: updatedAdmin
    });
};

//@desc         get all employees
//@route        GET /api/v1/users/employees/:id
//@access       private(admin, root)
export const updateEmployee = async (req: AuthenticatedReq, res:Response, next:NextFunction) => {
    const updatedEmployee = await User.updateOne({_id: req.params.id, role: Roles.EMPLOYEE, company: req.user!.company}, req.body, {new: true});

    if(updatedEmployee === null) return res.status(400).send({
        success: false,
        message: 'user not found'
    });
    res.json({
        success: true,
        message: 'super admin is updated successfully',
        data: updatedEmployee
    });
};

