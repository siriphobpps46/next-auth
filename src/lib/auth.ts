import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const secret = new TextEncoder().encode("super-secret-key");

export async function createToken(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2h")
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as JWTPayload;
  } catch {
    return null;
  }
}
