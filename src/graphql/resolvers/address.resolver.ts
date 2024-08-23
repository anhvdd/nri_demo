import { GraphQLResolveInfo } from "graphql";
import { PaginationDto } from "../../common/dtos/pagination.dto";
import { AppContext } from "../../common/interfaces/AppContext";
import addressService from "../../modules/address/address.service";
import { CreateAddressDto } from "../../modules/address/dto/create-address.dto";
import { AddressUpdateDto } from "../../modules/address/dto/update-address.dto";
const AddressResolver = {
  Query: {
    findAddresses: async (
      _parents: any,
      _args: { input: PaginationDto },
      _contextValue: AppContext,
      _info: GraphQLResolveInfo
    ) => {
      const result = await addressService.getAllAddressesWithPagination(
        _args.input
      );
      return {
        success: true,
        ...result,
      };
    },
    findAddress: async (
      _parents: any,
      _args: { id: string },
      _contextValue: AppContext,
      _info: GraphQLResolveInfo
    ) => {
      const result = await addressService.getAddressById(Number(_args.id));
      return {
        success: true,
        ...result,
      };
    },
  },
  Mutation: {
    createAddress: async (
      _parents: any,
      _args: { input: CreateAddressDto },
      _contextValue: AppContext,
      _info: GraphQLResolveInfo
    ) => {
      const result = await addressService.createAddress(_args.input);
      return {
        success: true,
        ...result,
      };
    },
    editAddress: async (
      _parents: any,
      _args: { id: string; input: AddressUpdateDto },
      _contextValue: AppContext,
      _info: GraphQLResolveInfo
    ) => {
      const result = await addressService.editAddress(
        Number(_args.id),
        _args.input
      );
      return {
        success: true,
        ...result,
      };
    },
    deleteAddress: async (
      _parents: any,
      _args: { id: string },
      _contextValue: AppContext,
      _info: GraphQLResolveInfo
    ) => {
      const result = await addressService.deleteAddress(Number(_args));
      return { success: true };
    },
  },
};

export default AddressResolver;
