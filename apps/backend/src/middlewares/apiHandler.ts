import { StatusEnum } from '@/types/ApiTypes';
import { Request, Response } from 'express';

interface IApi {
  (req: Request, res: Response): Promise<{ statusCode: StatusEnum; data: object }>;
}

export const apiHandler = (api: IApi) => async (req: Request, res: Response) => {
  try {
    const { statusCode, data } = await api(req, res);
    return res.status(statusCode).json(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return res.status(500).json({ error: String(error), timeStamp: new Date().toISOString() });
  }
};
