import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from "typeorm"
import { Order } from "./Order"

@Entity()
export class Grocery {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    item: string

    @Column()
    category: string

    @Column()
    stocks: number

    @ManyToMany(type => Order, order => order.items)
    orders: Order[];

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @UpdateDateColumn({
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
    })
    updatedAt: Date;
}
