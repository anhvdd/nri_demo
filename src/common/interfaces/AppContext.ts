import { UserResponseDto } from "../modules/user/dto/user-response.dto";

export interface AppContext {
  token?: string;
  user: UserResponseDto;
}
