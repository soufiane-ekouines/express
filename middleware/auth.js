import  jwt  from "jsonwebtoken";
import { asyncHandler } from "./async.js";
import { User } from "../models/User.js";

export const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    // else if (req.cookies.token) {
    //     token = req.cookies.token;
    // }

    // make sure token exists

    if (!token) {
        return res.status(401).json({ success: false, message: "Not autorize to access this route" })
    }

    try {
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

        req.user = await User.findById(decoded._id);

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Not autorize to access this route" })

    }
});