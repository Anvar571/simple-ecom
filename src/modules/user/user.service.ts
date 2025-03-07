import { UserCreateDto, UserFindParam, UserResponse, UserUpdateDto } from "./user.types";
import { User } from "./user";
import { IUserRepository } from "./user.repository";

export interface UserService {
    createUser(user: UserCreateDto): Promise<UserResponse>;
    updateUser(user: UserUpdateDto): Promise<UserResponse>;
    findByParam(param: Partial<UserFindParam>): Promise<User | null>;
}

export class UserServiceImpl implements UserService {
    constructor(private readonly userRepository: IUserRepository) {}

    async createUser(user: UserCreateDto): Promise<UserResponse> {
        const newUser = new User({
            ...user,
            password: user.password,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await this.userRepository.create(newUser);

        return this.excludeFields(newUser, ['password']);
    }

    async updateUser(user: UserUpdateDto): Promise<UserResponse> {
        return {} as UserResponse;
    }

    async findByParam(param: Partial<UserFindParam>): Promise<User | null> {
        return this.userRepository.findByParam(param);
    }

    private excludeFields<T extends object, K extends keyof T>(user: T, exclude: K[]): T {
        return Object.keys(user)
            .filter((key) => !exclude.includes(key as K))
            .reduce((acc, key) => {
                acc[key as keyof T] = user[key as keyof T];
                return acc;
            }, {} as T);
    }
    
}
