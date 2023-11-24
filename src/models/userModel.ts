import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		auth: {
			password: { type: String, required: true, select: false },
			sessionToken: { type: String, select: false },
		},
	},
	{ timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
