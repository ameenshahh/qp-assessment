import { Request, Response } from "express";
import Responder from "../shared/responder";
import deleteGrocery from "./lib/deleteGrocery";

export default async (req: Request, res: Response) => {
  const responder = new Responder(res);

  let { id } = req.params;

  try {
    // adding grocery
    const deletedGrocery = await deleteGrocery({ id });
    if (deletedGrocery) {
      return responder.success({
        message: "Grocery removed successfully",
        payload: deletedGrocery,
      });
    }
  } catch (error) {
    console.log(error);
    responder.error({
      message: error.message,
    });
  }
};
