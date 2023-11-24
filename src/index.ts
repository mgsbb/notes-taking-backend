import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(express.json());
app.use(cors());

function connectDB() {
	try {
		mongoose.connect(MONGO_URL);
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	} catch (error) {
		console.log(error);
	}
}

connectDB();
