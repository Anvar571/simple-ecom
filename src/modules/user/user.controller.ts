import { Controller, Delete, Get, Patch, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { FindAllUserUseCase } from './usecases/findAllUsersUseCase';
import { UserFilterDto } from './dto/find-users.dto';
import { UserEntity } from './entity/user.entity';
import { Roles } from 'src/common/decorators/role';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly findAllUserUseCase: FindAllUserUseCase) {}

  @Get()
  @ApiOkResponse({ description: 'Find users', type: [UserEntity] })
  @Roles('admin')
  findAllUser(@Query() param: UserFilterDto) {
    return this.findAllUserUseCase.execute(param);
  }

  @Get(':id')
  findOne() {}

  @Patch(':id')
  updateUser() {}

  @Delete(':id')
  deleteUser() {}
}
