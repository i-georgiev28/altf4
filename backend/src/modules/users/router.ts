import { Router } from 'express';
import { UsersController } from './controller';
import { authenticate, validateRequest } from '../../middlewares';
import { userDestroyRequestSchema, userIndexRequestSchema, userShowRequestSchema, userUpdateRequestSchema } from './request-schemas';


const app = Router();

app.get('/', validateRequest(userIndexRequestSchema), UsersController.index);
app.get('/:id', validateRequest(userShowRequestSchema), UsersController.show);



export {
    app as UserRouter,
};
