import Joi from "joi"
import { days } from "../types/enums";
export function validateBranch(branch: any) {
    const shiftSchema = Joi.object({
        start_h: Joi.number().min(0).max(23).required(),
        start_mins: Joi.number().min(0).max(59).default(0),
        end_h: Joi.number().min(0).max(23).required()
            .when('start_h',
                {
                    is: Joi.number(),
                    then: Joi.number().greater(Joi.ref('start_h'))
                }),
        end_mins: Joi.number().min(0).max(59).default(0),
    });
    const schema = Joi.object({
        branch_name: Joi.string().min(5).max(255),
        company: Joi.objectId(),
        // shifts: Joi.array().items({
        //     work: shiftSchema,
        //     breaks: Joi.array().items(shiftSchema),
        //     overtimes: Joi.array().items(shiftSchema),
        // }),
         weeklyHolidays: Joi.array().items(Joi.number().valid(...days)),
        fixedHolidays: Joi.array().items(Joi.date()),
        location: Joi.object({
            lat: Joi.number().required(),
            long: Joi.number().required()
        }).required()
    });
    const result = schema.validate(branch);
    return result;
};