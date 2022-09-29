import mongoose, { Schema} from "mongoose";
import { ObjectId } from "mongodb";
// const { days } = require('../data/enums');
// const { BranchShift } = require('./DayShift');
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
    weeklyHolidays: [Number],
    fixedHolidays: [Date]

}, { timestamps: true });

export const Branch = mongoose.model("Branches", branchSchema);


