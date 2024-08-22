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
      console.log("🚀 ~ _args:", _args);
      const result = await userService.getAllUserWithPagination(_args.input);
      return result;
    },
    findUser: async (
      _parents: any,
      { id }: { id: string },
      _contextValue: AppContext,
      _info: GraphQLResolveInfo
    ) => {
      const result = userService.getUserById(Number(id));
      return result;
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
      _args: UserCreateDto,
      _contextValue: AppContext,
      _info: GraphQLResolveInfo
    ) => {
      const result = await userService.createUser(_args);
      return result;
    },
    editUser: async (
      _parents: any,
      _args: UserUpdateDto,
      _contextValue: AppContext,
      _info: GraphQLResolveInfo
    ) => {
      const result = await userService.editUser(_args);
      return result;
    },
    deleteUser: async (
      _parents: any,
      _args: string,
      _contextValue: AppContext,
      _info: GraphQLResolveInfo
    ) => {
      const result = await userService.deleteUser(Number(_args));
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
