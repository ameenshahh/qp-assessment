import { body, check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

const validator = [
  check("id")
    .notEmpty()
    .withMessage("id cannot be empty")
    .isInt()
    .withMessage("id must be an integer"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { validator as removeGroceryItemValidator };
