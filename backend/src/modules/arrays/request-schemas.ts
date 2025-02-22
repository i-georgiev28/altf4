import * as z from 'zod';
import { dataValidation, latitudeValidation, longitudeValidation, locationValidation, nameValidation, heightValidation, widthValidation, capacityValidation } from './field-validations';
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
        latitude: latitudeValidation,
        longitude: longitudeValidation,
        width: widthValidation,
        height: heightValidation,
        capacity: capacityValidation,
    }),
});

export const arrayUpdateRequestSchema = z.strictObject({
    params: z.strictObject({
        id: idValidation,
    }),
    body: z.strictObject({
        name: nameValidation.optional(),
        location: locationValidation.optional(),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
        width: z.number().optional(),
        height: z.number().optional(),
        capacity: z.number().optional(),
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
