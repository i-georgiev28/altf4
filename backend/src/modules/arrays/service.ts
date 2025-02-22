import { parseArray, Arrays } from '../../database';
import { ArrayCreatePayload, ArrayUpdatePayload } from './request-schemas';
import { formatSqliteDate, NotFoundException } from '../../utils';
import { ArrayDb } from './types';

class ArraysService {
    async index({ userId }: { userId?: number } = {}) {
        let arrayQuery = Arrays();

        if (userId) {
            arrayQuery = arrayQuery.where({ userId });
        }

        const arraysRaw: ArrayDb[] = await arrayQuery;

        const arrays = arraysRaw.map(arrayRaw => parseArray(arrayRaw)!);

        return arrays;
    }

    async show(id: number) {
        const arrayRaw = await Arrays().where({ id }).first();

        if (!arrayRaw) {
            throw new NotFoundException('Array not found');
        }

        const array = parseArray(arrayRaw);

        return array;
    }

    async store(payload: ArrayCreatePayload & { userId: number }) {
        const arrayRaw = (await Arrays().insert(payload).returning<ArrayDb[]>('*'))[0] as ArrayDb;
        const array = parseArray(arrayRaw);

        return array!;
    }

    async update(id: number, payload: ArrayUpdatePayload) {
        await Arrays().where({ id }).update({ ...payload, });

        const updatedArrayRaw = await Arrays().where({ id }).first();


        if (!updatedArrayRaw) {
            throw new NotFoundException('Array not found');
        }

        const updatedArray = parseArray(updatedArrayRaw);

        return updatedArray;
    }

    async destroy(id: number) {
        const deletedArraysCount = await Arrays().where({ id }).delete();

        return deletedArraysCount === 1;
    }
}

const service = new ArraysService();

export { service as ArraysService };
