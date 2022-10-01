import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";
export interface ICompany {
    name: String,
    owner: ObjectId
}
const schema = new Schema<ICompany>({
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
export const Company = mongoose.model<ICompany>('company', schema);

