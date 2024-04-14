import { AppDataSource } from "../../data-source";
import { Grocery } from "../../entity/Grocery";

export default async ({
  item,
  category,
  stocks,
  stockUnit,
  price,
}): Promise<Grocery> => {
  try {
    const grocery = new Grocery();

    grocery.item = item;
    grocery.category = category;
    grocery.stocks = stocks;
    grocery.stockUnit = stockUnit;
    grocery.price = price;

    const userRepository = AppDataSource.getRepository(Grocery);

    return await userRepository.save(grocery);
  } catch (error) {
    throw error;
  }
};
