import { Ibreak } from './../../models/Break';
import { Response, Request, NextFunction } from "express";
import { Break } from "../../models/Break";
import User from '../../models/User';
//@desc         create a breakTime
//@route        POST /api/v1/break
//@access       private(root,admin)
export const addBreak = async (req: Request, res: Response) => {
    const brea = await Break.create(req.body);
    res.send({
        success: true,
        data: brea,
        message_en: 'Break is created successfully'
    })
};
//@desc         get all breaks in shift
//@route        GET /api/v1/break/:shift
//@access       private(root,admin)
export const getAllBreaks = async (req: Request, res: Response) => {
    const bks = await Break.find({ shift: req.params.shift })
    if (!bks) return res.status(400).send({ error_en: "Invalid shift !! , can't get the breaks from the shift " })
    res.send({
        success: true,
        data: bks,
        message_en: 'Breaks are fetched successfully'
    })
}
//@desc         update a breakTime
//@route        PUT /api/v1/break/:shift/:id
//@access       private(root,admin)
export const updateBreak = async (req: Request, res: Response) => {
    const { start, end, duration, isOpen } = req.body
    const bk = await Break.findOne({ shift: req.params.shift, _id: req.params.id })
    if (!bk) return res.status(400).send({ error_en: "Invalid break !!" })
    // if want just update the start and the end for break 
    if (!isOpen && !bk.isOpen) {
        await Break.updateOne({ shift: req.params.shift, _id: req.params.id }, {
            $set: {
                start: {
                    hours: start.hours ? start.hours : bk.start.hours,
                    mins: start.mins ? start.mins : bk.start.mins
                },
                end: {
                    hours: end.hours ? end.hours : bk.end.hours,
                    mins: end.mins ? end.mins : bk.end.mins
                }
            }
        })
    }
    // if want make the break open so will update isOpen and update duration for break 
    else if (isOpen && !bk.isOpen) {
        await Break.updateOne({ shift: req.params.shift, _id: req.params.id }, {
            $set: {
                isOpen: isOpen,
                duration: {
                    hours: duration.hours ? duration.hours : bk.duration.hours,
                    mins: duration.mins ? duration.mins : bk.duration.mins
                },
                start: null,
                end: null
            }
        })
    }
    // if want make the break specific time so will update isOpen and update start and end for break 
    else if (!isOpen && bk.isOpen) {
        await Break.updateOne({ shift: req.params.shift, _id: req.params.id }, {
            $set: {
                isOpen: isOpen,
                duration: null,
                start: {
                    hours: start.hours ? start.hours : bk.start.hours,
                    mins: start.mins ? start.mins : bk.start.mins
                },
                end: {
                    hours: end.hours ? end.hours : bk.end.hours,
                    mins: end.mins ? end.mins : bk.end.mins
                }
            }
        })
    }
    //if want just update the duration for break
    else if (isOpen && bk.isOpen) {
        await Break.updateOne({ shift: req.params.shift, _id: req.params.id }, {
            $set: {
                isOpen: isOpen,
                duration: {
                    hours: duration.hours ? duration.hours : bk.duration.hours,
                    mins: duration.mins ? duration.mins : bk.duration.mins
                },
            }
        })
    }
    const newBk = await Break.findOne({ shift: req.params.shift, _id: req.params.id })
    res.send({
        success: true,
        data: newBk,
        message_en: 'Break is update successfully'
    })
}
//@desc         get a breakDetails in shift
//@route        GET /api/v1/break/:shift/:id
//@access       private(root,admin)
export const getBreakById = async (req: Request, res: Response) => {
    const bk: any = await Break.findOne({ shift: req.params.shift, _id: req.params.id })
    if (!bk) return res.status(400).send({ error_en: "Invalid break !!" })
    res.send({
        success: true,
        data: bk,
        message_en: 'Break is fetched successfully'
    })
}
//@desc         delete a break in shift
//@route        DELETE /api/v1/break/:shift/:id
//@access       private(root,admin)
export const deleteBreakById = async (req: Request, res: Response) => {
    const bk: any = await Break.findOne({ shift: req.params.shift, _id: req.params.id })
    if (!bk) return res.status(400).send({ error_en: "Invalid break !!" })
    await Break.deleteOne({ shift: req.params.shift, _id: req.params.id })
    res.send({
        success: true,
        message_en: 'Break is deleted successfully'
    })
}
//@desc         Assign user to Break
//@route        POST /api/v1/break/assign/:shift/:id
//@access       private(root,admin)
export const assignUser = async (req: Request, res: Response) => {
    const userId = req.body.userId;
    let user;
    if (userId) user = await User.findById(userId);
    if (!user) return res.status(400).send("User you are trying to assing to is not available");
    const breakv = await Break.findById({ shift: req.params.shift, _id: req.params.id });
    if (!breakv) return res.status(400).send("Create break shift first");
    const assignedBreak = await Break.findOne({
        users: { $elemMatch: { $eq: userId } },
        $or: [
            { $and: [{ start: { $gte: breakv.start } }, { end: { $lte: breakv.end } }] },
            { $and: [{ start: { $lte: breakv.start } }, { end: { $gte: breakv.end } }] },
            { $and: [{ start: { $lte: breakv.start } }, { end: { $gt: breakv.start } }] },
            { $and: [{ start: { $lt: breakv.end } }, { end: { $gte: breakv.end } }] },
        ]
    });
    const assignedBreakOpen = await Break.findOne({
        isOpen: true,
        users: { $elemMatch: { $eq: userId } },
    });
    if (assignedBreak || assignedBreakOpen) return res.status(400).send("user is already signed in another break in the selected time'");
    const brea = await Break.findByIdAndUpdate({ shift: req.params.shift, _id: req.params.id }, { $push: { users: userId } }, { new: true });
    res.send({
        success: true,
        date: brea,
        message_en: 'User is assign to break successfully'
    })

};
//@desc         Unassign user from Break
//@route        POST /api/v1/break/unassign/:shift/:id
//@access       private(root,admin)
export const unassignUser = async (req: Request, res: Response) => {
    const userId = req.body.userId;
    let user;
    if (userId) user = await User.findById(userId);
    if (!user) return res.status(400).send("User you are trying to unassign to is not available");
    const brea = await Break.findByIdAndUpdate(req.params.id, { $pull: { users: userId } }, { new: true });
    if (!brea) return res.status(400).send("Create Break shift first");
    res.send({
        success: true,
        date: brea,
        message_en: 'User is unassign from break successfully'
    })
}

