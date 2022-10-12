
import  mongoose,{Schema} from 'mongoose'
import Joi, { string } from 'joi'

export interface IPayRol{
    employee:mongoose.Schema.Types.ObjectId,
    day:Date,
    originalTime:Number,
    lateTime:Number,
    dailySalary:Number,
    type:Enumerator
    salary:Number,
    calculateDailySalry:(originalTime:Number,lateTime:Number,salary:Number)=>Number
}

const payrolSchema=new Schema<IPayRol>({
    employee:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    day:{
        type:Date,
        required:true,
        
    },
    dailySalary:{
        type:Number,
        required:true,
    },
    originalTime:{
        type:Number,
        required:true,
    },
    lateTime:{
        type:Number,
        required:true,
    },
    type:{
        type:String,
        enum:['shift','overtime']
    },
    salary:{
        type:Number,
        required:true,
    }
},{timestamps:true})

const Payrol=mongoose.model<IPayRol>('Payrol',payrolSchema)

payrolSchema.methods.calculateDailySalry=(originalTime:number,lateTime:number,salary:number)=>{
    return Number( salary / (originalTime - lateTime))
}
export default Payrol


