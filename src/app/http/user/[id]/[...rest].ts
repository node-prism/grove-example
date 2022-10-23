import { Context, Respond } from "@prsm/grove/http";

export async function get(c: Context, { path: { id, rest } }) {
  return Respond.OK(c, { id, rest });
}
