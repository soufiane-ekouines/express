import { User } from "../models/User.js";
import { asyncHandler } from "../middleware/async.js";


export const register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    // create user
    const user = await User.create({
        name,
        email,
        password,
        role
    });

    // create token
    const token = user.getsignedJwtToken();
    res.status(200).json({success:true,token:token })
})