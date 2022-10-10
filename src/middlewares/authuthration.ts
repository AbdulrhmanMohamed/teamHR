import { AuthenticatedReq } from './auth';
import { NextFunction, Request, Response } from "express";
import { Company } from "../models/Company";
import { Branch } from '../models/Branch';
export const AuthuthrationMiddleware = (type: string) => async function (
    req: AuthenticatedReq,
    res: Response,
    next: NextFunction
) {
    const owner = req.user?._id
    const company = req.body.company
    const companies: any = await Company.find({ owner: owner })
    const branch: any = await Branch.findOne({ _id: req.body.branch ? req.body.branch : req.params.branch })
    const companiesId = companies.map((co: any) => {
        return co._id.toString()
    })
    if (type === "company") {
        if (!companies[0]) return res.status(404).send({ error_en: "You don't have any company for now.." })
    }
    else if (type === "branch") {
        const companyValid = await Company.findOne({ owner: owner, _id: company })
        if (!companyValid) return res.status(401).send({ error_en: "You cannot (add or update or get) any branch in this company because you are not the owner of the company" })
    }
    else if (type === "departement" || type === "shift") {
        if (!companiesId.includes(branch.company.toString())) return res.status(401).send({ error_en: `You cannot (add or update or get) any ${type} in this branch because you are not the owner of the company has this branch` })
    }
    // else if () {
    //     if (!companiesId.includes(branch.company.toString())) return res.status(401).send({ error_en: "You cannot (add or update or get) any shift in this branch because you are not the owner of the company has this branch" })
    // }
    else if (type == "admin") {

    }
    else if (type === "employee") {

    }
    else if (type === "break") {

    }
    else if (type === "overtime") {

    }
    else if (type === "category") {

    }
    else if (type === "subCategory") {

    }
    else if (type === "request") {

    }
    else if (type === "alert") {

    }
    else if (type === "task") {

    }
    next();
};