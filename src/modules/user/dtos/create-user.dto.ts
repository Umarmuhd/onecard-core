import { Transform } from 'class-transformer';

import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '../user.model';

export class CreateUserDto {
  @ApiProperty({ example: 'ramez@gmail.com' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  email: string | null;

  @ApiProperty({ example: '123456' })
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Ramez' })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: 'Taher' })
  @IsNotEmpty()
  lastName: string | null;

  @ApiProperty({ example: '08123456789' })
  @IsNotEmpty()
  phoneNumber: string | null;

  phoneNumberVerified?: boolean;

  status: UserStatus;

  hash: string | null;
}
