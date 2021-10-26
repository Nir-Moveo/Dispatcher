import { IUser } from '../../users/users.schema';
import { Request, Response, NextFunction } from 'express';
import { ForbiddenException, InvalidTokenException } from '../../../../exceptions';
import { JWTController } from './jwt.controller';

class RequestController {
    /**
     * Check received Headers and adds token value on locals
     *
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {Promise<void>}
     * @throws { ForbiddenException , InvalidTokenException}
     * @memberof RequestController
     */
    public static async headerValidation(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (req.method === 'OPTIONS') {
            //todo
            return next();
        }
        const authHeaderVal = req.headers.authorization;
        const token = JWTController.cleanReceivedToken(authHeaderVal);

        if (!token) {
            next(new ForbiddenException());
        } else {
            try {
                const decoded = await JWTController.verifyToken(token);
                res.locals.user = decoded as IUser;
                next();
            } catch (error) {
                next(new InvalidTokenException());
            }
        }
    }
}

export default RequestController;
