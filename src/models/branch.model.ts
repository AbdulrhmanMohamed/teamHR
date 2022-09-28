import mongoose, { Schema} from "mongoose";
import { ObjectId } from "mongodb";
// const { days } = require('../data/enums');
// const { BranchShift } = require('./DayShift');
import Joi from "joi"
Joi.objectId = require('joi-objectid')(Joi)
export const branchSchema = new Schema({
    branch_name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    location: {
        lat: Number,
        long: Number
    },
    company: {
        type: ObjectId,
        required: true,
        ref: 'Company'
    },
    // shifts: [{
    //     work: BranchShift,
    // }],
    weeklyHolidays: [String],
    fixedHolidays: [Date]

}, { timestamps: true });

export const Branch = mongoose.model("Branches", branchSchema);
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
        shifts: Joi.array().items({
            work: shiftSchema,
            breaks: Joi.array().items(shiftSchema),
            overtimes: Joi.array().items(shiftSchema),
        }),
        // weeklyHolidays: Joi.array().items(Joi.string().valid(...days)),
        fixedHolidays: Joi.array().items(Joi.date()),
        location: Joi.object({
            lat: Joi.number().required(),
            long: Joi.number().required()
        }).required()
    });
    const result = schema.validate(branch);
    return result;
};

