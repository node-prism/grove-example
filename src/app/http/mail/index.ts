import { Context, Respond } from "@prsm/server/http";
import { MailQueueTask, queue as mailQueue } from "../../queues/email";

const onNew = ({ task }) => console.log("Created:", task.uuid);
const onFailed = ({ task, error }) => console.log("Failed:", task.uuid, error);
const onComplete = ({ task }) => console.log("Completed:", task.uuid);

mailQueue.on("new", onNew);
mailQueue.on("failed", onFailed);
mailQueue.on("complete", onComplete);

export async function get(c: Context) {
  const mail: MailQueueTask = {
    recipient: "me@you.com",
    subject: "..",
    body: "..",
  };

  const uuid = mailQueue.group(mail.recipient).push(mail);
  return Respond.OK(c, { task: { uuid } });
}
