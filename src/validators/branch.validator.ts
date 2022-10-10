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
        name: Joi.string().min(2).max(255).required(),
        company: Joi.objectId().required(),
        // shifts: Joi.array().items({
        //     work: shiftSchema,
        //     breaks: Joi.array().items(shiftSchema),
        //     overtimes: Joi.array().items(shiftSchema),
        // }),
        weeklyHolidays: Joi.array().items(Joi.number().valid(...days)),
        fixedHolidays: Joi.array().items(Joi.date()),
        lat: Joi.number().required(),
        long: Joi.number().required()

    });
    const result = schema.validate(branch);
    return result;
};