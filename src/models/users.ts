import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import bcrypt from "bcrypt";

export enum UserRole {
  CEO,
  ADMIN,
  EMPLOYEE,
}

interface UserAttributes {
  id: number;
  phone: string;
  password: string;
  role: UserRole;
  org: string;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface UserInput extends Optional<UserAttributes, "id" | "phone"> {}

class Users extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public phone!: string;
  public password!: string;
  public role!: UserRole;
  public org!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date;
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    phone: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.INTEGER,
    },
    org: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    sequelize: sequelize,
    paranoid: true,
    hooks: {
      beforeCreate: (user, _) => {
        {
          user.password = bcrypt.hashSync(user.password, 10);
        }
      },
    },
  }
);

export default Users;
