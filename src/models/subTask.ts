import mongoose,{Schema} from "mongoose";
export interface ISubTask{
    title:String,
    description:String,
    start:Date,
    end:Date,
    isAccepted:Boolean,
    task:mongoose.Schema.Types.ObjectId,
    from:mongoose.Schema.Types.ObjectId,
    recivedUser:mongoose.Schema.Types.ObjectId
}

const subTaskSchema=new Schema<ISubTask>({
    title:{
        type:String,
       
    },
    description:{
        type:String,
      

    },
    start:{type:Date},
    end:{type:Date},
    task:{type:mongoose.Schema.Types.ObjectId,ref:'Task'},
    isAccepted:{
        type:Boolean,
        default:false,
    },
    from:{
        type:mongoose.Schema.Types.ObjectId ,
        required:true,
        ref:'User',
    },
    recivedUser:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

const SubTask=mongoose.model<ISubTask>('SubTask',subTaskSchema)
export default SubTask;


