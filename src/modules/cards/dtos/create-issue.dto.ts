import { IsNotEmpty, MinLength } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateCardIssueDto {
  @ApiProperty({ example: "" })
  @MinLength(6)
  email: string;

  @ApiProperty({ example: "" })
  @MinLength(5)
  otp: string;

  @ApiProperty({ example: "" })
  @IsNotEmpty()
  last6Digit: string;

  @ApiProperty({ example: "" })
  @IsNotEmpty()
  cvc: string;

  @ApiProperty({ example: "" })
  @IsNotEmpty()
  pin: string;
}
