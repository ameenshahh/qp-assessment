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

    const groceryRepository = AppDataSource.getRepository(Grocery);

    return await groceryRepository.save(grocery);
  } catch (error) {
    throw error;
  }
};
