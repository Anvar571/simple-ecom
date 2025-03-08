import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { UserResponse, UserFindParam, FindAllUsersType } from './user.types';
import { UserFilterDto } from './dto/find-users.dto';

export interface IUserRepository {
  create: (user: UserEntity) => Promise<UserResponse>;
  findByParam: (param: Partial<UserFindParam>) => Promise<UserEntity | null>;
  findAllUsers: (param: Partial<FindAllUsersType>) => Promise<UserEntity[] | []>;
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create(user: UserEntity): Promise<UserResponse> {
    const newUser = this.userRepo.create(user);
    const savedUser = await this.userRepo.save(newUser);
    return this.mapToResponse(savedUser);
  }

  async findByParam(param: Partial<UserFindParam>): Promise<UserEntity | null> {
    if (param.email) {
        const userByEmail = await this.userRepo.findOne({ where: { email: param.email } });
        if (userByEmail) return userByEmail;
    }

    if (param.phone) {
        const userByPhone = await this.userRepo.findOne({ where: { phone: param.phone } });
        if (userByPhone) return userByPhone;
    }

    return null;
}

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: {email} });
  }

  async findAllUsers(filterDto: UserFilterDto) {
    const where: any = {};

    if (filterDto.fullname) {
      where.fullname = ILike(`%${filterDto.fullname}%`);
    }

    if (filterDto.email) {
      where.email = ILike(`%${filterDto.email}%`);
    }

    if (filterDto.phone) {
      where.phone = filterDto.phone;
    }

    return this.userRepo.find({ where });
  }

  private mapToResponse(user: UserEntity): UserResponse {
    return {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
