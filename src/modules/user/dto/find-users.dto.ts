import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsPhoneNumber, IsEmail } from "class-validator";

export class UserFilterDto {
  @ApiPropertyOptional({ description: "User fullname", example: "John Doe" })
  @IsOptional()
  @IsString()
  fullname?: string;

  @ApiPropertyOptional({ description: "User email address", example: "john.doe@example.com" })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: "User phone number", example: "+998901234567" })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}
