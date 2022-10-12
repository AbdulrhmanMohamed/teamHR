import { AuthenticatedReq } from "../../middlewares/auth";
import {Router,Response} from 'express'
import Payrol from "../../models/payrol";

//DESC Get All The Payrol 
//Route: GET /teamHR/api/v1/payrol
export const getAllPayRols=async(req:AuthenticatedReq,res:Response)=>{
    const payrols= await Payrol.find();
    if(payrols.length <=0)
        return res.status(400).send({success:false,success_en:`Can't Find Payrols`})
    res.status(200).send({success:true,message_en:'Payrols Fetched Successfully'})
}

//DESC : Get PayRol ById
//Route : Get /teamHR/api/v1/payrol/:id
export const getPayrolById=async(req:AuthenticatedReq,res:Response)=>{
    const payrolId=req.params.id;
    const payrol=await Payrol.findById(payrolId);
    if(!payrol)
        return res.status(400).send({success:false,message:'Payrol Not Found'})
    res.status(200).send({success:true,message_en:'Payrol Succesfully Fetched '})
}

// // DESC : Get PayRol 
// // Route: POST /TeamHR/api/v1/payrol/
// export const addPayrol=async(req:AuthenticatedReq,res:Response)=>{
//     const payrolExisted= await Payrol.findOne({employee:req.body.employee})
//     if(payrolExisted)
//         return res.status(500).send({success:false,message_en:'pay rol not found'})
//     const newPayrol=new Payrol({...req.body})
//     await newPayrol.save();
//     res.status(200).send({success:true,message:'new Payrol added'})

// }

// export const updatePayrol=async(req:AuthenticatedReq,res:Response)=>{
//     const id=req.params.id;

//     const payRolExisted=await Payrol.findByIdAndUpdate(id,{...req.body},{new:true})
//     if(!payRolExisted){
//         return res.status(400).send({success:true,message:'updated payrol successfully'})
//     }
        
// }