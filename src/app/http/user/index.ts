import { Context, Respond } from "@prsm/server/http";
import UserService from "#services/user";
import validateBearerJwt from "../../http_middlewares/validate-bearer-jwt";

export async function post(c: Context, { body: { email, password  }  }) {
  if (!email || !password) {
    return Respond.BadRequest(c, "not enough information");
  }

  const result = await UserService.createUser({ email, password });

  if (result.ok) {
    return Respond.OK(c, "created");
  }

  return Respond.InternalServerError(c, result.reason);
}

export async function get(c: Context) {
  const result = await UserService.getAll();

  if (result.ok) {
    return Respond.OK(c, result.users);
  }

  return Respond.InternalServerError(c, result.reason);
}

export const middleware = {
  "post": [
    validateBearerJwt
  ],
};
