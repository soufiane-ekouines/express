import { Router } from 'express';

import { getbootcamp, getSingleBootcamp , storebootcamp, updatebootcamp, deletebootcamp } from '../controllers/bootcamps.js';

const router = Router();

router.route('/').get(getbootcamp).post(storebootcamp);

router.route('/:id').get(getSingleBootcamp).put(updatebootcamp).delete(deletebootcamp);

export default router;