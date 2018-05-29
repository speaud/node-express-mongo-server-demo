import { Request, Response } from 'express'

export const testDefault = (req: Request, res: Response) => {
	res.json({message: 'test: get'});
};