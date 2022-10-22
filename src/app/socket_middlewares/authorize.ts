import { Context } from "@prsm/server/ws";
import SocketAuthTracker from "../services/auth";

export default async function (c: Context) {
  if (SocketAuthTracker.isAuthenticated(c.connection)) {
    return;
  }

  throw new Error("Unauthorized");
}
