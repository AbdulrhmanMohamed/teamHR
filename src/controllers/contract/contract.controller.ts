
import { AuthenticatedReq } from "../../middlewares/auth"
import { Response ,NextFunction } from "express"
import Contract from "../../models/Contract"
//@DESC : Get all Contracts 
//@Route :GET  /teamHR/api/v1/contract

export const getAllContract=async(req:AuthenticatedReq,res:Response)=>{
    const contracts=await Contract.find();
    if(contracts.length==0){
        return res.status(400).send({success:false,message_en:'Contracts Not Found'})
    }
    res.status(200).send({success:true,message_en:'Fetching Contracts Succesfuly',contracts})
}

//@DESC: Get Contract By Id
//@Route : GET /teamHR/api/v1/contract/:id
export const getContractById=async(req:AuthenticatedReq,res:Response)=>{
    const id=req.params.id;
    const contract=await Contract.findById(id).populate('employee','fullName_en fullName_ar');
    
    if(!contract)
        res.status(400).send({success:false,message_en:'Contract Not Found'})
    res.status(200).send({success:true,message_en:'Contract Fetched Succesfully',contract})
}


//@DESc : ADD Contract 
//@Route : POST /teamHR/api/v1/contract

export const addContract=async(req:AuthenticatedReq,res:Response)=>{
    console.log('contract added')
    // check if contact already exist 
    let {duration,employee,salary,startDate,endDate,bankAccount}=req.body
    // change the entered from string to Date 
    if(typeof startDate ==='string')
        startDate=new Date(startDate)
    const contractExist=await Contract.findOne({employee:req.body.employee});
    if(contractExist)
        return res.status(400).send({success:false,message_en:'Contract  Already Exist'})
    // adding new employee 
    const newContract=new Contract({duration,employee,salary,startDate,endDate,bankAccount})
    // changing the salary of the employee in the contractor
   newContract.dailySalary= newContract.getDailySalary(salary,duration)
   // calculating the endDate for the contract
   newContract.endDate=newContract.getEndDate(startDate,duration)
   console.log(newContract.getEndDate(startDate,duration))
    await newContract.save();
    res.status(200).send({success:true,message_en:'Contract Added Succesfully'})
}

//@Desc : update Contract
//@Route : PUT /teamHR/api/v1/contract/:id
export const updateContract=async(req:AuthenticatedReq,res:Response)=>{
    const {duration,salary,startDate}=req.body;
    const id=req.params.id;
    // check to see if the contract already exist or not 
    const existedContract=await Contract.findById(id)
    if(!existedContract)
    return res.status(400).send({success:false,message_en:'Contract Does Not Exist Yet '})

   
   
   

    
        const updatedContract=await Contract.findByIdAndUpdate(id,{...req.body},{returnOriginal:false}).populate('employee','fullName_en fullName_ar')
        if(updatedContract != undefined){

            
            // check if he changed the duration 
            if(duration){

                updatedContract.dailySalary=updatedContract.getDailySalary(salary,duration)
                updatedContract.endDate=updatedContract.getEndDate(startDate,duration)
            }
         await updatedContract?.save();
         res.status(200).send({success:true,message_en:'Updated Contract Succesfully',contract:updatedContract})
        }

    
    
    
}

//@Desc: Delete Contract 
//@Route : Delete /teamHR/api/v1/contract/:id

export const deleteContract=async (req:AuthenticatedReq,res:Response)=>{
    const id=req.params.id;
    const existedContract=await Contract.findById(id);
    if(!existedContract)
        return res.status(400).send({success:false,message_en:"Contract Does Not Exist"})
    const deletedContract=await Contract.findByIdAndDelete(id)
    console.log(deletedContract)
    res.status(200).send({sucess:true,message_en:'Contract Deleted Succesfuly'})
}

