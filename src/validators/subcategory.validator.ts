import Joi from "joi";
import { IRequest } from "../models/Request";
import { ISubCategory } from "../models/SubCategory";

export function validateSubCategory(subCategory: ISubCategory, request: IRequest) {

    // check the truthness of have time 
    const haveTime = subCategory.haveTime;
    if (haveTime) {
        const schema = Joi.object({
            startDate: Joi.date().required(),
            endDate: Joi.date().required(),
        })
        schema.validate(request)
    }
}