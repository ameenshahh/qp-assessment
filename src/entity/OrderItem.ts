import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Order } from "./Order";
import { Grocery } from "./Grocery";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn({ name: "orderId" }) 
  orderId: Order;

  @ManyToOne(() => Grocery, (grocery) => grocery.orderItem)
  groceryId: Grocery;

  @Column()
  numberOfItems: number;
}
