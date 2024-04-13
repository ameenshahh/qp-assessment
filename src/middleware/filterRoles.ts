import { NextFunction, Request, Response } from "express";
import Responder from "../shared/responder";

export default (...roles) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const responder = new Responder(res);
    try {
      const role = req.user.role;
      if (!role)
        return responder.unauthorized({
          message: "No roles available for this user",
        });
      if (!roles.includes(role))
        return responder.unauthorized({ message: "Permission denied" });
      next();
    } catch (e) {
      console.log(e);
      return responder.crash();
    }
  };
};
