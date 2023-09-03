import { Bootcamp } from "../models/Bootcamp.js";
import { asyncHandler } from "../middleware/async.js";
//@desc get all bootcamp
//@route GET /api/v1/bootcamps
// @access public
export const getbootcamp = async (req, res, next) => {
    let query;

    const reqQuery = {...req.query};

    const removeFields = ['select','sort','page','limit'];

    removeFields.forEach(params => delete reqQuery[params]);

    let queryStr = JSON.stringify(reqQuery)

    //create operators like gt gte ect
    // queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    query = Bootcamp.find(JSON.parse(queryStr));

    //select fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ')
        query.select(fields);
    }

    //sort by
    if (req.query.sort) {
        const sortby = req.query.sort.split(',').join(' ')
        query.sort(sortby);
    }else{
        query.sort('-createdAt');
    }

    //paginate
    const page = parseInt(req.query.page,10)|| 1
    const limit = parseInt(req.query.limit,10)|| 10
    const startIndex = (page-1)*limit
    const endIndex = page*limit;
    const total = await Bootcamp.countDocuments();

    query = query.skip(startIndex).limit(limit);

    const pagination = {};

    if(endIndex < total){
        pagination.next = {
            page :page+1,
            limit
        }
    }

    if(startIndex > 0){
        pagination.prev = {
            page :page-1,
            limit
        }
    }

    const bootcamps = await query;

    res.status(200).send({ success: true, count: bootcamps.length,pagination:pagination , data: bootcamps });
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

