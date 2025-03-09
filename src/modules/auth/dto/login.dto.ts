import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ default: 'lorem@gmail.com' })
  email: string;

  @ApiProperty()
  password: string;
}
