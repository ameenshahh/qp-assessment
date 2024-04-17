import { Request, Response } from "express";
import Responder from "../shared/responder";
import createOrder from "./lib/createOrder";

export default async (req: Request, res: Response) => {
  const responder = new Responder(res);

  let { items } = req.body;

  let userId = req.user.id;

  let params = {
    items,
    userId
  }

  try {
    // creating order
    const createdOrder = await createOrder(params);
    if (createdOrder) {
      return responder.success({
        message: "Order added successfully",
        payload: createdOrder,
      });
    }
  } catch (error) {
    console.log(error);
    responder.error({
      message: error.message,
    });
  }
};
