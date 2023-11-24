import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import noteRoutes from './routes/noteRoutes';
import userRoutes from './routes/userRoutes';

import authMiddleware from './middlewares/authMiddleware';

// ==========================================================================================================
// Configuration
// ==========================================================================================================

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// ==========================================================================================================
// Application
// ==========================================================================================================

const app = express();

app.use(express.json());
app.use(cors());
// app.use(
// 	cors({
// 		credentials: true,
// 		allowedHeaders: ['Content-Type', 'Authorization'],
// 		origin: ['http://localhost:5173'],
// 	})
// );

app.use('/api/v1/notes', authMiddleware, noteRoutes);
app.use('/api/v1/users', userRoutes);

// ==========================================================================================================
// Database connection
// ==========================================================================================================

function connectDB() {
	try {
		mongoose.connect(MONGO_URL);
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	} catch (error) {
		console.log(error);
	}
}

connectDB();
