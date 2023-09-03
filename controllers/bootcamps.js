import { Bootcamp } from "../models/Bootcamp.js";
import { asyncHandler } from "../middleware/async.js";
//@desc get all bootcamp
//@route GET /api/v1/bootcamps
// @access public
export const getbootcamp = async (req, res, next) => {
    let query;
    let queryStr = JSON.stringify(req.query)

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    query = Bootcamp.find(JSON.parse(queryStr));
    const bootcamps = await query;
    res.status(200).send({ success: true, count: bootcamps.length, data: bootcamps });
}

//@desc get single bootcamp
//@route GET /api/v1/bootcamps/:id
// @access public
export const getSingleBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamps = await Bootcamp.findById(req.params.id);
    if (!bootcamps) {
        return res.status(400).send({ success: false, data: null });
    }
    res.status(200).send({ success: true, data: bootcamps });

});

//@desc store bootcamp
//@route POST /api/v1/bootcamps
// @access private
export const storebootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(200).send({ success: true, data: bootcamp });
});

//@desc update bootcamp
//@route PUt /api/v1/bootcamps/:id
// @access private
export const updatebootcamp = asyncHandler(async (req, res, next) => {
    const bootcamps = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!bootcamps) {
        return res.status(400).send({ success: false, data: null });
    }
    res.status(200).send({ success: true, data: bootcamps });

})


//@desc delete bootcamp
//@route delete /api/v1/bootcamps/:id
// @access private
export const deletebootcamp = asyncHandler(async (req, res, next) => {

    const bootcamps = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamps) {
        return res.status(400).send({ success: false, data: null });
    }
    res.status(200).send({ success: true, message: "bootcamps is deleted" });

})

