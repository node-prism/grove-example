import { Schedule } from "@prsm/server/schedules";

export default async function() {
  // generate important metrics and deliver them to important people
}

export const config: Schedule = {
  cron: "0 0 12 * *",
  // cron: "* * * * * *",
  scheduled: true,
  timezone: "America/Los_Angeles",
}
