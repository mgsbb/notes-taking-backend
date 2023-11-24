import { Request, Response, NextFunction } from 'express';

const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		let token = req?.headers?.authorization?.split(' ')[1];

		if (!token) {
			throw new Error('There is no token found');
		}

		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({ message: 'Unauthorized action' });
	}
};

export default authMiddleware;
