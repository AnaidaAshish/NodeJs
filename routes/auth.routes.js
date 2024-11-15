import { Router } from "express";
import { Login, Register,getCurrentUser} from "../controllers/auth.controller.js";
const routes = Router();

routes.post("/login",Login)
routes.post("/register",Register)
routes.post("/get-current-user",getCurrentUser)

export default routes