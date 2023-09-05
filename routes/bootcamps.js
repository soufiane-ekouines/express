import { Router } from 'express';

import { getbootcamp, getSingleBootcamp , storebootcamp, updatebootcamp, deletebootcamp } from '../controllers/bootcamps.js';

import courseRouter from './courses.js';

const router = Router();

//RE-route into other resource routers
router.use('/:bootcampId/courses',courseRouter)

router.route('/').get(getbootcamp).post(storebootcamp);

router.route('/:id').get(getSingleBootcamp).put(updatebootcamp).delete(deletebootcamp);

export default router;