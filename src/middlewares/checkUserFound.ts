import { Request, Response, NextFunction } from "express";
import User from "../models/User";

const checkUserFound = async (req: Request, res: Response, next: NextFunction) => {
    let user = await User.findOne({ email: req.body.email });
    if (user !== null) return res.status(400).send('User already registered.');
    next();
}

export default checkUserFound;