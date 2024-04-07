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
    return response
      .status(400)
      .json({
        message:
          "User cannot be created, because we only accept users with age above 18",
      });
  }
  try {
    const create = await prismaCliente.user.create({
      data: {
        name,
        surname,
        job,
        haveChildren,
        age,
      },
    });

    return response.status(201).json({ message: create, erro: false });
  } catch (error) {
    return response.status(500).json({ message: error, erro: true });
  }
});

app.put("/api/user/:id", async (request, response) => {
  const { id } = request.params;
  const { name, surname, age, job, haveChildren } = request.body;
  try {
    const findUser = await prismaCliente.user.findUnique({
      where: { id },
    });
    if (!findUser) {
      return response.status(404).json("User not found!");
    }

    const upDate = await prismaCliente.user.update({
      where: { id },
      data: {
        name,
        surname,
        job,
        haveChildren,
      },
    });
    return response.status(200).json({ message: upDate, erro: false });
  } catch (error) {
    return response.status(500).json({ message: error, erro: true });
  }
});

app.delete("/api/user/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const remove = await prismaCliente.user.delete({
      where: { id },
    });
    return response.status(200).json({ message: "Foi deletado!", erro: false });
  } catch (error) {
    return response.status(500).json({ message: error, erro: true });
  }
});

app.listen(PORT, () => {
  console.log("Server ok.");
});
