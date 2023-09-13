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
    sendTokenResponse(user, 200, res);

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

    if (!ismatch) {
        return res.status(401).json({ success: false, message: "the password not correct" })
    }
    // create token
    sendTokenResponse(user, 200, res);
})

// get token from model, and create cookie and send response

export const sendTokenResponse = (user, statusCode, res) => {
    // create token
    const token = user.getsignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }
    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token: token
        })

}