import Joi from "joi";
import { Ibreak } from "../models/Break";
export function validateBreak(breakTime: Ibreak) {
    const schema = Joi.object<Ibreak>({
        start: Joi.when('isOpen', {
            is: Joi.boolean().valid(false),
            then: Joi.object({
                hours: Joi.number().required().min(0).max(23),
                mins: Joi.number().min(0).max(59)
            }).required(),
            otherwise: Joi.forbidden()
        }),
        end: Joi.when('isOpen', {
            is: Joi.boolean().valid(false),
            then: Joi.object({
                hours: Joi.number().required().min(0).max(23),
                mins: Joi.number().min(0).max(59).custom((value: any, helper: any) => {
                    if (
                        (value < Joi.ref('start').hours)
                        ||
                        (value === Joi.ref('start').hours && Joi.ref('end').mins <= Joi.ref('start').mins)
                    ) return helper.message("End date cannot be exceed start date");
                }),
            }).required(),
            otherwise: Joi.forbidden()
        }),
        isOpen: Joi.boolean(),
        duration: Joi.when('isOpen', {
            is: Joi.boolean().valid(true),
            then: Joi.object({
                hours: Joi.number().required().min(0).max(23),
                mins: Joi.number().min(0).max(59)
            }).required(),
            otherwise: Joi.forbidden()
        }),
        shift: Joi.objectId().alter({
            post: (schema: any) => schema.required(),
            put: (schema: any) => schema.forbidden()

        })
    });
    const result = schema.validate(breakTime);
    return result;
};