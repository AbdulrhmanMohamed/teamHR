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
        ref: 'Member'
    },

}, { timestamps: true })
export const Company = mongoose.model('company', schema);
export function validateCompany(company: any) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(255),
        owner: Joi.objectId()
    });
    const result = schema.validate(company);
    return result;
}
