import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { User } from "./entity/User";
import { authRouter } from "./auth/router";
import "dotenv/config";
import { groceryRouter } from "./grocery/router";
import createAdmin from "./auth/lib/createAdmin";

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    app.get("/", (req: Request, res: Response) => {
      res.send("Hello, World!");
    });

    app.use("/auth", authRouter);
    app.use("/grocery", groceryRouter);

    // register express routes from defined application routes
    // Routes.forEach((route) => {
    //   (app as any)[route.method](
    //     route.route,
    //     (req: Request, res: Response, next: Function) => {
    //       const result = new (route.controller as any)()[route.action](
    //         req,
    //         res,
    //         next
    //       );
    //       if (result instanceof Promise) {
    //         result.then((result) =>
    //           result !== null && result !== undefined
    //             ? res.send(result)
    //             : undefined
    //         );
    //       } else if (result !== null && result !== undefined) {
    //         res.json(result);
    //       }
    //     }
    //   );
    // });

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    // insert new users for test
    // await AppDataSource.manager.save(
    //   AppDataSource.manager.create(User, {
    //     name: "Timber",
    //   })
    // );

    // await AppDataSource.manager.save(
    //   AppDataSource.manager.create(User, {
    //     name: "Phantom",
    //   })
    // );

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/users to see results"
    );
    createAdmin();
  })
  .catch((error) => console.log(error));
