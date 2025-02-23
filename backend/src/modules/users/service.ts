import * as argon2 from "@node-rs/argon2";
import { parseUser, Users } from "../../database";
import { UserUpdatePayload } from "./request-schemas";
import { capitalize, formatSqliteDate, NotFoundException } from "../../utils";
import { UserDb, UserDbWithoutHashedPassword } from "./types";
import { UserRegistrationPayload } from "../auth/request-schemas";

export const returningUserFields = ["id", "username", "email"];

class UsersService {
  async index() {
    let query =
      Users().select<UserDbWithoutHashedPassword[]>(returningUserFields);

    const usersRaw: UserDbWithoutHashedPassword[] = await query;
    const users = usersRaw.map((userRaw) => parseUser(userRaw));

    return users;
  }

  async show(id: number) {
    const userRaw = await Users()
      .where({ id })
      .select<UserDbWithoutHashedPassword>(returningUserFields)
      .first();

    if (!userRaw) {
      throw new NotFoundException("User not found");
    }

    const user = parseUser(userRaw);

    return user;
  }

  async store(payloadRaw: UserRegistrationPayload, lang?: string) {
    const payload = await this.prepareUserPayload({ ...payloadRaw }, lang);

    const userRaw = (
      await Users()
        .insert(payload as UserDb)
        .returning<UserDbWithoutHashedPassword[]>(returningUserFields)
    )[0] as UserDbWithoutHashedPassword;
    const user = parseUser(userRaw);

    return user;
  }

  async update(id: number, payloadRaw: UserUpdatePayload, lang?: string) {
    const payload = await this.prepareUserPayload(payloadRaw, lang);

    await Users()
      .where({ id })
      .update({ ...payload });

    const updatedUserRaw = await Users()
      .where({ id })
      .select<UserDbWithoutHashedPassword>(returningUserFields)
      .first();

    if (!updatedUserRaw) {
      throw new NotFoundException("User not found");
    }

    const updatedUser = parseUser(updatedUserRaw);

    return updatedUser;
  }

  async destroy(id: number) {
    const deletedUsersCount = await Users().where({ id }).delete();

    return deletedUsersCount === 1;
  }

  private async prepareUserPayload(payloadRaw: UserUpdatePayload, lang = "en") {
    const email = (payloadRaw.email as string)?.toLocaleLowerCase(lang);

    const username = (payloadRaw.username as string)?.toLocaleLowerCase(lang);

    const password = payloadRaw.password;
    const hashedPassword = password ? await argon2.hash(password) : undefined;

    const userPayload = {
      username,
      email,
      hashedPassword,
    };

    Object.keys(userPayload).forEach((key) => {
      const _key = key as keyof typeof userPayload;
      if (userPayload[_key] == null) {
        delete userPayload[_key];
      }
    });

    return userPayload;
  }
}

const service = new UsersService();

export { service as UsersService };
