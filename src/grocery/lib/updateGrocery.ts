import { AppDataSource } from "../../data-source";
import { Grocery } from "../../entity/Grocery";
import { UpdateResult } from "typeorm";

export default async ({ id, updateFields }): Promise<UpdateResult> => {
  try {
    const groceryRepository = AppDataSource.getRepository(Grocery);

    return await groceryRepository.update(id, updateFields);
  } catch (error) {
    throw error;
  }
};
