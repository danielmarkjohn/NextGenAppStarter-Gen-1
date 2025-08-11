import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (req: Request & { user?: any }, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization
  if (!auth) return next()
  const token = auth.replace('Bearer ', '')
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev') as any
    req.user = { id: payload.id }
  } catch (e) {
    // ignore
  }
  next()
}
