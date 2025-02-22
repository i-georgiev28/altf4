import * as z from 'zod';
import {
    emailValidation,
    passwordValidation,
    usernameValidation,
} from '../users/field-validations';

export const userRegistrationRequestSchema = z.strictObject({
    body: z.strictObject({
        username: usernameValidation,
        email: emailValidation,
        password: passwordValidation,
    }),
});

export const userLoginRequestSchema = z.strictObject({
    body: z.strictObject({
        email: emailValidation,
        password: passwordValidation,
    }),
});


export type UserRegistrationPayload = z.infer<typeof userRegistrationRequestSchema>['body'];
