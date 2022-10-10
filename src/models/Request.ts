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


export const validateRequest = (request: IRequest) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        from: Joi.objectId().required(),
        to: Joi.array().items(Joi.objectId().required()).required(),
        startDate: Joi.date(),
        endDate: Joi.date(),

    })
    return schema.validate(request)
}