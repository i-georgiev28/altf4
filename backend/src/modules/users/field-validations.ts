import * as z from 'zod';

const username = z.string().min(4).max(16);
const password = z.string().min(8).max(32);
const email = z.string().min(0).max(320);

export {
    username as usernameValidation,
    password as passwordValidation,
    email as emailValidation,
};
