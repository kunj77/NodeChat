import { Application, Router } from "express";
import { register, login } from "./controllers/auth";

const setAuthRoutes = (app: Application) => {
  const router = Router();

  router.post("/register", register);
  router.post("/login", login);

  app.use("/auth", router);
};

export default setAuthRoutes;
