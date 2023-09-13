import { Router } from 'express';
import { getcources,createcource, getsinglecourse, updatecourse, deletecourse } from '../controllers/courses.js';
import { protect } from '../middleware/auth.js';


const router = Router({mergeParams:true});

router.route('/').get(getcources).post(protect,createcource);

router.route('/:id').get(getsinglecourse).put(protect,updatecourse).delete(protect,deletecourse);

export default router;