import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
		},
	},
	{ timestamps: true }
);

const NoteModel = mongoose.model('Note', noteSchema);

export default NoteModel;
