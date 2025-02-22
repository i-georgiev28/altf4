import * as z from 'zod';

const name = z.string().min(2).max(32);
const location = z.string().min(5).max(128);
const latitude = z.number();
const longitude = z.number();
const width = z.number();
const height = z.number();
const capacity = z.number().optional();
const data = z.string().min(0).max(2048);

export {
    name as nameValidation,
    location as locationValidation,
    latitude as latitudeValidation,
    longitude as longitudeValidation,
    width as widthValidation,
    height as heightValidation,
    capacity as capacityValidation,
    data as dataValidation
};
