import mongoose,{Schema} from "mongoose";
export interface ISubTask{
    title:String,
    description:String,
    start:Date,
    end:Date,
    isAccepted:true,
    task:mongoose.Schema.Types.ObjectId,
}

const subTaskSchema=new Schema<ISubTask>({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,

    },
    start:{type:Date,required:true},
    end:{type:Date,required:true},
    task:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Task'}
})

const SubTask=mongoose.model<ISubTask>('SubTask',subTaskSchema)
export default SubTask;


