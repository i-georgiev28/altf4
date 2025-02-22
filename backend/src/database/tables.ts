import { db } from './instance';
import { UserDb } from '../modules/users';
import { RefreshTokenDb } from '../modules/auth';
import { ArrayDb } from '../modules/arrays';

const Users = () => db<UserDb>('users');
const RefreshTokens = () => db<RefreshTokenDb>('refreshTokens');
const Arrays = () => db<ArrayDb>('arrays');

export {
    Users,
    RefreshTokens,
    Arrays,
};
