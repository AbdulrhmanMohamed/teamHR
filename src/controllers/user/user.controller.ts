import { NextFunction, Request, Response } from "express";
import User, { UserI } from "../../models/User";
export const addUser = (req: Request, res: Response, next: NextFunction) => {
    const {fullName_ar,fullName_en,userName_ar,userName_en,position,role,branch,department,nationalId,email,password,phone,phone2,addresss,city,birthDate,maritalStatus }: UserI = req.body
    const user = new User({
        fullName_ar:fullName_ar,
        fullName_en:fullName_en,
        userName_ar:userName_ar,
        userName_en:userName_en,
        phone:phone,
        phone2:phone2,
        position:position,
        role:role,
        branch:branch,
        department:department,
        nationalId:nationalId,
        email:email,
        password:password,
        addresss:addresss,
        city:city,
        birthDate:birthDate,
        maritalStatus:maritalStatus
    })
    user.save()
    res.send(user)
}