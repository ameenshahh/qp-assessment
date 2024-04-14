import { Request, Response } from "express";
import Responder from "../shared/responder";
import addGrocery from "./lib/addGrocery";

export default async (req: Request, res: Response) => {
  const responder = new Responder(res);

  let { item, category, stocks, unit, price } = req.body;

  let params = {
    item,
    category,
    stocks,
    stockUnit: unit,
    price,
  };

  try {
    // adding grocery
    const addedGrocery = await addGrocery(params);
    if (addedGrocery) {
      return responder.success({
        message: "Grocery added successfully",
        payload: addedGrocery,
      });
    }
  } catch (error) {
    console.log(error);
    responder.error({
      message: error.message,
    });
  }
};
