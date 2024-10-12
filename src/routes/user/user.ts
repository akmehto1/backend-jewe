import { Router } from "express";
import { Request, Response } from "express";
import { buyPlan, checkPlan, Commission, getUserDetails, userJustOneLevelDown } from "../../controllers/user.controller";
import { deserialization } from "../../middlware/deserialization";
import User from "../../models/user/user.model";



const UserRouter: Router = Router();

//http://localhost:3000/auth/log-in
UserRouter.get("/user-details",deserialization,getUserDetails);
UserRouter.get("/check-plan",deserialization,checkPlan);
UserRouter.post("/buy-plan",deserialization,buyPlan);
UserRouter.get('/commision',deserialization,Commission);


UserRouter.get('/user-just-one-level-down',deserialization,userJustOneLevelDown);





// UserRouter.get('/getAllUserData',isAdmin,getAllUserData);





export default UserRouter;
