import { Context, Respond } from "@prsm/grove/http";

export async function post(c: Context) {
  return Respond.OK(c, "logged out");
}
