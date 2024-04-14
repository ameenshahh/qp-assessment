import { Request, Response } from "express";
import Responder from "../shared/responder";
import getAllGroceries from "./lib/getAllGroceries";

export default async (req: Request, res: Response) => {
  const responder = new Responder(res);

  try {
    // adding grocery
    const allGroceries = await getAllGroceries();
    if (allGroceries) {
      return responder.success({
        message: "Grocery fetched successfully",
        payload: allGroceries,
      });
    }
  } catch (error) {
    console.log(error);
    responder.error({
      message: error.message,
    });
  }
};
