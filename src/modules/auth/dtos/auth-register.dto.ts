import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AuthRegisterDto {
  @ApiProperty({ example: 'ramez@gmail.com' })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Ramez' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Taher' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '08123456789' })
  @IsNotEmpty()
  phoneNumber: string;
}
