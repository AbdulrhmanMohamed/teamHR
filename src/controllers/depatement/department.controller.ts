import { NextFunction, Request, Response } from "express";
import { Department } from "../../models/Department";

export const addDepartment = (req: Request, res: Response, next: NextFunction) => {
    //I:must check how companies the root can added 
    // if the user already finished the limit number of combines reteun erorr 
    //II: must chake the user have subs and chake the time left for subs 
    // if dose not have return error 
    // if the time left is finished return error
    //III:must check the company, his want add department init , he has this the company
    // if the root dose not have the company return error 
    //IV:must the name department be unique
    const {name,company} = req.body
    const department = new Department({

    })
}