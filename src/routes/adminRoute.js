import express from "express";
import { login, singup } from "../controllers/adminController.js";

const AdminRouter = express.Router();

AdminRouter.post("/signup", singup);
AdminRouter.post("/login", login);

export default AdminRouter;
