import { Transform } from "class-transformer";

import { IsNotEmpty, MinLength } from "class-validator";

import { lowerCaseTransformer } from "src/utils/transformers/lower-case.transformer";

import { ApiProperty } from "@nestjs/swagger";
import { CardStatus } from "../card.model";

export class CreateCardDto {
  @ApiProperty({ example: "Nasirudeen Farhan" })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  nameOnCard: string | null;

  @ApiProperty({ example: "12/24" })
  @MinLength(6)
  expiryDate: string;

  @ApiProperty({ example: "VISA" })
  @IsNotEmpty()
  cardScheme: string;

  @ApiProperty({ example: "1234 5678 9012 3456" })
  @IsNotEmpty()
  pan: string;

  @ApiProperty({ example: "324" })
  @IsNotEmpty()
  cvV2: string;

  status: CardStatus;

  pin: string;
}
