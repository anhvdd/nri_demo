import { GraphQLResolveInfo } from "graphql";
import { PaginationDto } from "../../common/dtos/pagination.dto";
import prisma from "../../config/db/prisma";
import addressService from "../../modules/address/address.service";
import { CreateAddressDto } from "../../modules/address/dto/create-address.dto";
import { AddressUpdateDto } from "../../modules/address/dto/update-address.dto";
import { AppContext } from "../../common/interfaces/AppContext";
const AddressResolver = {
  Query: {
    findAddresses: async (
      _parents: any,
      _args: PaginationDto,
      _contextValue: AppContext,
      _info: GraphQLResolveInfo
    ) => {
      const result = await addressService.getAllAddressesWithPagination(_args);
      return result;
    },
    findAddress: async (
      _parents: any,
      _args: string,
      _contextValue: AppContext,
      _info: GraphQLResolveInfo
    ) => {
      const result = await addressService.getAddressById(Number(_args));
      return result;
    },
  },
  Mutation: {
    createAddress: async (
      _parents: any,
      _args: CreateAddressDto,
      _contextValue: AppContext,
      _info: GraphQLResolveInfo
    ) => {
      const result = await addressService.createAddress(_args);
      return result;
    },
    editAddress: async (
      _parents: any,
      _args: AddressUpdateDto,
      _contextValue: AppContext,
      _info: GraphQLResolveInfo
    ) => {
      const result = await addressService.editAddress(_args);
      return result;
    },
    deleteAddress: async (
      _parents: any,
      _args: string,
      _contextValue: AppContext,
      _info: GraphQLResolveInfo
    ) => {
      const result = await addressService.deleteAddress(Number(_args));
    },
  },
};

export default AddressResolver;
