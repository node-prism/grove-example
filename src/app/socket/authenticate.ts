import SocketAuthTracker from "#services/auth";
import { Context } from "@prsm/server/ws";

// wscat -c ws://localhost:3002/ -x '{"command":"/authenticate", "payload":{ "token": "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJlbWFpbCI6ImNocm9tYWduYUBwcm90b25tYWlsLmNvbSIsImlhdCI6MTY1MzYyMjEyNjM3MCwiZXhwIjoxNjUzNjIyMTI2MzkwfQ.hecr95eESwm5KeBNsfwEoVmNC9y581tMuYSn0pZjszE" }}'
export default async function (c: Context) {
  if (c.payload.token) {
    SocketAuthTracker.addAuthenticatedConnection(c.connection);
    return { ok: "Authorized" };
  }

  throw new Error("Unauthorized");
}
