import { PubSub } from "graphql-subscriptions";
import prisma from "../../db/prisma";
import { AppContext } from "../../interface/AppContext";

const pubSub = new PubSub();
const UserResolver = {
  Query: {
    findUsers: async (
      _parents: any,
      _args: any,
      _contextValue: AppContext,
      _info: any
    ) => {
      try {
        // const result = await prisma.$queryRaw`SELECT * FROM "User"`;
        const result = await prisma.user.findMany(
          // {
          // take: 2,
          // skip: 0,}
          // { include: { address: true } }
          {
            relationLoadStrategy: "join",
            select: { password: false, address: true },
          }
        );
        console.log("🚀 ~ result:", result);
        return result;
      } catch (error) {
        console.log("🚀 ~ findUsers:async ~ error:", error);
      }
    },
    findUser: async (_: any, { id }: { id: string }) => {
      try {
        return await prisma.user.findUnique({
          relationLoadStrategy: "join",
          include: { address: true },
          where: { id: parseInt(id) },
        });
      } catch (error) {
        console.log("🚀 ~ findUser:async ~ error:", error);
      }
    },
  },
  // User: {
  //   address: async (parents: any, _args: any) => {
  //     try {
  //       // const rs = await prisma.address.findUnique({
  //       //   where: { id: parseInt(args.id) },
  //       // });
  //       // console.log("🚀 ~ address: ~ rs:", rs);
  //       if (!parents.addressId) {
  //         return null;
  //       }
  //       return await prisma.address.findUnique({
  //         where: { id: parseInt(parents.addressId) },
  //       });
  //     } catch (error) {
  //       console.log("🚀 ~ findAddress:async ~ error:", error);
  //     }
  //   },
  // },
  Mutation: {
    createUser: async (_: any, { input }: any) => {
      try {
        const result = await prisma.user
          .create({ data: input })
          .then((result: any) => {
            const newAddedUser = { ...result };

            pubSub.publish("NEW_USER", { newAddedUser });

            return newAddedUser;
          });
        return result;
      } catch (error) {
        console.log("🚀 ~ createUser:async ~ error:", error);
      }
    },
    editUser: async (_: any, { id, input }: any) => {
      try {
        return await prisma.user.update({
          where: { id: parseInt(id) },
          data: input,
        });
      } catch (error) {
        console.log("🚀 ~ editUser:async ~ error:", error);
      }
    },
    deleteUser: async (_: any, { id }: any) => {
      try {
        return await prisma.user.delete({ where: { id: parseInt(id) } });
      } catch (error) {
        console.log("🚀 ~ deleteUser:async ~ error:", error);
      }
    },
  },
  Subscription: {
    newUser: {
      resolve: (payload: any) => {
        return payload.newAddedUser;
      },
      subscribe: () => {
        return pubSub.asyncIterator("NEW_USER");
      },
    },

    // editUser: {
    //   resolve: (payload) => {
    //     return payload.editedUser;
    //   },
    //   subscribe: () => {
    //     return pubSub.asyncIterator("EDIT_USER");
    //   },
    // },

    // deleteUser: {
    //   resolve: (payload) => {
    //     return payload.deletedUser;
    //   },
    //   subscribe: () => {
    //     return pubSub.asyncIterator("DELETE_USER");
    //   },
    // },
  },
};

export default UserResolver;
