import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from "typeorm";

import { Order } from "./Order";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: null,
  })
  name: string;

  @Column({
    default: null,
  })
  email: string;

  @Column({
    default: null,
  })
  password: string;

  @Column({
    default: null,
  })
  role: string;

  @OneToMany((type) => Order, (order) => order.user)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedDate: Date;
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
