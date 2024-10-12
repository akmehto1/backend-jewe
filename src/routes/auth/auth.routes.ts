import { Router } from "express";
import { Request, Response } from "express";
import { logger } from "../../utlis/logger";

import {
  loginController,
  SignUpController,
} from "../../controllers/auth.controllers";



const AuthRouter: Router = Router();

//http://localhost:3000/auth/log-in
AuthRouter.post("/log-in", loginController);




//http://localhost:3000/auth/sign-up
AuthRouter.post("/sign-up", SignUpController);

//http://localhost:3000/auth/log=out
AuthRouter.post("/log-out", (req: Request, resp: Response) => {
  resp.send("logout route");
});

// Export the router
export default AuthRouter;
