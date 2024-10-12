import { Router } from "express";
import { Request, Response } from "express";
import { adminloginController, getAllUserData,getUserDetailsByIdController,recentJoinUser} from "../../controllers/admin.controllers";
import { isAdmin } from "../../middlware/isAdmin";



const AdminRouter: Router = Router();

//http://localhost:3000/auth/log-in
AdminRouter.post("/auth/log-in",adminloginController);
AdminRouter.get('/all-user-data',isAdmin,getAllUserData);
AdminRouter.get('/recent-join-user',isAdmin,recentJoinUser);
AdminRouter.get('/user/:id/details',isAdmin,getUserDetailsByIdController);


 



// //http://localhost:3000/auth/sign-up
// AdminRouter.post("/sign-up", SignUpController);

// //http://localhost:3000/auth/log=out
// AdminRouter.post("/log-out", (req: Request, resp: Response) => {
//   resp.send("logout route");
// });

// Export the router
export default AdminRouter;
