import { Request, Response, NextFunction } from 'express';

export default function (req: Request, res: Response, next: NextFunction) {
	var secret = req.body.api_key || req.query.api_key;
	if (!secret || secret !== process.env.API_KEY) {
		return res.sendStatus(403);
	}
	next();
}
