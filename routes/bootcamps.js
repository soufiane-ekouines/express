import { Router } from 'express';

import { getbootcamp, getSingleBootcamp , storebootcamp, updatebootcamp, deletebootcamp } from '../controllers/bootcamps.js';

import courseRouter from './courses.js';
import { protect } from '../middleware/auth.js';

const router = Router();

//RE-route into other resource routers
router.use('/:bootcampId/courses',courseRouter)

router.route('/').get(getbootcamp).post(protect,storebootcamp);

router.route('/:id').get(getSingleBootcamp).put(protect,updatebootcamp).delete(protect,deletebootcamp);

export default router;