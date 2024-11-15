import { Router } from "express";
import authRoutes from "./auth.routes.js"
import routerForUser from "./user.routes.js";
import productRoutes from "./product.routes.js";

const routes = Router();

routes.use('/auth', authRoutes);
routes.use("/user",routerForUser);
routes.use("/product",productRoutes)
export default routes;