import mongoose, { Schema} from "mongoose";
import { ObjectId } from "mongodb";
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

