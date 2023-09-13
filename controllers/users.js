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
    res.status(200).json({ success: true, token: token })
})


export const Login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // validation email and password
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "the email or password can't be null" })

    }
    //check for the user 
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ success: false, message: "the email not found" })

    }
    // check if password match 
    const ismatch = await user.matchpassword(password);
    console.log('value',user.matchpassword(password));

    if (!ismatch) {
        return res.status(401).json({ success: false, message: "the password not correct" })
    }
    // create token
    const token = user.getsignedJwtToken();
    res.status(200).json({ success: true, token: token })
})