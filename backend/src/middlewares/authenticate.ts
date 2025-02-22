import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import { User } from '../modules/users';


const passportCallback = (req: Request, res: Response, next: NextFunction, unauthorizedMessage = 'Unauthorized') => (err: Error, user: User | null) => {
    
    if (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }

    if (!user) {
        return res.status(401).json({ message: unauthorizedMessage });
    }
    req.user = user;

    // Invoking "next" to continue to the controller
    next();
};

const local = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // If email or password is missing, send an error back to the client
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const unauthorizedMessage = 'Incorrect email or password';
    passport.authenticate('local', passportCallback(req, res, next, unauthorizedMessage))(req, res, next);
};

const jwt = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', passportCallback(req, res, next))(req, res, next);
};

const jwtRefresh = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt-refresh', passportCallback(req, res, next))(req, res, next);
};

export const authMiddlewares = {
    local,
    jwt,
    'jwt-refresh': jwtRefresh,
};
export const authenticate = authMiddlewares.jwt; // alias