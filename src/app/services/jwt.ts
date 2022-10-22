import { decode, encode, verify } from "@prsm/server/jwt";

class JwtService {
  createAccessToken({ ...rest }): string {
    const payload = {
      ...rest,
      iat: Date.now(),
      exp: Date.now() + 20
    };
    return encode(payload, process.env.JWT_SIGNATURE);
  }

  validateToken(token: string): { valid: boolean, reason?: string} {
    let result;
    try {
      result = verify(token, process.env.JWT_SIGNATURE, { exp: true });
    } catch (e) {
      return { valid: false, reason: `Failed to parse token: ${e.message}` };
    }

    if (!result.sig) return { valid: false, reason: "signature" };
    if (result.exp) return { valid: false, reason: "expired" };

    return { valid: true };
  }
}

export default new JwtService();
