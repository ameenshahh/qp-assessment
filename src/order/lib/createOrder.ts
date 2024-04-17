import { In } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Grocery } from "../../entity/Grocery";
import { Order } from "../../entity/Order";
import { OrderItem } from "../../entity/OrderItem";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export default async ({ items, userId }) => {
    const queryRunner = AppDataSource.createQueryRunner();

  try {
    const groceryRepository = AppDataSource.getRepository(Grocery);
    const orderRepository = AppDataSource.getRepository(Order);
    const orderItemRepository = AppDataSource.getRepository(OrderItem);

    let groceryIds = items.map((item) => {
      return item.id;
    });

    // getting groceries for price data
    const groceries = await groceryRepository.find({
      where: {
        id: In(groceryIds),
      },
    });

    items.forEach((item) => {
      // checking if stocks is available
      const grocery = groceries.find((grocery) => {
        if (grocery.stocks < item.quantity) {
          throw new Error(
            `${item.quantity} stocks is not available for ${grocery.item}. Please update the quantity for ${grocery.item}`
          );
        }
        return grocery.id === item.id;
      });

      // calculating price
      if (grocery) {
        item.price = grocery.price * item.quantity;
      } else {
        item.price = 0;
      }
    });

    // calculating total amount
    const totalAmount = items.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price;
    }, 0);

    await queryRunner.startTransaction();

    // place order
    let order = await orderRepository.create({
      user: userId,
      totalAmount: totalAmount,
    });

    // updating the stock count
    for (const item of items) {
      await groceryRepository
        .createQueryBuilder()
        .update(Grocery)
        .set({
          stocks: () => `stocks - ${item.quantity}`,
        })
        .where("id = :id", { id: item.id })
        .execute();
    }

    let orderData = await orderRepository.save(order);
    let orderId = orderData.id;

    // adding ordered items list
    let orderItemsData = items.map((item) => {
      return {
        groceryId: item.id,
        orderId: orderId,
        numberOfItems: item.quantity,
      };
    });

    let orderItems = await orderItemRepository.insert(orderItemsData);
    
    await queryRunner.commitTransaction();
    return true
    

  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  }
};
