import { Transform } from 'class-transformer';

import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

import { ApiProperty } from '@nestjs/swagger';
import { CardStatus } from '../card.model';

export class CreateCardDto {
  @ApiProperty({ example: 'Nasirudeen Farhan Ahmad' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  nameOnCard: string | null;

  @ApiProperty({ example: '123456' })
  @MinLength(6)
  expiryDate: string;

  @ApiProperty({ example: 'Ramez' })
  @IsNotEmpty()
  cardScheme: string;

  @ApiProperty({ example: 'Taher' })
  @IsNotEmpty()
  pan: string;
  
  @ApiProperty({ example: '08123456789' })
  @IsNotEmpty()
  cvV2: string;

  status: CardStatus;
  hash: string | null;
}
