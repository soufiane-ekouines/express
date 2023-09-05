import { Router } from 'express';
import { getcources,createcource, getsinglecourse, updatecourse, deletecourse } from '../controllers/courses.js';


const router = Router({mergeParams:true});

router.route('/').get(getcources).post(createcource);

router.route('/:id').get(getsinglecourse).put(updatecourse).delete(deletecourse);

export default router;