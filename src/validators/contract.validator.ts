import Joi from "joi";
import { IContract } from "../models/Contract";

export const ContractValidation=(contract:IContract)=>{
    const validationSchema=Joi.object({
        employee:Joi.objectId().required(),
        bankAccount:Joi.object().keys({
            accountName:Joi.string().required(),
            accountNumber:Joi.number().required(),
            balance:Joi.number().required(),
        }),
        salary:Joi.number().required(),
        duration:Joi.number().required(),
        startDate:Joi.date().required(),

    })
    const result=validationSchema.validate(contract)
    return result;
}
