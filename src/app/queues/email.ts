import Queue from "@prsm/grove/queues";

export interface MailQueueTask {
  recipient: string;
  subject: string;
  body: string;
}

export default async function({ recipient, subject, body }: MailQueueTask) {
  // This function is the task that the queue worker will run when it becomes available.
}

export const queue = new Queue<MailQueueTask>({
  concurrency: 3,
  delay: "10s",
  timeout: 0,
  groups: {
    concurrency: 1,
    delay: 0,
    expiration: 0,
  },
});
