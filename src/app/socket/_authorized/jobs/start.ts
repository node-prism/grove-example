import { Context } from "@prsm/server/ws";

// wscat -c ws://localhost:3002/ -x '{"command":"/jobs/start", "payload":{ "token": "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJlbWFpbCI6ImNocm9tYWduYUBwcm90b25tYWlsLmNvbSIsImlhdCI6MTY1MzYyMjEyNjM3MCwiZXhwIjoxNjUzNjIyMTI2MzkwfQ.hecr95eESwm5KeBNsfwEoVmNC9y581tMuYSn0pZjszE" }}'
export default async function (c: Context) {
  c.connection.send({
    command: "job:status",
    payload: { message: "Job finished." },
  });
  throw new Error("foo");

  return { ok: "job started" };
}

export const middleware = [
  (c: Context) => {
    console.log("start job middleware", c.connection.id);
  },
];
