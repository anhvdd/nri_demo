import { GraphQLResolveInfo } from "graphql";
import { PubSub } from "graphql-subscriptions";
import { PaginationDto } from "../../common/dtos/pagination.dto";
import { UserCreateDto } from "../../modules/user/dto/create-user.dto";
import { UserUpdateDto } from "../../modules/user/dto/update-user.dto";
import userService from "../../modules/user/user.service";
import { AppContext } from "../../common/interfaces/AppContext";

const pubSub = new PubSub();
const UserResolver = {
  Query: {
    findUsers: async (
      _parents: any,
      _args: { input: PaginationDto },
      _contextValue: AppContext,
      _info: GraphQLResolveInfo
    ) => {
      const result = await userService.getAllUserWithPagination(_args.input);
      return {
        success: true,
        ...result,
      };
    },
    findUserWithCursor: async (
      _parents: any,
      _args: { input: PaginationDto },
      _contextValue: AppContext,
      _info: GraphQLResolveInfo
    ) => {
      const result = await userService.getAllWWithCursor(_args.input);
      return {
        success: true,
        ...result,
      };
    },
    findUser: async (
      _parents: any,
      _args: { id: string },
      _contextValue: AppContext,
      _info: GraphQLResolveInfo
    ) => {
      const result = await userService.getUserById(Number(_args.id));
      return {
        success: true,
        ...result,
      };
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
    createUser: async (
      _parents: any,
      _args: { input: UserCreateDto },
      _contextValue: AppContext,
      _info: GraphQLResolveInfo
    ) => {
      const result = await userService.createUser(_args.input);
      return {
        success: true,
        ...result,
      };
    },
    editUser: async (
      _parents: any,
      _args: { id: string; input: UserUpdateDto },
      _contextValue: AppContext,
      _info: GraphQLResolveInfo
    ) => {
      const result = await userService.editUser(Number(_args.id), _args.input);
      return {
        success: true,
        ...result,
      };
    },
    deleteUser: async (
      _parents: any,
      _args: { id: string },
      _contextValue: AppContext,
      _info: GraphQLResolveInfo
    ) => {
      await userService.deleteUser(Number(_args.id));
      return { success: true };
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
