import { Shift, IShift } from './../../models/Shift';
import { NextFunction, Request, Response } from "express";
import { AuthenticatedReq } from "../../middlewares/auth";
//@desc         create a shift
//@route        POST /api/v1/shift
//@access       private(root,admin)
export const addShift = async (req: AuthenticatedReq, res: Response) => {
    const { name, branch, time, start_day, end_day, allows } = req.body
    //II:must the shift be unique in the selected branch
    const uniqueShift = await Shift.findOne({ branch: branch, name: name })
    if (uniqueShift) return res.status(400).send({ error_en: "The shift with the given NAME used befor" })
    const shift = new Shift({
        name: name,
        branch: branch,
        time: {
            start_hour: time.start_hour,
            end_hour: time.end_hour
        },
        allows: {
            lateTime: {
                hours: allows.lateTime.hours,
                mins: allows.lateTime.mins
            },
            leavingTime: {
                hours: allows.leavingTime.hours,
                mins: allows.leavingTime.mins
            }
        },
        start_day: start_day,
        end_day: end_day,
    })
    shift.save()
    res.send({
        success: true,
        data: shift,
        message_en: 'Shift is created successfully'
    })
}
//@desc         update a shift
//@route        put /api/v1/shift/:branch/:name
//@access       private(root,admin)
export const updateShift = async (req: AuthenticatedReq, res: Response) => {
    const { name, time, weeklyHolidays, start_day, end_day, allows } = req.body
    const branchId = req.params.shift
    const nameShift = req.params.name
    const shift = await Shift.findOne({ branch: branchId, name: nameShift })
    if (!shift) return res.status(400).send({ error_en: "Invaild shift !!" })
    const originalTime = (time.end_hour ? time.end_hour : shift.time.end_hour) - (time.start_hour ? time.start_hour : shift.time.start_hour)
    const uniqueShift = await Shift.findOne({ branch: branchId, name: name })
    if (uniqueShift) return res.status(400).send({ error_en: "The shift with the given NAME used befor" })
    await Shift.updateOne({ branchId, name: nameShift }, {
        $set: {
            name: name ? name : shift.name,
            time: {
                start_hour: time.start_hour ? time.start_hour : shift.time.start_hour,
                end_hour: time.end_hour ? time.end_hour : shift.time.end_hour,
                originalTime: originalTime
            },
            allwos: {
                leteTime: {
                    hours: allows.leteTime.hours ? allows.leteTime.hours : shift.allows.lateTime.hours,
                    mins: allows.leteTime.mins ? allows.leteTime.mins : shift.allows.lateTime.mins
                },
                leavingTime: {
                    hours: allows.leavingTime.hours ? allows.leavingTime.hours : shift.allows.leavingTime.hours,
                    mins: allows.leavingTime.mins ? allows.leavingTime.mins : shift.allows.leavingTime.mins
                }
            },
            start_day: start_day ? start_day : shift.start_day,
            end_day: end_day ? end_day : shift.end_day
        },
        $push: {
            allwos: {
                weeklyHolidays: weeklyHolidays.map((days: Array<number>) => { return days }),
            },
        }
    })
    const newS = await Shift.findOne({ branch: branchId, name: nameShift })
    res.send({
        success: true,
        data: newS,
        message_en: 'Shift is updated successfully'
    })

}
//@desc         get all shifts in branch
//@route        GET /api/v1/shift/:branch
//@access       private(root,admin)
export const getAllShifts = async (req: AuthenticatedReq, res: Response) => {
    const branchId = req.params.branch
    const shifts = await Shift.find({ branch: branchId })
    res.send({
        success: true,
        data: shifts,
        message_en: 'shifts are fetched successfully'
    })
}
//@desc         get a shift
//@route        GET /api/v1/shift/:branch/:name
//@access       private(root,admin)
export const getShift = async (req: AuthenticatedReq, res: Response) => {
    const branchId = req.params.branch
    const nameShift = req.params.name
    const shift = await Shift.findOne({ branch: branchId, name: nameShift })
    if (!shift) return res.status(400).send({ error_en: "Invaild shift !!" })
    res.send({
        success: true,
        data: shift,
        message_en: 'Shift is fetched successfully'
    })
}