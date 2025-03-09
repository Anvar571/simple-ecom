export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export interface UserModel {
  id?: number | string | any;
  fullname: string;
  password: string;
  phone: string;
  email: string;
  role: Role;
  updatedAt: Date;
  createdAt: Date;
}

export type UserCreateDto = Omit<UserModel, 'id' | 'createdAt' | 'updatedAt'>;

export type UserUpdateDto = Required<
  Pick<UserModel, 'id' | 'fullname' | 'phone' | 'email' | 'password'>
>;

export type UserResponse = Omit<UserModel, 'password'>;

export type UserFindParam = Pick<
  UserModel,
  'id' | 'fullname' | 'phone' | 'email'
>;

export type FindAllUsersType = {};
