import { PublicUser } from "#services/user";
import { Collection } from "@prsm/db";

const users = new Collection<PublicUser>(".data", "users", { integerIds: true });

export const db = {
  users,
};
