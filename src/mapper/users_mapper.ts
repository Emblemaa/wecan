import { UserDto } from "../dto";
import Users from "../models/users";

export function toDto(user: Users): UserDto {
  return {
    id: user.id,
    username: user.phone,
  };
}
