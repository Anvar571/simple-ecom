import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { UserCreateDto } from 'src/modules/user/user.types';

export class CreateUserDto implements UserCreateDto {
  @ApiProperty({ default: 'example@gmail.com' })
  @IsString()
  @IsEmail({ allow_underscores: true })
  readonly email: string;

  @ApiProperty({ default: '938334341' })
  @IsString()
  readonly phone: string;

  @ApiProperty({ default: 'password' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ default: 'fullname' })
  @IsString()
  @IsNotEmpty()
  readonly fullname: string;
}

export interface RegisterReturnType {
  refreshToken: string;
  accessToken: string;
}
