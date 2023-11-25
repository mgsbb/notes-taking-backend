import express from 'express';
import {
	getUser,
	getUsers,
	updateUser,
	deleteUser,
} from '../controllers/userControllers';
import { register, login } from '../controllers/authController';

const router = express.Router();

router.post('/', register);
router.post('/login', login);

router.get('/', getUsers);
router.get('/:userId', getUsers);

router.patch('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export default router;
