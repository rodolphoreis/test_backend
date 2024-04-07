import prismaCliente from "../../prisma/prismaClient";

type User = {
  name: string;
  surname: string;
  job: string;
  haveChildren: boolean;
  age: number;
};

export const create = async (user: User) => {
  if (user.age < 18) {
    return {
      message:
        "User cannot be created, because we only accept users with age above 18",
      error: true,
    };
  }
  try {
    const create = await prismaCliente.user.create({
      data: user,
    });

    return { message: create, erro: false };
  } catch (error) {
    return { message: error, erro: true };
  }
};
export const read = async () => {
  const read = await prismaCliente.user.findMany();
  return read;
};
export const update = async (user: User, id: string) => {
  try {
    const findUser = await prismaCliente.user.findUnique({
      where: { id },
    });
    if (!findUser) {
      return {
        message: "User not found!",
        error: true,
      };
    }

    const upDate = await prismaCliente.user.update({
      where: { id },
      data: user,
    });
    return { message: upDate, erro: false };
  } catch (error) {
    return { message: error, erro: true };
  }
};

export const remove = async (id: string) => {
  try {
    await prismaCliente.user.delete({
      where: { id },
    });
    return { message: "Foi deletado!", erro: false };
  } catch (error) {
    return { message: error, erro: true };
  }
};

const userService = {
  create,
  read,
  update,
  remove,
};

export default userService;