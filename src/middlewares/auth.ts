// import { NextFunction, Request, Response } from "express";
// import { User } from "../models/user.model";

// const jwt = require("jsonwebtoken");

// export const AuthenticationMiddleware = async function (
//     req: any,
//     res: Response,
//     next: NextFunction
// ) {
//     try {
//         //Get Token From Header Of Request And Check If Token Is Exist
//         const token: string | undefined = req.header("Authentication");
//         if (!token) return res.status(401).send({ error_en: "Access Denied!!" });
//         //decoded Token And Find In Mongoo db By id Then CHeck If user Exist
//         const decoded: any = jwt.verify(token, process.env.JWTS);
//         const user = await User.findById(decoded._id);
//         if (!user) return next("Invalid Token");
//         // Set Current User To locals
//         req.user = user;
//         // call next Middleware
//         return next();
//     } catch (ex) {
//         next("Invalid Token");
//     }
// };