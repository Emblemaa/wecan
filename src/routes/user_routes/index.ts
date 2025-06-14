import Express from "express";

import * as service from "../../service/users_service";

import { BaseError } from "../../errors/base";
import {
  bodyMustContain,
  userRoleValidator,
  validator,
} from "../../validators";
import { CreateUserReqest, LoginRequest } from "./request";
import { auth, isCEO } from "../../middleware";

const userRouter = Express.Router();

userRouter.post(
  "/",
  auth,
  isCEO,
  bodyMustContain("phone"),
  bodyMustContain("password"),
  bodyMustContain("role"),
  bodyMustContain("org"),
  userRoleValidator(),
  validator,
  async (req, res) => {
    const payload: CreateUserReqest = req.body;
    try {
      const result = await service.create(payload);
      return res.status(200).send(result);
    } catch (err) {
      console.log(err);
      if (err instanceof BaseError) {
        return res.status(err.code).json(err);
      }
      return res.status(500).json(err);
    }
  }
);

userRouter.post(
  "/login",
  bodyMustContain("phone"),
  bodyMustContain("password"),
  validator,
  async (req, res) => {
    const payload: LoginRequest = req.body;
    try {
      const result = await service.login(payload);
      return res.status(200).send(result);
    } catch (err) {
      console.log(err);
      if (err instanceof BaseError) {
        return res.status(err.code).json(err);
      }
      return res.status(500).json(err);
    }
  }
);

export default userRouter;
