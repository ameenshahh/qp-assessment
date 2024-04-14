import { Request, Response } from "express";
import Responder from "../shared/responder";
import updateGrocery from "./lib/updateGrocery";

export default async (req: Request, res: Response) => {
  const responder = new Responder(res);

  let { id } = req.params;

  let {...updateFields} = req.body


  try {
    // adding grocery
    const updatedGrocery = await updateGrocery({ id,updateFields });
    if (updatedGrocery) {
      return responder.success({
        message: "Grocery updated successfully",
        payload: updatedGrocery,
      });
    }
  } catch (error) {
    console.log(error);
    responder.error({
      message: error.message,
    });
  }
};
