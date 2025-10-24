import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface JwtPayload {
  id: string;
  role: 'member' | 'moderator' | 'admin';
  name: string;
  email: string;
}

export function requireAuth(req: Request & { user?: JwtPayload }, res: Response, next: NextFunction) {
  try {
    const auth = req.headers.authorization;
    if (!auth?.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
    const token = auth.slice(7);
    const secret = process.env.JWT_SECRET || 'dev_secret';
    const decoded = jwt.verify(token, secret) as JwtPayload;
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

export function requireRole(roles: JwtPayload['role'][]) {
  return (req: Request & { user?: JwtPayload }, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
}
