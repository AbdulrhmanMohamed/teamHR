import Joi from "joi"
import { ISubTask } from "../models/subTask"

export const subTaskValidation=(subTask:ISubTask)=>{
    const schema=Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        start:Joi.date().required(),
        end:Joi.date().required(),
        task:Joi.objectId().required(),
    })
    return schema.validate(subTask)
}
