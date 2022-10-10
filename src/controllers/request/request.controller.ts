import { AuthenticatedReq } from "../../middlewares/auth";
import { Response, NextFunction } from "express";
import Request from "../../models/Request";

//@Desc:Create Request 
// router : post api/v1/request
export const addRequest = async (req: AuthenticatedReq, res: Response) => {


    // check if the request already exist 

    let { title, description, from, to, startTime, endTime, startDate, endDate } = req.body;
    const isRequestExist = await Request.findOne({ title, description, from, to })

    if (isRequestExist)
        return res.status(400).send({ error_en: 'The Request has been made before' })
    // create new request
    const newRequest = new Request({
        title, description, from, to, startTime, endTime,
        startDate, endDate
    })
    await newRequest.save();
    res.status(201).send({ message_en: ' Request created succesfuly ', request: newRequest })

}

//@Desc: get All The Requests
//@route: get api/v1/request
export const getAllRequests = async (req: AuthenticatedReq, res: Response) => {
    const requests = await Request.find().populate('from to', 'fullName_ar fullName_en');
    if (requests.length <= 0)
        return res.status(400).send({ error_en: 'No Request has been made yet' })
    res.status(200).send({ message: 'Requests Fetched Succesfuly', requests })
}

//@Desc Get Request By Id
//@Route : Get api/v1/request/:id

export const getRequestById = async (req: AuthenticatedReq, res: Response) => {
    const id = req.params.id;
    // check if the request exist or not
    const request = await Request.findById(id).populate('from to', 'fullName_ar fullName_en')
    if (!request)
        return res.status(400).send({ error_en: 'Request Not Found' })
    res.status(200).send({ message: "Request Fetched Succesfuly", request })
}

//@Desc update Request 
//@Route : put api/v1/request/:id

export const updateRequest = async (req: AuthenticatedReq, res: Response) => {

    const id = req.params.id;
    // check if the request exist or not
    const isRequestExist = await Request.findById(id)
    if (!isRequestExist)
        return res.status(400).send({ error_en: 'The Request has not been made Yet' })
    const updatedRequest = await Request.findByIdAndUpdate(id, { ...req.body })
    res.status(200).send({ message_en: 'Request updated Succesfuly', request: updatedRequest })

}



//@Desc Delete Request 
//@Route : Delete api/v1/request/:id

export const deleteRequest = async (req: AuthenticatedReq, res: Response) => {
    const id = req.params.id;

    // check if the request exist or not
    const isRequestExist = await Request.findById(id)
    if (!isRequestExist)
        return res.status(400).send({ error_en: 'Request Not Found' })
    const deletedRequest = await Request.findByIdAndDelete(id)
    console.log(deletedRequest)
    res.status(200).send({ message: 'Requset Deleted Succesfuly' })

}
