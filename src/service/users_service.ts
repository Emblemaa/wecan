import "dotenv/config";
import * as mapper from "../mapper/users_mapper";
import * as repository from "../repository/users_repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { CreateUserReqest, LoginRequest } from "../routes/user_routes/request";
import { IncorrectLoginError, UserAlreadyExistsError } from "../errors";
import { UserDto, LoginDto } from "../dto";

export const create = async (payload: CreateUserReqest): Promise<UserDto> => {
  const _user = await repository.getByPhone(payload.phone);
  if (_user) {
    throw new UserAlreadyExistsError(payload.phone);
  }
  const user = await repository.create(payload);
  return mapper.toDto(user);
};

export const login = async (payload: LoginRequest): Promise<LoginDto> => {
  const user = await repository.getByPhone(payload.phone);
  if (!user) {
    throw new IncorrectLoginError();
  }
  const passwordMatched = await bcrypt.compare(payload.password, user.password);
  if (!passwordMatched) {
    throw new IncorrectLoginError();
  }
  const accessToken = jwt.sign(
    { id: user.id, username: user.phone, role: user.role },
    process.env.TOKEN_KEY!
  );
  return {
    accessToken: accessToken,
  };
};
