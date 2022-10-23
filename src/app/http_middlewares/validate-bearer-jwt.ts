import Jwt from "#services/jwt";
import useCache from "@prsm/grove/cache";
import { Context, Respond } from "@prsm/grove/http";

export default async function (c: Context, { bearer }: { bearer: string }) {
  if (!bearer) return Respond.BadRequest(c, "Expected bearer token.");

  const inputs = [c.req.ip, bearer];

  const outputs = useCache(
    // If the inputs aren't found in cache, run this function and store the result.
    (_ip: string, token: string | undefined) => Jwt.validateToken(token),
  
    // These inputs are stringified by useCache and serve as the cache key for memoization.
    inputs,

    // After 5m, the cache will be invalidated and the function will be re-run.
    "5m"
  );

  if (outputs.valid) {
    c.next();
    return;
  }

  return Respond.Unauthorized(c, { invalid: outputs.reason });
}
