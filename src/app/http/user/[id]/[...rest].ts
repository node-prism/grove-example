import { Context, Respond } from "@prsm/server/http";

export async function get(c: Context, { path: { id, rest } }) {
  return Respond.OK(c, { id, rest });
}
