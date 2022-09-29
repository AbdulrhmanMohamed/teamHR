import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import { AuthenticatedReq } from "../../middlewares/auth";
import { Roles } from "../../types/enums";
import { Company } from "../../models/Company";

//@desc         create superadmin
//@route        POST /api/v1/superadmins/:id
//@access       private(super admins)
export const updateUser = async (req: AuthenticatedReq, res:Response, next:NextFunction) => {
    const updatedSuperAdmin = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
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

// //@desc         get all admins
// //@route        GET /api/v1/admins
// //@access       private(admin, root)
// export const updateAdmin = async (req: AuthenticatedReq, res:Response, next:NextFunction) => {
//     // We need to check if this admin is in the same company
//     if(req.user?.role === Roles.ADMIN && req.user.company !== req.body.company){
//         return res.status(400).send({
//             success: false,
//             message: 'admins can only be accessed in the same company'
//         })
//     };

//     // We need to check if root can add admins only to his companies
//     if(req.user?.role === Roles.ROOT){
//         const company = await Company.findOne({owner: req.user._id, _id: req.user.company})
//         if(company === null) return res.status(400).send({
//             success: false,
//             message: 'admins can only be accessed in root companies'
//         });
//     };

//     const updatedSuperAdmin = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
//     if(updatedSuperAdmin === null) return res.status(400).send({
//         success: false,
//         message: 'user not found'
//     });
//     res.json({
//         success: true,
//         message: 'super admin is updated successfully',
//         data: updatedSuperAdmin
//     });
// };

// //@desc         get all employees
// //@route        GET /api/v1/users
// //@access       private(admin, root)
// export const updateEmployee = async (req: AuthenticatedReq, res:Response, next:NextFunction) => {
//     // We need to check if this employee is in the same company
//     if(req.user?.role === Roles.ADMIN && req.user.company !== req.body.company){
//         return res.status(400).send({
//             success: false,
//             message: 'employees can only be accessed in the same company'
//         });
//     };

//     // We need to check if root can add employees only to his companies
//     if(req.user?.role === Roles.ROOT){
//         const company = await Company.findOne({owner: req.user._id, _id: req.user.company})
//         if(company === null) return res.status(400).send({
//             success: false,
//             message: "employees can only be accessed in root's companies"
//         });
//     };

//     const updatedSuperAdmin = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
//     if(updatedSuperAdmin === null) return res.status(400).send({
//         success: false,
//         message: 'user not found'
//     });
//     res.json({
//         success: true,
//         message: 'super admin is updated successfully',
//         data: updatedSuperAdmin
//     });
// };

