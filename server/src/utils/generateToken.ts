import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string): any | null => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};

export const decodeToken = (token: string): any | null => {
  try {
    return jwt.decode(token);
  } catch {
    return null;
  }
};

export const refreshToken = (oldToken: string): string | null => {
  const payload = verifyToken(oldToken);

  if (!payload || typeof payload === "string") return null;

  // Remove iat and exp from payload before signing new token
  const { iat, exp, ...rest } = payload as JwtPayload;

  if (!rest.id) return null; // Ensure id exists

  return jwt.sign(rest, JWT_SECRET, { expiresIn: "1h" });
};

export const isTokenExpired = (token: string): boolean => {
  const payload = decodeToken(token) as JwtPayload | null;

  if (!payload || !payload.exp) return true;

  const now = Math.floor(Date.now() / 1000);

  return payload.exp < now;
};
