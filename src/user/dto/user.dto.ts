// import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

import { IsBoolean, IsNotEmpty, IsString } from '@nestjs/class-validator';

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsBoolean()
  @IsNotEmpty()
  isEmailVerified: boolean;
}
