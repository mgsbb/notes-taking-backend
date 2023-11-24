import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
		},
		tags: {
			type: String,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

const NoteModel = mongoose.model('Note', noteSchema);

export default NoteModel;
