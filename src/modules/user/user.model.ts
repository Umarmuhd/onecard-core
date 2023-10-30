import { Prop, Schema } from "@nestjs/mongoose";
import { AbstractDocument } from "src/database";

export enum UserStatus {
  Active = "active",
  Inactive = "inactive",
}

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  static readonly collectionName = "users";

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  phoneNumberVerified?: boolean;

  @Prop()
  status?: UserStatus;

  @Prop()
  hash: string;
}
