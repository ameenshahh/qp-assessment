// library imports
import { Router, Request, Response } from "express";

// controller imports
import signup from "./signup";
import login from "./login";

// validator imports
import { signupValidator } from "./validators/signupValidator";
import { loginValidator } from "./validators/loginValidator";

const router: Router = Router();

router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);


export { router as authRouter };
