import { Context, Respond } from "@prsm/server/http";

export async function post(c: Context) {
  return Respond.OK(c, "logged out");
}
