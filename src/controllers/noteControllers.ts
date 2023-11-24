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
	} catch (error) {
		console.log(error);
	}
};

// ==========================================================================================================
// get single note
export const getNote = async (req: Request, res: Response) => {
	try {
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
	} catch (error) {
		console.log(error);
	}
};

// ==========================================================================================================
export const deleteNote = async (req: Request, res: Response) => {
	try {
	} catch (error) {
		console.log(error);
	}
};
