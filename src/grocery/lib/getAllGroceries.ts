import { AppDataSource } from "../../data-source";
import { Grocery } from "../../entity/Grocery";

export default async (): Promise<Grocery[]> => {
  try {
    const groceries = await AppDataSource.manager.find(Grocery);

    return groceries;
  } catch (error) {
    throw error;
  }
};

