import { NextFunction, Request, Response } from "express";
import Responder from "../shared/responder";
import checkExistingUser from "../auth/lib/checkExistingUser";
import { verifyToken } from "../auth/lib/jwt";

export default async (req: Request, res: Response, next: NextFunction) => {
  const responder = new Responder(res);

  const headers = req.headers;
  const ACCESS_TOKEN_HEADER = "x-access-token";

  if (!headers[ACCESS_TOKEN_HEADER]) {
    return responder.unauthorized({ message: "No access token header" });
  }

  const accessToken = headers[ACCESS_TOKEN_HEADER];

  try {
    const decoded = verifyToken(accessToken);
    const user = await checkExistingUser(decoded.id);

    if (!user) return responder.unauthorized({ message: "No user exists" });

    req["user"] = user;
    next();
  } catch (e) {
    return responder.crash();
  }
};
