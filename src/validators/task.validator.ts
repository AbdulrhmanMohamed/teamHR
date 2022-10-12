import Joi from "joi"
import { ITask } from "../models/task"

export const taskValidation=(task:ITask)=>{
    const schema=Joi.object({
        start:Joi.date().required(),
        end:Joi.date().required(),
        from:Joi.objectId().required(),
        to:Joi.array().items(Joi.objectId().required())
    })
    return  schema.validate(task)
}