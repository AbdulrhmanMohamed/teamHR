import { NextFunction, Request, Response } from "express";
import { Branch } from "../../models/Branch";
export const addBranch = (req: Request, res: Response, next: NextFunction) => {
    //III:must chake the user have subs and chake the time left for subs 
    // if dose not have return error 
    // if the time left is finished return error
    //II:must chake the user is root 
    // if the user not owner return error
    //I:must check the company, his want add branch in it , he has this the company
    //if the root dose not have the company return error 
    //IV:must the name branch be unique
    const {branch_name,lat,lang,company,weeklyHolidays } = req.body
    const branch = new Branch({

    })
}