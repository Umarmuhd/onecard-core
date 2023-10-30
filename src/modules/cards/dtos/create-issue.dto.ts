import { IsNotEmpty, MinLength } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateCardIssueDto {
  @ApiProperty({ example: "" })
  @MinLength(6)
  email: string;

  @ApiProperty({ example: "" })
  @MinLength(6)
  otp: string;

  @ApiProperty({ example: "" })
  @IsNotEmpty()
  last6Digit: string;

  @ApiProperty({ example: "" })
  @IsNotEmpty()
  cvv: string;

  @ApiProperty({ example: "" })
  @IsNotEmpty()
  pin: string;

  @IsNotEmpty()
  confirmPin?: string;
}
