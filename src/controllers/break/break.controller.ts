import { Ibreak } from './../../models/Break';
import { Response, Request, NextFunction } from "express";
import { Break } from "../../models/Break";
//@desc         create a breakTime
//@route        POST /api/v1/break
//@access       private(root,admin)
export const addBreak = async (req: Request, res: Response) => {
    const brea = await Break.create(req.body);
    res.send({
        success: true,
        data: brea,
        message_en: 'break is created successfully'
    })
};
//@desc         update a breakTime
//@route        POST /api/v1/break/:shift/:id
//@access       private(root,admin)
export const updateBreak = async (req: Request, res: Response) => {
    const { start, end, duration, isOpen } = req.body
    const bk = await Break.findOne({ shift: req.params.shift, _id: req.params.shift })
    if (!bk) return res.status(400).send({ error_en: "Invaild break !!" })
    // if want just update the start and the end for break 
    if (!isOpen && !bk.isOpen) {
        await Break.updateOne({ shift: req.params.shift, _id: req.params.shift }, {
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
        await Break.updateOne({ shift: req.params.shift, _id: req.params.shift }, {
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
        await Break.updateOne({ shift: req.params.shift, _id: req.params.shift }, {
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
        await Break.updateOne({ shift: req.params.shift, _id: req.params.shift }, {
            $set: {
                isOpen: isOpen,
                duration: {
                    hours: duration.hours ? duration.hours : bk.duration.hours,
                    mins: duration.mins ? duration.mins : bk.duration.mins
                },
            }
        })
    }
    const newBk = await Break.findOne({ shift: req.params.shift, _id: req.params.shift })
    res.send({
        success: true,
        data: newBk,
        message_en: 'break is update successfully'
    })
}
export const getAllBreaks = async (req: Request, res: Response) => {
    const bks = await Break.find({ shift: req.params.shift })
    if (!bks) return res.status(400).send({ error_en: "Invalid shift !! , can't get the breaks from the shift " })
}
//@desc         get all breaks in shift
//@route        GET /api/v1/break/:shift
//@access       private(root,admin)

//@desc         get a breaks in shift
//@route        GET /api/v1/break/:shift/:id
//@access       private(root,admin)