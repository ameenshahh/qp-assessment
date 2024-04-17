import { body, check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

const validator = [
  body("item")
    .notEmpty()
    .withMessage("item field is required")
    .isString()
    .withMessage("item field must be a string"),

  body().isArray().withMessage("Items must be an array"),

  // Check each item in the array
  body("*.groceryId")
    .notEmpty()
    .withMessage("Grocery ID is required")
    .isInt()
    .withMessage("Grocery ID must be an integer"),
  body("*.quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt()
    .withMessage("Quantity must be an integer"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { validator as createOrderValidator };
