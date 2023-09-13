import { Router } from 'express';
import { Login, register } from '../controllers/users.js';

const router = Router({mergeParams:true});

router.route('/register').post(register);
router.route('/login').post(Login);




export default router;