import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Grocery } from "./entity/Grocery"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "question_pro_db",
    synchronize: true,
    logging: false,
    entities: [User,Grocery],
    migrations: [],
    subscribers: [],
})
