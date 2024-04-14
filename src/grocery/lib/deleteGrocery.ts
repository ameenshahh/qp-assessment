import { AppDataSource } from "../../data-source";
import { Grocery } from "../../entity/Grocery";

export default async ({ id }): Promise<Grocery> => {
  try {

    const groceryRepository = AppDataSource.getRepository(Grocery);

    const groceryToRemove = await groceryRepository.findOneBy({
      id,
    });

    return await groceryRepository.softRemove(groceryToRemove);
  } catch (error) {
    throw error;
  }
};
