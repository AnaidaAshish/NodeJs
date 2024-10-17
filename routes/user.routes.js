import { Router } from "express";
import { userDetails } from "../controllers/user.controller.js";

const routerForUser = Router();

routerForUser.post("/userDetails",userDetails);

export default routerForUser;