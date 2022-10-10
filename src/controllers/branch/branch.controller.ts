import { NextFunction, Request, Response } from "express";
import { Branch } from "../../models/Branch";
import { AuthenticatedReq } from '../../middlewares/auth';
//@desc         create a branch
//@route        POST /api/v1/company
//@access       private(root)
export const addBranch = async (req: AuthenticatedReq, res: Response, next: NextFunction) => {
    const { name, lat, long, company, weeklyHolidays, fixedHolidays } = req.body
    //I:must check the company, his want add branch in it , he has this the company
    // const companyValid = await Company.find({ owner: ownerId, _id: company })
    // if (!companyValid[0]) return res.status(400).send({ error_en: "You cannot add a branch in this company because you are not the owner of the company" })
    //IV:must the name branch be unique
    const uniqueBranch = await Branch.findOne({ comapny: company, name: name.toLowerCase() })
    if (uniqueBranch) return res.status(400).send({ error_en: "The branch with the given NAME used befor" })
    const branch = new Branch({
        name: name.toLowerCase(),
        company: company,
        location: {
            lat: lat,
            long: long
        },
    })
    branch.save()
    res.send({
        success: true,
        data: branch,
        message_en: 'Branch is created successfully'
    })
}
//@desc         get all branches in company
//@route        GET /api/v1/company
//@access       private(root)
export const getAllBranches = async (req: AuthenticatedReq, res: Response, next: NextFunction) => {
    //I:must check the company, his want fetched branches in it , he has this the company
    // const companyValid = await Company.find({ owner: ownerId, _id: req.params.company })
    // if (!companyValid[0]) return res.status(400).send({ error_en: "You cannot get any branch in this company because you are not the owner of the company" })
    const branches = await Branch.find({ company: req.params.company })
    res.send({
        success: true,
        data: branches,
        message_en: 'Branches are fetched successfully'
    })
}
//@desc         get details branch in company
//@route        GET /api/v1/company/:comapny/:name
//@access       private(root)
export const getBranch = async (req: AuthenticatedReq, res: Response, next: NextFunction) => {
    //I:must check the company, his want get branch in it , he has this the company
    // const companyValid = await Company.find({ owner: ownerId, _id: req.params.company })
    // if (!companyValid[0]) return res.status(400).send({ error_en: "You cannot get any branch in this company because you are not the owner of the company" })
    //II:chake the branch found with company
    const branch = await Branch.findOne({ company: req.params.company, name:  req.params.name.toLowerCase() })
    if (!branch) return res.status(400).send({ error_en: "Invaild branch!!" })
    res.send({
        success: true,
        data: branch,
        message_en: 'Branch is fetched successfully'
    })
}
//@desc         update a branch
//@route        PUT /api/v1/company/:company/:name
//@access       private(root)
export const updateBranch = async (req: AuthenticatedReq, res: Response, next: NextFunction) => {
    const { name, lat, long, weeklyHolidays, fixedHolidays } = req.body
    const ownerId = req.user?._id
    //I:must check the company, his want update branch in it , he has this the company
    // const companyValid = await Company.find({ owner: ownerId, _id: req.params.company })
    // if (!companyValid[0]) return res.status(400).send({ error_en: "You cannot update any branch in this company because you are not the owner of the company" })
    //II:chake the branch found with company
    const branch = await Branch.findOne({ company: req.params.company, name:  req.params.name.toLowerCase() })
    if (!branch) return res.status(400).send({ error_en: "Invaild branch!!" })
    //III:must the name branch be unique
    const uniqueBranch = await Branch.findOne({ comapny: req.params.company, name: name.toLowerCase() })
    if (uniqueBranch) return res.status(400).send({ error_en: "The branch with the given NAME used befor" })
    await Branch.updateOne({ company: req.params.company, name: req.params.name.toLowerCase() },
        {
            $set: {
                name: name.toLowerCase(),
                location: { lat: lat, long: long },

            },
            $push: {
                fixedHolidays: fixedHolidays.map((days: Array<Date>) => { return days })
            }

        })
    const newB = await Branch.findOne({ company: req.params.company, name: name.toLowerCase() })
    res.send({
        success: true,
        data: newB,
        message_en: 'Branch is updated successfully'
    })

}