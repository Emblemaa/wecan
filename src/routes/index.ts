import Express from "express";
import userRouter from "./user_routes";
import imageRouter from "./image_routes";
import { auth, isAdmin } from "../middleware";

const appRouter = Express.Router();

appRouter.use("/users", userRouter);
appRouter.use("/images", auth, isAdmin, imageRouter);

appRouter.get("/health", (_, res) => {
  try {
    res.status(200).send("Wecan Backend okay");
  } catch (err) {
    res.status(500).send(err);
  }
});

export default appRouter;
