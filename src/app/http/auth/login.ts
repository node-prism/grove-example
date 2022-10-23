import { Context, Respond } from "@prsm/grove/http";
import UserService from "#services/user";

export async function post(c: Context, { body: { email, password } }) {
  const result = await UserService.authenticate(email, password);

  if (result.ok) {
    return Respond.OK(c, { token: result.token });
  }

  return Respond.Unauthorized(c, result.reason);
}
