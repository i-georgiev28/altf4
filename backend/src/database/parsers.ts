import { RefreshToken, RefreshTokenDb } from '../modules/auth';
import { parseSqliteDate } from '../utils';
import { User, UserDb, UserDbWithoutHashedPassword } from '../modules/users';
import { Array, ArrayDb, SolarPanel } from '../modules/arrays';

// Utility type to infer all keys with Date-like values including null and undefined
type DateKey<T> = {
    [K in keyof T]: NonNullable<T[K]> extends Date ? K : never
}[keyof T];

type ExtractDateKeys<T> = DateKey<T>[];

// The parseRow function with inferred dateFields type
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

// Example usage with RefreshTokenDb and UserDb
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
    // const dateFields: DateKey<Array>[] = ['createdAt', 'updatedAt'];

    return parseRow<Array>(array, []);
}

export function parseSolarPanel(jsonString: string): SolarPanel {
    const parsedObject = JSON.parse(jsonString);

    // Validate and transform fields if needed
    return parseRow<SolarPanel>(parsedObject, []);
}