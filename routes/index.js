import express from "express";
import { getUser, loginUser, registerUser } from "../controller/index.js";
import {
  userLoginValidate,
  userRegisterValidate,
} from "../utils/userValidation.js";
import { ensureAuthenticated } from "../utils/auth.js";

export const AuthRouter = express.Router();

AuthRouter.route("/register").post(userRegisterValidate, registerUser);

AuthRouter.route("/login").post(userLoginValidate, loginUser);

AuthRouter.route("/user").get(ensureAuthenticated, getUser);

export default AuthRouter;
