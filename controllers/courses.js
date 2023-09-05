import { Course } from "../models/Course.js";
import { asyncHandler } from "../middleware/async.js";

//@desc get all courses
//@route GET /api/v1/courses
// @access public
export const getcources =  asyncHandler(async(req,res,next)=>{
    let query;

    const reqQuery = {...req.query};

    const removeFields = ['select','sort','page','limit'];

    removeFields.forEach(params => delete reqQuery[params]);

    let queryStr = JSON.stringify(reqQuery)

    //create operators like gt gte ect
    // queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    query = Course.find(JSON.parse(queryStr));

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
    const total = await Course.countDocuments();

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
    const courses = await query;

    res.status(200).send({ success: true, count: courses.length,pagination:pagination, data: courses })
})

//@desc store courses
//@route POST /api/v1/courses
// @access private
export const createcource = asyncHandler( async (req,res,next)=>{
    const course = await Course.create(req.body);

    res.status(200).send({ success: true,  data: course })

})

//@desc get single courses
//@route GET /api/v1/courses/:id
// @access public
export const getsinglecourse = asyncHandler( async (req,res,next)=>{

    const course = await Course.findById(req.params.id);

    res.status(200).send({ success: true,  data: course })

})


//@desc update courses
//@route PUt /api/v1/courses/:id
// @access private
export const updatecourse = asyncHandler( async (req,res,next)=>{

    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).send({ success: true,  data: course })

})


//@desc delete courses
//@route delete /api/v1/courses/:id
// @access private
export const deletecourse = asyncHandler( async (req,res,next)=>{

    const course = await Course.findByIdAndDelete(req.params.id);

    res.status(200).send({ success: true,  message:"Course is deleted" })

})
