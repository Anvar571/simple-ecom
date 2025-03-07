import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user";
import { UserResponse, UserUpdateDto, UserFindParam } from "./user.types";

export interface IUserRepository {
    create: (user: User) => Promise<UserResponse>;
    update: (user: UserUpdateDto) => Promise<UserResponse>;
    findByParam: (param: Partial<UserFindParam>) => Promise<User | null>;
}

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) {}

    async create(user: User): Promise<UserResponse> {
        const newUser = this.repository.create(user);
        const savedUser = await this.repository.save(newUser);
        return this.mapToResponse(savedUser);
    }
    
    async update(user: UserUpdateDto): Promise<UserResponse> {
        await this.repository.update(user.id, user);
        const updatedUser = await this.repository.findOne({ where: { id: user.id } });

        if (!updatedUser) {
            throw new NotFoundException("User not found");
        }

        return this.mapToResponse(updatedUser);
    }

    async findByParam(param: Partial<UserFindParam>): Promise<User | null> {
        return this.repository.findOne({ where: param });
    }

    private mapToResponse(user: User): UserResponse {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}
