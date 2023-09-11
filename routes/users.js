import { Router } from 'express';
import { register } from '../controllers/users.js';

const router = Router({mergeParams:true});

router.route('/register').post(register);



export default router;