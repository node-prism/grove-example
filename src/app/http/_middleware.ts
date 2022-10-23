import { Context } from "@prsm/server/http";
import { log, LogLevel } from "@prsm/server/shared";
import throttle from "@prsm/server/throttle";

export default [
  async (c: Context) => {
    log({ level: LogLevel.INFO }, c.req.method, c.req.path, c.req.ip);
    c.next();
  },
  async (c: Context) =>
    throttle(c, { byIp: true, byPath: true, ipRate: 20, pathRate: 5 }),
];
