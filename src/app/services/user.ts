import { db } from "#db/index";
import JwtService from "#services/jwt";
import { hash } from "@prsm/grove/hash";

export type PublicUser = {
  id?: number;
  email: string;
  password?: string;
};

class UserService {
  constructor() {
    db.users.drop();
    db.users.insert({ email: "admin@admin.com", password: hash.encode("admin") });
  }

  async createUser({ ...rest }): Promise<{ ok: boolean; reason?: string }> {
    if (rest.password) {
      rest.password = hash.encode(rest.password);
    }

    const exists = db.users.find({ email: rest.email })[0];
    if (exists) return { ok: false, reason: "exists" };

    db.users.insert({ ...(rest as any) });

    return { ok: true };
  }

  async getUser(
    id: string
  ): Promise<{ ok: boolean; user?: PublicUser; reason?: string }> {
    if (!id) return { ok: false, reason: "empty" };

    const user = db.users.find({ _id: id })[0];
    if (!user) return { ok: false, reason: "no user found with that id" };

    delete user.password;

    return { ok: true, user };
  }

  async getAll(): Promise<{
    ok: boolean;
    users?: PublicUser[];
    reason?: string;
  }> {
    const users = db.users.find({});
    if (!users) return { ok: false, reason: "no users found" };

    return {
      ok: true,
      users: users.map((user) => ({ ...user, password: undefined })),
    };
  }

  async authenticate(
    email: string,
    password: string
  ): Promise<{ ok: boolean; token?: string; reason?: string }> {
    if (!email || !password) return { ok: false, reason: "empty" };

    const user = db.users.find({ email })[0];
    if (!user || !hash.verify(user.password, password)) {
      return { ok: false, reason: "invalid" };
    }

    const token = JwtService.createAccessToken({ email });

    return { ok: true, token };
  }
}

export default new UserService();
