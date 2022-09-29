import { NextFunction, Request, Response } from "express";
import { Company } from "../../models/Company";
export const addCompany = (req: Request, res: Response, next: NextFunction) => {
    //I:must check how companies the root can added 
    // if the user already finished the limit number of combines reteun erorr 
    //II: must chake the user have subs and chake the time left for subs 
    // if dose not have return error 
    // if the time left is finished return error
    //I:must chake the user is root 
    // if the user not owner return erro 
    //IV:must the name company be unique 
    const { owner, name } = req.body
    const company = new Company({

    })
}