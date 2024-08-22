import { Prisma } from "@prisma/client";
import { PaginationDto } from "../../common/dtos/pagination.dto";
import prisma from "../../config/db/prisma";
import { UserCreateDto } from "./dto/create-user.dto";
import { UserUpdateDto } from "./dto/update-user.dto";

const getAllUserWithPagination = async (query: PaginationDto) => {
  try {
    // const result = await prisma.$queryRaw`SELECT * FROM "User"`;
    let order = {};
    let filter: Prisma.UserWhereInput = {};
    if (query.sortBy && query.sortOrder) {
      order = { [query.sortBy]: query.sortOrder };
    }
    if (query.search) {
      filter = {
        OR: [
          { name: { contains: query.search, mode: "insensitive" } },
          { email: { contains: query.search, mode: "insensitive" } },
        ],
      };
    }
    const result = await prisma.user.findMany({
      take: query.limit,
      skip: query.offset,
      orderBy: [{ ...order }],
      where: filter,
      relationLoadStrategy: "join",
      select: { id: true, email: true, name: true, address: true },
    });
    return result;
  } catch (error) {
    console.log("🚀 ~ getAllUserWithPagination ~ error:", error);
  }
};

const getUserById = async (id: number) => {
  try {
    return await prisma.user.findUnique({
      relationLoadStrategy: "join",
      where: { id },
      select: { id: true, email: true, name: true, address: true },
    });
  } catch (error) {
    console.log("🚀 ~ getUserById ~ error:", error);
  }
};

const createUser = async (input: UserCreateDto) => {
  try {
    const result = await prisma.user
      .create({ data: input })
      .then((result: any) => {
        const newAddedUser = { ...result };
        return newAddedUser;
      });
    return result;
  } catch (error) {
    console.log("🚀 ~ createUser ~ error:", error);
  }
};

const editUser = async (input: UserUpdateDto) => {
  try {
    return await prisma.user.update({
      where: { id: input.id },
      data: input,
    });
  } catch (error) {
    console.log("🚀 ~ editUser:async ~ error:", error);
  }
};

const deleteUser = async (id: number) => {
  try {
    return await prisma.user.delete({ where: { id } });
  } catch (error) {
    console.log("🚀 ~ deleteUser:async ~ error:", error);
  }
};

export default {
  getAllUserWithPagination,
  getUserById,
  createUser,
  editUser,
  deleteUser,
};
