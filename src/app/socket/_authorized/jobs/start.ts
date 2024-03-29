import { Context } from "@prsm/grove/ws";

// wscat -c ws://localhost:3002/ -x '{"command":"/jobs/start", "payload":{ "token": "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJlbWFpbCI6ImNocm9tYWduYUBwcm90b25tYWlsLmNvbSIsImlhdCI6MTY1MzYyMjEyNjM3MCwiZXhwIjoxNjUzNjIyMTI2MzkwfQ.hecr95eESwm5KeBNsfwEoVmNC9y581tMuYSn0pZjszE" }}'
export default async function (c: Context) {
  c.connection.send({
    command: "job:status",
    payload: { message: "Job finished." },
  });

  // To fail from a socket command, throw an error.
  // The error will be caught by the WebSocketTokenServer command handler and sent back to the client.
  // throw new Error("Oh, that's not good.");

  return { ok: "Job started." };
}

export const middleware = [
  (c: Context) => {
    console.log("start job middleware", c.connection.id);
  },
];
