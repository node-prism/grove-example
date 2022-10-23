import { Context, Respond } from "@prsm/grove/http";
import UserService from "#services/user";

export async function get(c: Context, { path: { id } }) {
  const { ok, user, reason } = await UserService.getUser(id);

  if (!ok) return Respond.BadRequest(c, { reason });

  return Respond.OK(c, user);
}
