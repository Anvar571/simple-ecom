import { UseCase } from "src/modules/base/usecase";
import { FindAllUsersType } from "../user.types";
import { UserEntity } from "../entity/user.entity";
import { UserRepository } from "../user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindAllUserUseCase implements UseCase<FindAllUsersType, UserEntity[]> {
    constructor(private readonly userRepository: UserRepository) {}

    public async execute(param: FindAllUsersType) {
        return this.userRepository.findAllUsers(param);
    }
}