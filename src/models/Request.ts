import Joi from 'joi'
import mongoose, { Schema } from 'mongoose'

export interface IRequest {
    title: String,
    description: String,
    from: mongoose.Schema.Types.ObjectId,
    to: [mongoose.Schema.Types.ObjectId]
    startDate: Date,
    endDate: Date,
    status: Boolean
}

const requestSchema = new Schema<IRequest>({
    title: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    to: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    startDate: {
        type: Date
    },
    endDate: {
        type: Date,
    },
    status: Boolean

}, { timestamps: true })
const Request = mongoose.model<IRequest>('Request', requestSchema)
export default Request;



