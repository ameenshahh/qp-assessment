import * as jwt from "jsonwebtoken";

interface Payload {
  [key: string]: any;
}

interface DecodedToken {
  [key: string]: any;
}

export const generateToken = (payload: Payload, expiry: string = "7d"): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: expiry });
};

export const verifyToken = (token: string): DecodedToken => {
  return jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
};
