import Joi from 'joi'
import mongoose, { Schema } from 'mongoose'

export interface IRequest {
    title: String,
    description: String,
    from: mongoose.Schema.Types.ObjectId,
    to: [mongoose.Schema.Types.ObjectId]
    startTime: Date,
    endTime: Date,
}

const requestSchema = new Schema<IRequest>({
    title: {
        type: String,
        required: true,

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
    startTime: {
        type: Date
    },
    endTime: {
        type: Date,
    }

})
const Request = mongoose.model<IRequest>('Request', requestSchema)
export default Request;


