import { NextFunction, Request, Response } from 'express';
import { UsersService } from './service';
import { ForbiddenException, NotFoundException } from '../../utils';
import { User } from './types';


export class UsersController {
    static async index(req: Request, res: Response, next: NextFunction) {

        const users = await UsersService.index();

        res.json(users);
    }

    static async show(req: Request, res: Response, next: NextFunction) {
        const id = +req.params.id;

        const user = await UsersService.show(id);

        res.json(user);
    }
}
