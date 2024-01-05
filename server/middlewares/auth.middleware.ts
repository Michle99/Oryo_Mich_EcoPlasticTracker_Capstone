import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateUser = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'Unauthorized: Missing token' });
    return;
  }

  try {
    const decoded = jwt.verify(token, 'secret') as { userId: string };
    req.params.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
