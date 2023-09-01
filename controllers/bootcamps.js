import { Bootcamp } from "../models/Bootcamp.js"; 

//@desc get all bootcamp
//@route GET /api/v1/bootcamps
// @access public
export async function getbootcamp(req,res,next){
    const bootcamps = await Bootcamp.find();
    res.status(200).send({ success: true, data: bootcamps  });
}

//@desc get single bootcamp
//@route GET /api/v1/bootcamps/:id
// @access public
export async function getSingleBootcamp(req,res,next){
    const bootcamps = await Bootcamp.findById(req.params.id);
    res.status(200).send({ success: true, data: bootcamps  });
}

//@desc store bootcamp
//@route POST /api/v1/bootcamps
// @access private
export async function  storebootcamp(req,res,next){
    try {
        
     const bootcamp = await Bootcamp.create(req.body);

    res.status(200).send({ success: true, data: bootcamp  });
    } catch (err) {
    res.status(400).send({ success: false, data: null,error:err  });
        
    }


}

//@desc update bootcamp
//@route PUt /api/v1/bootcamps/:id
// @access private
export function updatebootcamp(req,res,next){
    res.status(200).send({ success: true, message: 'update bootcamps '+req.params.id  });
}


//@desc delete bootcamp
//@route delete /api/v1/bootcamps/:id
// @access private
export function deletebootcamp(req,res,next){
    res.status(200).send({ success: true, message: 'delete bootcamps '+req.params.id  });

}

