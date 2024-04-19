import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { User } from "./entity/User";
import { authRouter } from "./auth/router";
import "dotenv/config";
import { groceryRouter } from "./grocery/router";
import { orderRouter } from "./order/router";
import createAdmin from "./auth/lib/createAdmin";
import "dotenv/config.js";
const app = express();

AppDataSource.initialize()
  .then(async () => {
    // create express app
    app.use(bodyParser.json());

    app.get("/", (req: Request, res: Response) => {
      res.send("Hello, World!");
    });

    app.use("/auth", authRouter);
    app.use("/grocery", groceryRouter);
    app.use("/order", orderRouter);

    // start express server
    app.listen(3000);

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/users to see results"
    );
    createAdmin();
  })
  .catch((error) => console.log(error));

  export default app
