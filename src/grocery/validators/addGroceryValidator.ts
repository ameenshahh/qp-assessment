import { body, check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

const validator = [
  body("item")
    .notEmpty()
    .withMessage("item field is required")
    .isString()
    .withMessage("item field must be a string"),

  body("category")
    .notEmpty()
    .withMessage("category field is required")
    .isString()
    .withMessage("category field must be a string"),

  body("stocks")
    .notEmpty()
    .withMessage("Stocks field is required")
    .isInt()
    .withMessage("Stocks field must be a number"),

  body("unit")
    .notEmpty()
    .withMessage("unit field is required")
    .isString()
    .withMessage("unit field must be a string"),

  body("price")
    .notEmpty()
    .withMessage("price field is required")
    .isInt()
    .withMessage("price field must be an integer"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { validator as addGroceryValidator };
