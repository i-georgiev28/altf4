import { Router } from 'express';
import { authenticate, validateRequest } from '../../middlewares';
import { ArraysController } from './controller';
import { arrayCreationRequestSchema, arrayDestroyRequestSchema, arrayIndexRequestSchema, arrayShowRequestSchema, arrayUpdateRequestSchema } from './request-schemas';

const app = Router();

app.get('/', validateRequest(arrayIndexRequestSchema), ArraysController.index);
app.post('/', [validateRequest(arrayCreationRequestSchema), authenticate], ArraysController.store);
app.get('/:id', validateRequest(arrayShowRequestSchema), ArraysController.show);
app.put('/:id', [validateRequest(arrayUpdateRequestSchema), authenticate], ArraysController.update);
app.delete('/:id', [validateRequest(arrayDestroyRequestSchema), authenticate], ArraysController.destroy);

export {
    app as ArraysRouter,
};
