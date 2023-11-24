import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';

// ==========================================================================================================

export const register = async (req: Request, res: Response) => {
	try {
		const { email, password, confirmPassword, firstName, lastName } = await req
			.body.formData;

		if (password !== confirmPassword) {
			return res.status(400).json({
				message: 'Passwords do not match',
			});
		}

		const existingUser = await UserModel.findOne({ email });

		if (existingUser) {
			return res.status(400).json({
				message: 'User already exists',
			});
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = await UserModel.create({
			firstName,
			lastName,
			email,
			auth: {
				password: hashedPassword,
			},
		});

		const token = await jwt.sign(
			{
				userId: newUser._id,
				email,
				firstName,
				lastName,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: process.env.JWT_EXPIRY,
			}
		);

		newUser.auth.sessionToken = token;
		await newUser.save();

		res.cookie('token', newUser.auth.sessionToken, {
			domain: 'localhost',
			path: '/',
		});

		res.status(201).json({ token, message: 'User created successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server error' });
	}
};

// ==========================================================================================================

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = await req.body.formData;

		const user = await UserModel.findOne({ email }).select('+auth.password');

		if (!user) {
			return res.status(400).json({
				message: 'Invalid credentials',
			});
		}
		const isValidPassword = await bcrypt.compare(password, user.auth.password);

		if (!isValidPassword) {
			return res.status(400).json({
				message: 'Invalid credentials',
			});
		}

		const token = await jwt.sign(
			{
				userId: user._id,
				email,
				firstName: user.firstName,
				lastName: user.lastName,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: process.env.JWT_EXPIRY,
			}
		);

		user.auth.sessionToken = token;
		await user.save();

		res.cookie('token', user.auth.sessionToken, {
			domain: 'localhost',
			path: '/',
		});

		res.status(200).json({ message: 'User logged in successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server error' });
	}
};

// ==========================================================================================================
