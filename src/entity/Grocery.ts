import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  DeleteDateColumn,
} from "typeorm";
import { Order } from "./Order";

@Entity()
export class Grocery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item: string;

  @Column()
  category: string;

  @Column()
  stocks: number;

  @ManyToMany((type) => Order, (order) => order.items)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedDate: Date;
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
