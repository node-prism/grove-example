import { Context, Respond } from "@prsm/grove/http";
import UserService from "#services/user";

export async function get(c: Context) {
  const { ok, users, reason } = await UserService.getAll();

  if (!ok) return Respond.BadRequest(c, { reason });

  return Respond.OK(c, users);
}
