import { Router } from "express";
import piusRouter from "./pius.routes";
import usersRouter from "./users.routes";

const routes = Router();

routes.use('/pius', piusRouter);
routes.use('/users', usersRouter);

export default routes;