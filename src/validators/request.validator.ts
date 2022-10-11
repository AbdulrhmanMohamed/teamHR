import Joi from "joi"
import { IRequest } from "../models/Request"

export const validateRequest = (request: IRequest) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        from: Joi.objectId().required(),
        to: Joi.array().items(Joi.objectId().required()).required(),
        startDate: Joi.date(),
        endDate: Joi.date(),

    })
    return schema.validate(request)
}