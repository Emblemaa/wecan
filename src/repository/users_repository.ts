import { Users } from "../models";
import { UserInput } from "../models/users";

export const create = async (payload: UserInput): Promise<Users> => {
  return Users.create(payload);
};

export const getById = async (id: number): Promise<Users | null> => {
  return Users.findByPk(id);
};

export const getByPhone = async (username: string): Promise<Users | null> => {
  const user = await Users.findOne({ where: { phone: username } });
  return user;
};
