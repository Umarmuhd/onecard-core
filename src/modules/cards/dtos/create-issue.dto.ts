import { IsNotEmpty, MinLength } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateCardIssueDto {
  @ApiProperty({ example: "" })
  @MinLength(6)
  user: string;

  @ApiProperty({ example: "" })
  @IsNotEmpty()
  card: string;

  @ApiProperty({ example: "" })
  @IsNotEmpty()
  issuer: string;

  @ApiProperty({ example: "" })
  @IsNotEmpty()
  activationDate: Date;

  @IsNotEmpty()
  deactivatedAt?: Date;
}
