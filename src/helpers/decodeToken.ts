import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { TDecodedData } from 'types';

export const decodeToken = (req: Request) => {
	try {
		let token = req?.headers?.authorization?.split(' ')[1];

		let decodedData: TDecodedData;

		const JWT_SECRET = process.env.JWT_SECRET || '';

		if (token) {
			// TODO: check if safe
			decodedData = jwt.verify(token, JWT_SECRET) as TDecodedData;
		}

		return decodedData;
	} catch (error) {
		console.log(error);
	}
};
