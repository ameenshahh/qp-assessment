import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { OrderItem } from "./OrderItem";

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

  @Column()
  stockUnit: string;

  @Column()
  price: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.groceryId)
  orderItem: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedDate: Date;
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
