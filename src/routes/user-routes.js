import express from 'express';
import {
  loginUser,
  registerUser,
  getUser,
  getCraftsmanDetails,
} from '../controllers/user-controller.js';
import checkUser from '../middlewares/check-user.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/me', checkUser, getUser);

router.get('/craftsman/:id', getCraftsmanDetails);

export default router;
