import mongoose, { Schema} from "mongoose";
import { ObjectId } from "mongodb";
import Joi from "joi"
const schema = new Schema({

    name: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    owner: {
        type: ObjectId,
        ref: 'User'
    },

}, { timestamps: true })
export const Company = mongoose.model('company', schema);
export function validateCompany(company: any) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(255),
        admin: Joi.objectId()
    });
    const result = schema.validate(company);
    return result;
}
