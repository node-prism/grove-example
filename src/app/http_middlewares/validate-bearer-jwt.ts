import Jwt from "#services/jwt";
import useCache from "@prsm/server/cache";
import { Context, Respond } from "@prsm/server/http";

export default async function (c: Context, { bearer }: { bearer: string }) {
  if (!bearer) return Respond.BadRequest(c, "Expected bearer token.");

  const inputs = [c.req.ip, bearer];

  const outputs = useCache(
    (_ip: string, token: string | undefined) => Jwt.validateToken(token),
    inputs,
    "5m"
  );

  if (outputs.valid) {
    c.next();
    return;
  }

  return Respond.Unauthorized(c, { invalid: outputs.reason });
}
