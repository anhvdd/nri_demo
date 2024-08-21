import { UserResponseDto } from "../models/dto/user-response.dto";

export interface AppContext {
  token?: string;
  user: UserResponseDto;
}
