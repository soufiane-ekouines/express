//@desc get all bootcamp
//@route GET /api/v1/bootcamps
// @access public
export function getbootcamp(req,res,next){
    res.status(200).send({ success: true, message: 'show all bootcamps'  });
}

//@desc get single bootcamp
//@route GET /api/v1/bootcamps/:id
// @access public
export function getSingleBootcamp(req,res,next){
    res.status(200).send({ success: true, message: 'show bootcamp by id '+req.params.id  });
}

//@desc store bootcamp
//@route POST /api/v1/bootcamps
// @access private
export function storebootcamp(req,res,next){
    res.status(200).send({ success: true, message: 'store bootcamps' });
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

