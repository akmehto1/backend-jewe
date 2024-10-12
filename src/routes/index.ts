import { Application, Router } from "express";
import AuthRouter from "./auth/auth.routes";

import AdminRouter from "./admin/admin.routes";
import UserRouter from "./user/user";

const _routes: Array<[string, Router]> = [
  ['/user/auth', AuthRouter],
  ['/admin',AdminRouter],
  ['/user',UserRouter]
];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route;
    app.use(url, router);
  });
};
