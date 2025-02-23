import { RefreshToken, RefreshTokenDb } from '../modules/auth';
import { parseSqliteDate } from '../utils';
import { User, UserDb, UserDbWithoutHashedPassword } from '../modules/users';
import { Array, ArrayDb } from '../modules/arrays';


type DateKey<T> = {
    [K in keyof T]: NonNullable<T[K]> extends Date ? K : never
}[keyof T];

type ExtractDateKeys<T> = DateKey<T>[];


function parseRow<ReturnType>(
    row: any,
    dateFields: ExtractDateKeys<ReturnType>,
): ReturnType {
    const parsedRow = { ...row };

    dateFields.forEach((field) => {
        if (parsedRow[field]) {
            parsedRow[field] = parseSqliteDate(parsedRow[field]);
        }
    });

    return parsedRow as ReturnType;
}


export function parseRefreshToken(refreshToken: RefreshTokenDb) {
    const dateFields: DateKey<RefreshToken>[] = ['revokedAt', 'expiresAt', 'createdAt', 'updatedAt'];

    return parseRow<RefreshToken>(refreshToken, dateFields);
}

export function parseUser(user: UserDb | UserDbWithoutHashedPassword) {

    const parsedUser = parseRow<User>(user, []);

    delete (parsedUser as any).hashedPassword;

    return parsedUser;
}

export function parseArray(array: ArrayDb) {
    

    return parseRow<Array>(array, []);
}