import "reflect-metadata";

import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Grocery } from "./entity/Grocery";
import { Order } from "./entity/Order";
import { OrderItem } from "./entity/OrderItem";

const dbType: "mysql" | "postgres" | "sqlite" =
  (process.env.DB_TYPE as "mysql" | "postgres" | "sqlite") || "mysql";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "question_pro_db",
  // type: dbType,
  // host: process.env.DB_HOST,
  // port: parseInt(process.env.DB_PORT),
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Grocery, Order, OrderItem],
  migrations: [],
  subscribers: [],
});
