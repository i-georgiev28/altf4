export interface UserDb {
    id: number;
    username: string;
    email: string;
    hashedPassword: string;
}

export interface UserDbWithoutHashedPassword extends Omit<UserDb, 'hashedPassword'> {
}

export interface User extends UserDbWithoutHashedPassword {
}

export interface UserWithHashedPassword extends User {
    hashedPassword: string;
}

