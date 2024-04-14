import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  DeleteDateColumn,
} from "typeorm";
import { User } from "./User";
import { Grocery } from "./Grocery";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.id)
  user: User;

  @ManyToMany((type) => Grocery, (grocery) => grocery.orders)
  @JoinTable()
  items: Grocery[];

  @Column()
  totalAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedDate: Date;
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
