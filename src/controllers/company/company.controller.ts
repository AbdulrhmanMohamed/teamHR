import { NextFunction, Request, Response } from "express";
import { AuthenticatedReq } from "../../middlewares/auth";
import { Company } from "../../models/Company";
import Subscription from "../../models/Subscription";
import User from "../../models/User";
import { FindeById } from "../../validators/find";
//@desc         create a company
//@route        POST /api/v1/company
//@access       private(root)
export const addCompany = async (req: AuthenticatedReq, res: Response, next: NextFunction) => {
    const { owner, name } = req.body
    const ownerId = req.user?._id
    // get subscripe
    const subscription: any = await Subscription.findOne({ subscriber: ownerId ? ownerId : owner }).populate("package", "maxCompaniesAllowed maxEmployeesAllowed")
    //I:must check how companies the root can added 
    const companies: any = await Company.find({ owner: ownerId ? ownerId : owner })
    if (subscription.package.maxCompaniesAllowed == companies.length) return res.status(400).send({ error_en: "You can't add more of compines becuse You have exceeded the limit of your Companies Allowed" })
    //IV:must the name company be unique 
    const nameCo = await Company.findOne({ owner: ownerId ? ownerId : owner, name: name.toLowerCase() })
    if (nameCo) return res.status(400).send({ error_en: "The company with the given NAME used befor" })
    const company = new Company({
        owner: ownerId ? ownerId : owner,
        name: name.toLowerCase()
    })
    res.send({
        success: true,
        data: company,
        message_en: 'company is created successfully'
    })
    company.save()
}
//@desc         get all companies owner
//@route        GET /api/v1/company
//@access       private(root)
export const getOwnerCompanies = async (req: AuthenticatedReq, res: Response) => {
    const { owner } = req.body
    const ownerId = req.user?._id
    const companies: any = await Company.find({ owner: ownerId ? ownerId : owner })
    res.send({
        success: true,
        data: companies,
        message_en: 'Companies are fetched successfully'
    })
}
//@desc         get a company by name 
//@route        GET /api/v1/company/:name
//@access       private(root)
export const getCompanyByName = async (req: AuthenticatedReq, res: Response) => {
    const { owner } = req.body
    const ownerId = req.user?._id
    const companies: any = await Company.findOne({ owner: ownerId ? ownerId : owner, name: req.params.name })
    res.send({
        success: true,
        data: companies,
        message_en: 'Company is fetched successfully'
    })
}
//@desc         update a company by name 
//@route        PUT /api/v1/company/:name
//@access       private(root)
export const updateCompanyByName = async (req: AuthenticatedReq, res: Response) => {
    const { owner, name } = req.body
    const ownerId = req.user?._id
    const chakeCompany = await Company.findOne({ owner: ownerId ? ownerId : owner, name: req.params.name.toLowerCase() })
    if (!chakeCompany) return res.status(400).send({ error_en: "The company with the given NAME is not found" })
    //IV:must the name company be unique 
    const nameCo = await Company.findOne({ owner: ownerId ? ownerId : owner, name: name.toLowerCase() })
    if (nameCo) return res.status(400).send({ error_en: "The company with the given NAME used befor" })
    await Company.updateOne({ owner: owner, name: req.params.name.toLowerCase() }, {
        $set: {
            name: name.toLowerCase()
        }
    })
    const newCompany = await Company.findOne({ owner: ownerId ? ownerId : owner, name: name.toLowerCase() })
    res.send({
        success: true,
        data: newCompany,
        message_en: 'Company is updated successfully'
    })
}