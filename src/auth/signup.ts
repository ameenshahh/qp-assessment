import { Request, Response } from "express";
import Responder from "../shared/responder";
import checkExistingUser from "./lib/checkExistingUser";
import createUser from "./lib/createUser";

export default async (req: Request, res: Response) => {
  const responder = new Responder(res);

  let { email, password } = req.body;

  try {
    // Checking for existing user
    const existingUser = await checkExistingUser({ email });

    if (existingUser) {
      responder.error({
        message: "User already exists",
      });
    }

    let createdUser = await createUser({ email, password });

    if (createUser) {
      responder.success({
        message: "Sign up successful",
        payload: createdUser,
      });
    }
  } catch (error) {
    responder.error({
      message: error.message,
    });
  }
};
