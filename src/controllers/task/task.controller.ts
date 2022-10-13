import { AuthenticatedReq } from "../../middlewares/auth";
import { Response, NextFunction } from "express";

import Task, { ITask } from "../../models/task";
import { Roles } from "../../types/enums";
import mongoose, { ObjectId } from "mongoose";
import SubTask from "../../models/subTask";
// @Desc : get all the tasks
// @Route : GET /teamHR/api/v1/task

export const forwardSubtasks=(SendedTask:any)=>{
    const { title, description, to, from, start, end, status } =SendedTask ;
    to.map(async(refTask:any)=>{
          const subtask=new SubTask({ title, description, recivedUser: refTask, from, start, end, status,task:SendedTask._id })
          await subtask.save()
       })
}
export const updateForwardedTask=(sendedTask:any)=>{
    const { title, description, to, from, start, end, status } =sendedTask ;
    to.map(async(refTask:any)=>{
          const subtask=await SubTask.find({task:sendedTask._id}).updateMany({ title, description, recivedUser: refTask, from, start, end, status,task:sendedTask._id })
          
       })
}
export const getAllTasks = async (req: AuthenticatedReq, res: Response) => {
  const tasks = await Task.find().populate("to");
  if (tasks.length <= 0)
    return res
      .status(400)
      .send({ success: false, message_en: "NO Task Found" });
  res.status(200).send({
    success: true,
    message_en: "Tasks Are Fetched Successfully",
    tasks,
  });
};

//@DESC : get Task By Id
//@Route : Get /teamHR/api/v1/task/:id
export const getTaskById = async (req: AuthenticatedReq, res: Response) => {
  const taskId = req.params.id;
  const task = await Task.findById(taskId);
  if (!task)
    return res.status(400).send({ success: false, message: "Task Not Found" });
  res
    .status(200)
    .send({ success: true, message_en: "Task Fetched Successfullly", task });
};

//@Desc: Add Task
//@Route : POST /teamHR/api/v1/task
export const addTask = async (req: AuthenticatedReq, res: Response) => {
  // if((req as AuthenticatedReq).user?.role !=Roles.ROOT){
  //     return res.status(400).send({success:false,message_en:`You Don't have Access to add Task`})
  // }
  
  const task = new Task({
    ...req.body,
  });
 forwardSubtasks(task)
  await task.save();
  res
    .status(200)
    .send({ success: true, message_en: "Task is Added Successfully", task });
};
//@DESC : update Task
//@Route : PUT /teamHR/api/v1/task/:id
export const updateTask = async (req: AuthenticatedReq, res: Response) => {
  const taskId = req.params.id;
  

  const task = await Task.findByIdAndUpdate(
    taskId,
    { ...req.body },
    { new: true }
  );
  console.log(task);
  updateForwardedTask(task)
  if (!task)
    return res
      .status(400)
      .send({ success: false, message_en: "Task is Not Found" });
  res
    .status(200)
    .send({ success: true, message_en: "Task updated Successfully", task });
};

//@DESC : delete Task ById
//Route : DELETE /teamHR/api/v1/task/:id
export const deleteTask = async (req: AuthenticatedReq, res: Response) => {
  const TaskId = req.params.id;
  console.log(TaskId);
  const task = await Task.findByIdAndRemove(TaskId);
  if (!task)
    return res
      .status(400)
      .send({ success: false, message_en: "Task Not Found" });
  await SubTask.deleteMany({ task: TaskId });

  res
    .status(200)
    .send({ success: true, message_en: "Task Deleted Successfully" });
};
