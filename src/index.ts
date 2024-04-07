import express from "express";
import cors from "cors";

import prismaCliente from "../prisma/prismaClient";
import userService from "./services/user-service";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/api/user", async (_, response) => {
  const result = await userService.read();
  return response.json(result);
});

app.post("/api/user", async (request, response) => {
  const { name, surname, age, job, haveChildren } = request.body;
  const result = await userService.create({
    name,
    surname,
    age,
    job,
    haveChildren,
  });
  return response.json(result);
});

app.put("/api/user/:id", async (request, response) => {
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
});

app.delete("/api/user/:id", async (request, response) => {
  const { id } = request.params;
  const result = await userService.remove(id);
  return response.json(result);
});

app.listen(PORT, () => {
  console.log("Server ok.");
});
