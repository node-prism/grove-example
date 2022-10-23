import { Context } from "@prsm/grove/http";
import { log, LogLevel } from "@prsm/grove/shared";
import throttle from "@prsm/grove/throttle";

export default [
  async (c: Context) => {
    log({ level: LogLevel.INFO }, c.req.method, c.req.path, c.req.ip);
    c.next();
  },
  async (c: Context) =>
    throttle(c, { byIp: true, byPath: true, ipRate: 20, pathRate: 5 }),
];
