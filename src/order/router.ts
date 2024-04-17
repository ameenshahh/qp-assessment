// library imports
import { Router, Request, Response } from "express";

// controller imports
import createOrder from "./createOrder";


// validator imports
import { createOrderValidator } from "./validators/createOrderValidator";

import filterRoles from "../middleware/filterRoles";
import { USER_ROLES } from "../shared/constants";
import authenticate from "../middleware/authenticate";

const router: Router = Router();

router.post(
  "/create",
  authenticate,
  filterRoles(USER_ROLES.USER,USER_ROLES.ADMIN),
//   createOrderValidator,
createOrder
);

export { router as orderRouter };
