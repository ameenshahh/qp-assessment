import { Request, Response } from "express";
import Responder from "../shared/responder";
import checkExistingUser from "./lib/checkExistingUser";
import createUser from "./lib/createUser";
import hash from "./lib/hashPassword";
import { generateToken } from "./lib/jwt";

export default async (req: Request, res: Response) => {
  const responder = new Responder(res);

  let { email, password } = req.body;

  try {
    // Checking for existing user
    const existingUser = await checkExistingUser({ email });

    if (!existingUser) {
      return responder.error({
        message: "User doesn't exists",
      });
    }

    // checking password
    if (existingUser.password !== hash(password)) {
      return responder.unauthorized({
        message: "Wrong Password",
      });
    }

    // Generate Tokens
    let accessToken = generateToken({ id: existingUser.id });

    return responder.success({
      payload: {
        loginStatus: existingUser ? true : false,
        accessToken,
      },
    });
  } catch (error) {
    console.log(error);
    responder.error({
      message: error.message,
    });
  }
};
