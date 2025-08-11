/**
 * @openapi
 * /users/me:
 *   get:
 *     summary: Get current user
 *     responses:
 *       200:
 *         description: user
 */
import { Request, Response } from 'express'

export const me = async (req: Request, res: Response) => {
  // stub: attach user via auth middleware
  res.json({ id: 'stub', email: 'user@example.com' })
}
