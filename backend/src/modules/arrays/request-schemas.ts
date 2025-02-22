import * as z from 'zod';
import { dataValidation, locationValidation, nameValidation } from './field-validations';
import { idValidation } from '../../utils';

export const arrayIndexRequestSchema = z.strictObject({
    query: z.strictObject({
            userId: idValidation.optional(),
        },
    ).optional(),
});

export const arrayShowRequestSchema = z.strictObject({
    params: z.strictObject({
        id: idValidation,
    }),
});

export const arrayCreationRequestSchema = z.strictObject({
    body: z.strictObject({
        name: nameValidation,
        location: locationValidation,
    }),
});

export const arrayUpdateRequestSchema = z.strictObject({
    params: z.strictObject({
        id: idValidation,
    }),
    body: z.strictObject({
        name: nameValidation.optional(),
        location: locationValidation.optional(),
        data: dataValidation.optional(),
    }),
});

export const arrayDestroyRequestSchema = z.strictObject({
    params: z.strictObject({
        id: idValidation,
    }),
});


export type ArrayCreatePayload = z.infer<typeof arrayCreationRequestSchema>['body'];
export type ArrayUpdatePayload = z.infer<typeof arrayUpdateRequestSchema>['body'];
