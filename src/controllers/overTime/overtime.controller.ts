import { Overtime } from './../../models/OverTime';
import { Response, Request, NextFunction } from "express";
import User from '../../models/User';
import { Shift } from '../../models/Shift';
//@desc         create a overTime
//@route        POST /api/v1/break
//@access       private(root,admin)
export const addOverTime = async (req: Request, res: Response) => {
    const brea = await Overtime.create(req.body);
    res.send({
        success: true,
        data: brea,
        message_en: 'Overtime is created successfully'
    })
};
//@desc         get all overtimes in shift
//@route        GET /api/v1/over/:shift
//@access       private(root,admin)
export const getAllOverTimeByShift = async (req: Request, res: Response) => {
    const ovts = await Overtime.find({ shift: req.params.shift })
    if (!ovts) return res.status(400).send({ error_en: "Invalid shift !! , can't get the overtimes from the shift " })
    res.send({
        success: true,
        data: ovts,
        message_en: 'Overtimes are fetched successfully'
    })
}
//@desc         update a overTime
//@route        PUT /api/v1/over/:shift/:id
//@access       private(root,admin)
export const updateBreak = async (req: Request, res: Response) => {
    const { start, end, } = req.body
    const over = await Overtime.findOne({ shift: req.params.shift, _id: req.params.id })
    if (!over) return res.status(400).send({ error_en: "Invalid OverTime !!" })
    await Overtime.updateOne({ shift: req.params.shift, _id: req.params.id }, {
        $set: {
            start: start ? start : over.start,
            end: end ? end : over.end,

        }
    })
    const newOver = await Overtime.findOne({ shift: req.params.shift, _id: req.params.id })
    res.send({
        success: true,
        data: newOver,
        message_en: 'Overtime is update successfully'
    })
}
//@desc         get a overTimeDetails in shift
//@route        GET /api/v1/over/:shift/:id
//@access       private(root,admin)
export const getBreakById = async (req: Request, res: Response) => {
    const overTime: any = await Overtime.findOne({ shift: req.params.shift, _id: req.params.id })
    if (!overTime) return res.status(400).send({ error_en: "Invalid Overtime !!" })
    res.send({
        success: true,
        data: overTime,
        message_en: 'Overtime is fetched successfully'
    })
}
//@desc         Assign user to OverTime
//@route        POST /api/v1/over/assign/:shift/:id
//@access       private(root,admin)
export const assginUser = async (req: Request, res: Response) => {
    const userId = req.body.userId;
    let user: any;
    if (userId) user = await User.findById(userId);
    if (!user) return res.status(400).send("User you are trying to assing to is not available");
    const overtime = await Overtime.findById(req.params.id);
    if (!overtime) return res.status(400).send("Create overtime shift first");
    const assignedOvertime = await Overtime.findOne({
        shift: req.params.shift, _id: req.params.id,
        users: { $elemMatch: { $eq: userId } }, $or: [
            { $and: [{ start: { $gte: overtime.start } }, { end: { $lte: overtime.end } }] },
            { $and: [{ start: { $lte: overtime.start } }, { end: { $gte: overtime.end } }] },
            { $and: [{ start: { $lte: overtime.start } }, { end: { $gt: overtime.start } }] },
            { $and: [{ start: { $lt: overtime.end } }, { end: { $gte: overtime.end } }] },
        ]
    })
    const workingShift = await Shift.findOne({ _id: user.workShift, });
    // to know the user dose not have a shift in the time overtime
    //get day for overTime
    const day: any = assignedOvertime?.start.getDay()
    // if the user have shift in the same day overtime
    if (workingShift?.origianalDays.includes(day)) {
        let orginalHoursWork: Array<Number> = []
        // get the hours user must working in the day 
        for (let index = workingShift.time.end_hour; index >= workingShift.time.start_hour; index--) {
            orginalHoursWork.push(index)
        }
        // get the start hour for overtime
        const startHours: any = assignedOvertime?.start.getHours()
        //get the end hour for overtime
        const endHours: any = assignedOvertime?.end.getHours()
        //check the overtime start hour and overtime finish hour are not in his shift
        if (orginalHoursWork.includes(startHours) || orginalHoursWork.includes(endHours))
            return res.status(400).send({ error_en: "user has a shift in the same time overtime" });
    }
    if (assignedOvertime) return res.status(400).send('user is already signed in another overtime in the selected time');
    await overtime.updateOne({ req }, { $addToSet: { users: userId } }).exec();
    res.send({
        success: true,
        data: overtime.users,
        message_en: 'user is signed to overtime successfully'
    })
}
//@desc         Unssign user to OverTime
//@route        POST /api/v1/over/unassign/:shift/:id
//@access       private(root,admin)
export const unassignUser = async (req: Request, res: Response) => {
    const userId = req.body.userId;
    let user;
    if (userId) user = await User.findById(userId);
    if (!user) return res.status(400).send("User you are trying to assing to is not available");
    const overtime = await Overtime.findByIdAndUpdate({ shift: req.params.shift, _id: req.params.id }, { $pull: { users: userId } }, { new: true });
    if (!overtime) return res.status(400).send("Create overtime shift first");
    res.send({
        success: true,
        data: overtime.users,
        message_en: 'user is unassign from overtime successfully'
    })

}