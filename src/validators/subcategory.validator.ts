import Joi from "joi";
import { IRequest } from "../models/Request";
import { ISubCategory } from "../models/SubCategory";

export function validateSubCategory(subCategory: ISubCategory) {

    // check the truthness of have time 
    // const haveTime = subCategory.haveTime;
    const schema = Joi.object({
        subType: Joi.string().required(),
        haveTime: Joi.boolean().required(),
        category: Joi.objectId().required()
    })
    return schema.validate(subCategory)
}