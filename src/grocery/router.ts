// library imports
import { Router, Request, Response } from "express";

// controller imports
import addGrocery from "./addGrocery";
import getAllGroceries from "./getAllGroceries";

// validator imports
import { addGroceryValidator } from "./validators/addGroceryValidator";

import filterRoles from "../middleware/filterRoles";
import { USER_ROLES } from "../shared/constants";
import authenticate from "../middleware/authenticate";

const router: Router = Router();

router.post(
  "/add",
  authenticate,
  filterRoles(USER_ROLES.ADMIN),
  addGroceryValidator,
  addGrocery
);

router.get(
  "/all",
  authenticate,
  filterRoles(USER_ROLES.ADMIN,USER_ROLES.USER),
  getAllGroceries
);
// router.post("/login", loginValidator, login);

export { router as groceryRouter };
