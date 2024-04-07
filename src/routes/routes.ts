import { Request, Response, Router } from "express";
import userController from "../controller/user-controller";

const routes = Router();

routes.get("/", async (req: Request, res: Response) => {
  await userController.read(req, res);
});
routes.post("/", async (req: Request, res: Response) => {
  await userController.create(req, res);
});
routes.put("/:id", async (req: Request, res: Response) => {
  await userController.update(req, res);
});
routes.delete("/:id", async (req: Request, res: Response) => {
  await userController.remove(req, res);
});

export default routes;
