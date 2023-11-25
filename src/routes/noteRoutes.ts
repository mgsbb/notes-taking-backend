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
router.get('/:noteId', getNote);
router.post('/', createNote);
router.patch('/:noteId', updateNote);
router.delete('/:noteId', deleteNote);

export default router;
