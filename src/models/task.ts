import mongoose ,{Schema} from 'mongoose'
import Joi from 'joi'
import { TaskStatus } from '../types/enums'
export interface ITask{
    start:Date,
    end:Date,
    from:mongoose.Schema.Types.ObjectId,
    to:[mongoose.Schema.Types.ObjectId],
    isAccepted:Boolean,
    status:TaskStatus,
}
const taskSchema=new Schema<ITask>({
    start:{
        type:Date,
        required:true,
    },
    end:{
        type:Date,
        required:true,
    },
    from:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'User'
    },
    to:[
        {type:mongoose.Schema.Types.ObjectId,required:true}
    ],
    isAccepted:true,
    status:TaskStatus.PENDING,
})

const Task=mongoose.model<ITask>('Task',taskSchema)
export default Task;

export const taskValidation=(task:ITask)=>{
    const schema=Joi.object({
        start:Joi.date().required(),
        end:Joi.date().required(),
        from:Joi.objectId().required(),
        to:Joi.array().items(Joi.objectId().required())
    })
    return  schema.validate(task)
}
