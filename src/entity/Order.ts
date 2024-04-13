import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";
import { Grocery } from "./Grocery";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne((type) => User, (user) => user.id)
  user: User;

  @ManyToMany(type => Grocery, grocery => grocery.orders)
  @JoinTable()
  items: Grocery[];

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
