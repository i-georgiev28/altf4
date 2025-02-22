import * as z from 'zod';

const name = z.string().min(2).max(32);
const location = z.string().min(5).max(64);
const data = z.string().min(0).max(2048);

export {
    name as nameValidation,
    location as locationValidation,
    data as dataValidation
};
