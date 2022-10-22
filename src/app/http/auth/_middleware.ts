import { Context } from "@prsm/server/http";
import { log, LogLevel } from "@prsm/server/shared";

export default [
  async (c: Context) => {
    log(
      { level: LogLevel.INFO, scope: "auth" },
      c.req.method,
      c.req.path,
      c.req.ip
    );
    c.next();
  },
];
