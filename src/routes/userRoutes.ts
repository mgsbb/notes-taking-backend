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
router.get('/:id', getUsers);

router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
