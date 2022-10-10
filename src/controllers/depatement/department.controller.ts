import { Branch } from './../../models/Branch';
import { NextFunction, Request, Response } from "express";
import { AuthenticatedReq } from "../../middlewares/auth";
import { Company } from "../../models/Company";
import { Department } from "../../models/Department";
//@desc         create a Department
//@route        POST /api/v1/department
//@access       private(root)
export const addDepartment = async (req: AuthenticatedReq, res: Response, next: NextFunction) => {
    const { name, branch } = req.body
    // IV:must the name department be unique
    const uniqueDepartment = await Department.findOne({ branch: branch, name: name.toLowerCase() })
    if (uniqueDepartment) return res.status(400).send({ error_en: "The department with the given NAME used befor" })
    const department = new Department({
        name: name,
        branch: branch
    })
    department.save()
    res.send({
        success: true,
        data: department,
        message_en: 'Department is created successfully'
    })
}
//@desc         update a Department
//@route        PUT /api/v1/department/:branch/:name
//@access       private(root)
export const updateDepartment = async (req: AuthenticatedReq, res: Response, next: NextFunction) => {
    const { name } = req.body
    //II:chake the department found with company
    const department = await Department.findOne({ branch: req.params.branch, name: req.params.name.toLowerCase() })
    if (!department) return res.status(400).send({ error_en: "Invaild departement!!" })
    //III:must the name depatment be unique
    const uniqueDepartment = await Department.findOne({ comapny: req.params.branch, name: name.toLowerCase() })
    if (uniqueDepartment) return res.status(400).send({ error_en: "The department with the given NAME used befor" })
    await Department.updateOne({ comapny: req.params.brnach, name: req.params.name.toLowerCase() }, {
        $set: {
            name: name.toLowerCase()
        }
    })
    const newD = await Department.findOne({ comapny: req.params.brnach, name: name.toLowerCase() })
    res.send({
        success: true,
        data: newD,
        message_en: 'Department is updated successfully'
    })

}
//@desc         get all Departments
//@route        GET /api/v1/department/:branch
//@access       private(root)
export const getAllDepartment = async (req: AuthenticatedReq, res: Response, next: NextFunction) => {
    const departments = await Department.find({ branch: req.params.branch })
    res.send({
        success: true,
        data: departments,
        message_en: 'Departments are fetched successfully'
    })
}
//@desc         get a Department
//@route        GET /api/v1/department/:branch/:name
//@access       private(root)
export const getDepartment = async (req: AuthenticatedReq, res: Response, next: NextFunction) => {
    //II:chake the departmnet found with company
    const department = await Department.findOne({ branch: req.params.branch, name: req.params.name.toLowerCase() })
    if (!department) return res.status(400).send({ error_en: "Invaild department!!" })
    res.send({
        success: true,
        data: department,
        message_en: 'Department is fetched successfully'
    })
}