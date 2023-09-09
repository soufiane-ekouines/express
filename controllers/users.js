import { User } from "../models/User.js";
import { asyncHandler } from "../middleware/async.js";


export const register = asyncHandler(async (req, res, next) => {
    res.status(200).send({ success: true,message:'register' })

})