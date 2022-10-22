import Queue from "@prsm/server/queues";

export interface MailQueueTask {
  recipient: string;
  subject: string;
  body: string;
}

export default async function({ recipient, subject, body }: MailQueueTask) {
  // send an email?
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
