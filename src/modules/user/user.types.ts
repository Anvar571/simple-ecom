export interface UserModel {
    id?: number | string,
    name: string,
    password: string,
    phone: number,
    email: string,
    updatedAt: Date,
    createdAt: Date,
}

export type UserCreateDto = Omit<UserModel, 'id' | 'createdAt' | "updatedAt">;

export type UserUpdateDto = Required<Pick<UserModel, "id" | "name" | "phone" | "email" | "password">>;

export type UserResponse = Omit<UserModel, "password">;

export type UserFindParam = Pick<UserModel, 'id' | "name" | "phone" | "email">;