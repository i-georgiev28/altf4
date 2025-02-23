import * as z from "zod";
import {
  emailValidation,
  passwordValidation,
  usernameValidation,
} from "./field-validations";
import { idValidation } from "../../utils";

export const userIndexRequestSchema = z.strictObject({
  query: z.strictObject({}).optional(),
});

export const userShowRequestSchema = z.strictObject({
  params: z.strictObject({
    id: idValidation,
  }),
});

export const userUpdateRequestSchema = z.strictObject({
  params: z.strictObject({
    id: idValidation,
  }),
  body: z.strictObject({
    username: usernameValidation.optional(),
    email: emailValidation.optional(),
    password: passwordValidation.optional(),
  }),
});

export const userDestroyRequestSchema = userShowRequestSchema;

export type UserUpdatePayload = z.infer<typeof userUpdateRequestSchema>["body"];
