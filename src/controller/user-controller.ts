import { Request, Response } from "express";
import userService from "../services/user-service";

export const create = async (request: Request, response: Response) => {
  const { name, surname, age, job, haveChildren } = request.body;
  const result = await userService.create({
    name,
    surname,
    age,
    job,
    haveChildren,
  });
  return response.json(result);
};
export const read = async (request: Request, response: Response) => {
  const result = await userService.read();
  return response.json(result);
};

export const update = async (request: Request, response: Response) => {
  const { id } = request.params;
  const { name, surname, age, job, haveChildren } = request.body;
  const result = await userService.update(
    {
      name,
      surname,
      age,
      job,
      haveChildren,
    },
    id
  );
  return response.json(result);
};
export const remove = async (request: Request, response: Response) => {
  const { id } = request.params;
  const result = await userService.remove(id);
  return response.json(result);
};

const userController = {
  create,
  read,
  update,
  remove,
};

export default userController;
