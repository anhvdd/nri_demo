import { Prisma } from "@prisma/client";
import { Direction, PaginationDto } from "../../common/dtos/pagination.dto";
import prisma from "../../config/db/prisma";
import { UserCreateDto } from "./dto/create-user.dto";
import { UserUpdateDto } from "./dto/update-user.dto";
import { GraphQLError } from "graphql";

const getAllUserWithPagination = async (query: PaginationDto) => {
  try {
    let order:
      | Prisma.UserOrderByWithRelationInput
      | Prisma.UserOrderByWithRelationInput[] = { id: "asc" };
    let filter: Prisma.UserWhereInput = {};
    if (query) {
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
    } else query = new PaginationDto();

    const skip = (query.page - 1) * query.limit;
    const total = await prisma.user.count();
    const result = await prisma.user.findMany({
      omit: { password: true },
      take: query.limit,
      skip,
      orderBy: order,
      where: filter,
      relationLoadStrategy: "join",
      include: { address: true },
    });
    return {
      items: result,
      page: query.page,
      limit: query.limit,
      total: total,
      totalPages: Math.ceil(total / query.limit),
    };
  } catch (error) {
    console.log("🚀 ~ getAllUserWithPagination ~ error:", error);
  }
};

const getAllWWithCursor = async (query: PaginationDto) => {
  try {
    let order:
      | Prisma.UserOrderByWithRelationInput
      | Prisma.UserOrderByWithRelationInput[] = { id: "asc" };
    let filter: Prisma.UserWhereInput = {};
    if (query) {
      if (query.sortBy && query.sortOrder) {
        order = { ...order, [query.sortBy]: query.sortOrder };
      }
      if (query.search) {
        filter = {
          OR: [
            { name: { search: query.search, mode: "insensitive" } },
            { email: { search: query.search, mode: "insensitive" } },
          ],
        };
      }
    } else query = new PaginationDto();
    const currentCursor = query.cursor;
    const direction = query.direction ? query.direction : Direction.AFTER;
    const skip = !currentCursor || Number(currentCursor) === 0 ? 0 : 1;
    const cursor = currentCursor ? { id: Number(currentCursor) } : undefined;

    const result = await prisma.user.findMany({
      take: direction === Direction.AFTER ? query.limit : -query.limit,
      skip,
      cursor,
      orderBy: order,
      where: filter,
    });

    const lastUserInResult = result[result.length - 1];
    const endCursor: number = lastUserInResult?.id ?? null;

    const firstUserInResult = result[0];
    const startCursor: number = firstUserInResult?.id ?? null;

    return {
      items: result,
      limit: query.limit,
      startCursor: startCursor,
      endCursor: endCursor,
    };
  } catch (error) {
    console.log("🚀 ~ getAllWWithCursor ~ error:", error);
  }
};

const getUserById = async (id: number) => {
  try {
    const result = await prisma.user.findUnique({
      relationLoadStrategy: "join",
      where: { id },
      select: { id: true, email: true, name: true, address: true },
    });
    return {
      item: result,
    };
  } catch (error) {
    console.log("🚀 ~ getUserById ~ error:", error);
  }
};

const createUser = async (input: UserCreateDto) => {
  try {
    const result = await prisma.user
      .create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
          address: { connect: { id: Number(input.addressId) } },
        },
      })
      .then((result: any) => {
        const newAddedUser = { ...result };
        return newAddedUser;
      });
    return { item: result };
  } catch (error) {
    console.log("🚀 ~ createUser ~ error:", error);
  }
};

const editUser = async (id: number, input: UserUpdateDto) => {
  try {
    const result = await prisma.user.update({
      where: { id },
      data: {
        name: input.name,
        email: input.email,
        password: input.password,
        address: { connect: { id: Number(input.addressId) } },
      },
    });
    return { item: result };
  } catch (error) {
    console.log("🚀 ~ editUser:async ~ error:", error);
  }
};

const deleteUser = async (id: number) => {
  try {
    await prisma.user.delete({ where: { id } });
  } catch (error) {
    console.log("🚀 ~ deleteUser:async ~ error:", error);
  }
};

// this uses for test transaction
const batchUpdate = async (ids: number[]) => {
  try {
    await prisma.$transaction(async (p) => {
      await p.user.updateMany({
        where: { id: { in: ids } },
        data: {
          name: "transaction test",
        },
      });
      throw new GraphQLError("test error");
    });
  } catch (error) {
    console.log("🚀 ~ batchUpdate ~ error:", error);
  }
};

export default {
  getAllUserWithPagination,
  getAllWWithCursor,
  getUserById,
  createUser,
  editUser,
  deleteUser,
  batchUpdate,
};
