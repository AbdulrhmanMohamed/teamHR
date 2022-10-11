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


export const validateRequest = (request: IRequest) => {
    const schema = Joi.object({
        title: Joi.objectId().required(),
        description: Joi.string().required(),
        from: Joi.objectId().required(),
        to: Joi.array().items(Joi.objectId().required()).required(),
        startDate: Joi.date(),
        endDate: Joi.date(),
        status: Joi.boolean().required()

    })
    return schema.validate(request)
}