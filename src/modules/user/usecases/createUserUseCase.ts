import { ConflictException, Injectable } from "@nestjs/common";
import { UserRepository } from "../user.repository";

@Injectable()
export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    public async execute(param: any) {
        console.log(param, "param");
        
        const user = await this.userRepository.findByParam({ phone: param.phone });

        if (user) {
            throw new ConflictException("User already exists");
        }

        await this.userRepository.create(param);
    }
}
