import prisma from "../../db/prisma";

const AddressResolver = {
  Query: {
    findAddresses: async () => {
      try {
        return await prisma.address.findMany({ include: { user: true } });
      } catch (error) {
        console.log("🚀 ~ findAddresses:async ~ error:", error);
      }
    },
    findAddress: async (_: any, __: any, { id }: { id: string }) => {
      try {
        return await prisma.address.findUnique({ where: { id: parseInt(id) } });
      } catch (error) {
        console.log("🚀 ~ findAddress:async ~ error:", error);
      }
    },
  },
  Mutation: {
    createAddress: async (_: any, __: any, { input }: any) => {
      try {
        return await prisma.address.create({ data: input });
      } catch (error) {
        console.log("🚀 ~ createAddress:async ~ error:", error);
      }
    },
    editAddress: async (_: any, { id, input }: any) => {
      try {
        return await prisma.address.update({
          where: { id: parseInt(id) },
          data: input,
        });
      } catch (error) {
        console.log("🚀 ~ editAddress:async ~ error:", error);
      }
    },
    deleteAddress: async (_: any, { id }: any) => {
      try {
        return await prisma.address.delete({ where: { id: parseInt(id) } });
      } catch (error) {
        console.log("🚀 ~ deleteAddress:async ~ error:", error);
      }
    },
  },
};

export default AddressResolver;
