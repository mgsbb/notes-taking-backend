import express from 'express';
import {
	getUser,
	getUsers,
	createUser,
	updateUser,
	deleteUser,
	login,
} from '../controllers/userControllers';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUsers);

router.post('/', createUser);
router.post('/login', login);

router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
