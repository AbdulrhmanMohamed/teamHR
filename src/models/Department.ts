import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";
import Joi from "joi"
export const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    company: {
        type: ObjectId,
        required: true,
        ref: 'Company'
    },
}, { timestamps: true });
export const Department = mongoose.model('Departments', departmentSchema);
export function validateDepartment(department: any) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(255)
    });
    const result = schema.validate(department);
    return result;
}

