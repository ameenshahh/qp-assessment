// library imports
import { Router, Request, Response } from "express";

// controller imports
import addGrocery from "./addGrocery";
import getAllGroceries from "./getAllGroceries";
import deleteGrocery from "./deleteGrocery";
import updateGrocery from "./updateGrocery";

// validator imports
import { addGroceryValidator } from "./validators/addGroceryValidator";
import { removeGroceryItemValidator } from "./validators/removeGroceryItemValidator";
import { updateGroceryValidator } from "./validators/updateGroceryValidator";

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
  filterRoles(USER_ROLES.ADMIN, USER_ROLES.USER),
  getAllGroceries
);

router.delete(
  "/delete/:id",
  authenticate,
  filterRoles(USER_ROLES.ADMIN),
  removeGroceryItemValidator,
  deleteGrocery
);

router.patch(
  "/update/:id",
  authenticate,
  filterRoles(USER_ROLES.ADMIN),
  updateGroceryValidator,
  updateGrocery
);

export { router as groceryRouter };
