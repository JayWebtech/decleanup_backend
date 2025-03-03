import type { Request, Response, NextFunction } from 'express';
import { eq, and } from 'drizzle-orm';
import { db } from '../db';
import { users, authSessions } from '../db/schema';
import { verifyToken } from '../utils/jwt';

// Extend Express Request type
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                walletAddress: string;
            };
        }
    }
}

// Middleware to authenticate requests with JWT
export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                message: 'Authentication required',
            });
            return;
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Authentication required',
            });
            return;
        }

        // Verify token
        const decoded = verifyToken(token);
        if (!decoded) {
            res.status(401).json({
                success: false,
                message: 'Invalid or expired token',
            });
            return;
        }

        // Check if token is in active sessions
        const session = await db.query.authSessions.findFirst({
            where: and(
                eq(authSessions.token, token),
                eq(authSessions.active, true)
            ),
        });

        if (!session) {
            res.status(401).json({
                success: false,
                message: 'Session expired or invalid',
            });
            return;
        }

        // Check if token is expired
        if (new Date() > new Date(session.expiresAt)) {
            // Deactivate expired session
            await db
                .update(authSessions)
                .set({ active: false })
                .where(eq(authSessions.id, session.id));

            res.status(401).json({
                success: false,
                message: 'Session expired',
            });
            return;
        }

        // Get user
        const user = await db.query.users.findFirst({
            where: eq(users.id, decoded.userId),
        });

        if (!user) {
            res.status(401).json({
                success: false,
                message: 'User not found',
            });
            return;
        }

        // Add user to request
        req.user = {
            id: user.id,
            walletAddress: user.walletAddress,
        };

        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
}; 