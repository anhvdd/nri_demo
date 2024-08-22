import { PaginationDto } from "../../common/dtos/pagination.dto";
import prisma from "../../config/db/prisma";
import { CreateAddressDto } from "./dto/create-address.dto";
import { AddressUpdateDto } from "./dto/update-address.dto";

const getAllAddressesWithPagination = async (query: PaginationDto) => {
  try {
    let order;
    if (query.sortBy && query.sortOrder) {
      order = { [query.sortBy]: query.sortOrder };
    }
    const result = await prisma.address.findMany({
      take: query.limit,
      skip: query.offset,
      orderBy: [{ ...order }],
      relationLoadStrategy: "join",
      select: { id: true, addressDescription: true },
    });
    return result;
  } catch (error) {
    console.log("🚀 ~ getAllAddressesWithPagination ~ error:", error);
  }
};

const getAddressById = async (id: number) => {
  try {
    return await prisma.address.findUnique({
      relationLoadStrategy: "join",
      where: { id },
    });
  } catch (error) {
    console.log("🚀 ~ getAddressById ~ error:", error);
  }
};

const createAddress = async (input: CreateAddressDto) => {
  try {
    const result = await prisma.address
      .create({ data: input })
      .then((result: any) => {
        const newAddedUser = { ...result };
        return newAddedUser;
      });
    return result;
  } catch (error) {
    console.log("🚀 ~ createAddress ~ error:", error);
  }
};

const editAddress = async (input: AddressUpdateDto) => {
  try {
    return await prisma.user.update({
      where: { id: input.id },
      data: input,
    });
  } catch (error) {
    console.log("🚀 ~ editAddress ~ error:", error);
  }
};

const deleteAddress = async (id: number) => {
  try {
    return await prisma.address.delete({ where: { id } });
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
