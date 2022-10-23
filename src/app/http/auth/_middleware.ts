import { Context } from "@prsm/grove/http";
import { log, LogLevel } from "@prsm/grove/shared";

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
