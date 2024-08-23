import { Prisma } from "@prisma/client";
import { PaginationDto } from "../../common/dtos/pagination.dto";
import prisma from "../../config/db/prisma";
import { CreateAddressDto } from "./dto/create-address.dto";
import { AddressUpdateDto } from "./dto/update-address.dto";

const getAllAddressesWithPagination = async (query: PaginationDto) => {
  try {
    let order:
      | Prisma.AddressOrderByWithRelationInput
      | Prisma.AddressOrderByWithRelationInput[] = { id: "asc" };
    let filter: Prisma.AddressWhereInput = {};
    if (query) {
      if (query.sortBy && query.sortOrder) {
        order = { [query.sortBy]: query.sortOrder };
      }
      if (query.search) {
        filter = {
          addressDescription: { contains: query.search, mode: "insensitive" },
        };
      }
    } else query = new PaginationDto();

    const skip = (query.page - 1) * query.limit;
    const total = await prisma.address.count();
    const result = await prisma.address.findMany({
      take: query.limit,
      skip,
      orderBy: order,
      relationLoadStrategy: "join",
      select: { id: true, addressDescription: true, user: true },
    });
    return {
      items: result,
      pagination: {
        page: query.page,
        limit: query.limit,
        total: total,
        totalPages: Math.ceil(total / query.limit),
      },
    };
  } catch (error) {
    console.log("🚀 ~ getAllAddressesWithPagination ~ error:", error);
  }
};

const getAddressById = async (id: number) => {
  try {
    const result = await prisma.address.findUnique({
      relationLoadStrategy: "join",
      where: { id },
      select: { id: true, addressDescription: true, user: true },
    });
    return {
      item: result,
    };
  } catch (error) {
    console.log("🚀 ~ getAddressById ~ error:", error);
  }
};

const createAddress = async (input: CreateAddressDto) => {
  try {
    console.log("🚀 ~ createAddress ~ input:", input);

    const result = await prisma.address
      .create({ data: input })
      .then((result: any) => {
        const newAddedUser = { ...result };
        return newAddedUser;
      });
    console.log("🚀 ~ createAddress ~ result:", result);
    return { item: result };
  } catch (error) {
    console.log("🚀 ~ createAddress ~ error:", error);
  }
};

const editAddress = async (id: number, input: AddressUpdateDto) => {
  try {
    const result = await prisma.user.update({
      where: { id },
      data: input,
    });
    return { item: result };
  } catch (error) {
    console.log("🚀 ~ editAddress ~ error:", error);
  }
};

const deleteAddress = async (id: number) => {
  try {
    await prisma.address.delete({ where: { id } });
  } catch (error) {
    console.log("🚀 ~ deleteAddress ~ error:", error);
  }
};

export default {
  getAllAddressesWithPagination,
  getAddressById,
  createAddress,
  editAddress,
  deleteAddress,
};
