import { Request, Response } from 'express';
import NoteModel from '../models/noteModel';
import { decodeToken } from '../helpers/decodeToken';
import type { TDecodedData } from '../types';

// ==========================================================================================================
// Controller
// ==========================================================================================================
// get all notes
export const getNotes = async (req: Request, res: Response) => {
	try {
		const decodedData: TDecodedData = decodeToken(req);
		const { page, search, sort } = req.query;

		const regExp = new RegExp(search as string, 'i');

		const queryObject: any = {
			userId: decodedData.userId,
		};

		if (search !== '') {
			queryObject.$or = [
				{ title: regExp },
				{ content: regExp },
				{ tags: regExp },
			];
		}

		let result = NoteModel.find(queryObject);

		// sort
		if (sort === 'az') {
			result.sort('title');
		}
		if (sort === 'za') {
			result.sort('-title');
		}
		if (sort === 'latest') {
			result.sort('-createdAt');
		}
		if (sort === 'oldest') {
			result.sort('createdAt');
		}

		const notes = await result;

		return res.status(200).json({ notes });
	} catch (error) {
		console.log(error);
	}
};

// ==========================================================================================================
// get single note
export const getNote = async (req: Request, res: Response) => {
	try {
		const { noteId } = req.params;
		const decodedData: TDecodedData = decodeToken(req);

		const note = await NoteModel.findOne({
			_id: noteId,
		});

		if (!note) {
			return res.status(404).json({ message: 'Note not found' });
		}

		if (note?.userId?.toString() !== decodedData.userId) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		return res.status(200).json({ note });
	} catch (error) {
		console.log(error);
	}
};

// ==========================================================================================================

export const createNote = async (req: Request, res: Response) => {
	try {
		const { title, content, tags } = req.body.formData;
		const decodedData: TDecodedData = decodeToken(req);

		const note = await NoteModel.create({
			title,
			content,
			tags,
			userId: decodedData.userId,
		});

		return res.status(201).json({ message: 'Note created successfully' });
	} catch (error) {
		console.log(error);
	}
};

// ==========================================================================================================

export const updateNote = async (req: Request, res: Response) => {
	try {
		const { noteId } = req.params;
		const decodedData: TDecodedData = decodeToken(req);

		const { title, content, tags } = req.body.formData;

		const note = await NoteModel.findOne({ _id: noteId });

		if (!note) {
			return res.status(404).json({ message: 'Note not found' });
		}

		if (note?.userId?.toString() !== decodedData.userId) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		const updatedNote = await NoteModel.findOneAndUpdate(
			{ _id: noteId },
			{ title, content, tags },
			{ new: true }
		);

		return res.status(200).json({ message: 'Note updated successfully' });
	} catch (error) {
		console.log(error);
	}
};

// ==========================================================================================================

export const deleteNote = async (req: Request, res: Response) => {
	try {
		const { noteId } = req.params;
		const decodedData: TDecodedData = decodeToken(req);

		const note = await NoteModel.findOne({ _id: noteId });

		if (!note) {
			return res.status(404).json({ message: 'Note not found' });
		}

		if (note?.userId?.toString() !== decodedData.userId) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		const deletedNote = await NoteModel.findOneAndDelete({
			_id: noteId,
		});

		return res.status(200).json({ message: 'Note deleted successfully' });
	} catch (error) {
		console.log(error);
	}
};
