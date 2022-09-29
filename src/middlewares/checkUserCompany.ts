import { AuthenticatedReq } from "./auth";
import { Request, Response, NextFunction } from "express";
import { Roles } from "../types/enums";
import { Company } from "../models/Company";

export const checkUserCompany = async (req: AuthenticatedReq, res:Response, next:NextFunction) => {
    // We need to check if this employee is in the same company
    if(req.user?.role === Roles.ADMIN && req.user.company !== req.body.company){
        return res.status(400).send({
            success: false,
            message: 'employees can only be accessed in the same company'
        });
    };

    // We need to check if root can add employees only to his companies
    if(req.user?.role === Roles.ROOT){
        const company = await Company.findOne({owner: req.user._id, _id: req.user.company});
        if(company === null) return res.status(400).send({
            success: false,
            message: "employees can only be accessed in root's companies"
        });
    };

    next();
};
