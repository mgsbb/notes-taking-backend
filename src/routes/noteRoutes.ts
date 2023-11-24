import express from 'express';
import {
	getNote,
	getNotes,
	createNote,
	updateNote,
	deleteNote,
} from '../controllers/noteControllers';

const router = express.Router();

router.get('/', getNotes);
router.get('/:id', getNote);
router.post('/', createNote);
router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
