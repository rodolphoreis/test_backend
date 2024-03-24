import express from "express";
import cors from "cors";

import prismaCliente from "../prisma/prismaClient";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/api/user", async (_, response) => {
  const read = await prismaCliente.user.findMany();
  return response.json({ message: read });
});

app.post("/api/user", async (request, response) => {
  const { name, surname, age, job, haveChildren } = request.body;

  if (age < 18) {
    return "User cannot be created.";
  }

  const create = await prismaCliente.user.create({
    data: {
      name,
      surname,
      job,
      haveChildren,
    },
  });

  return response.status(201).json({ message: create, erro: false });
});

app.listen(PORT, () => {
  console.log("Server ok.");
});
