import { Prop, Schema } from "@nestjs/mongoose";
import { AbstractDocument } from "src/database";

export enum CardStatus {
  Active = "active",
  Inactive = "inactive",
}

@Schema({ versionKey: false })
export class CardDocument extends AbstractDocument {
  static readonly collectionName = "cards";

  @Prop()
  nameOnCard: string;
  @Prop()
  accountNumber: string;
  @Prop()
  currencyCode: string;
  @Prop()
  expiryDate: string;

  @Prop()
  activatedDate: Date;

  @Prop()
  isWebAllowed: boolean;

  @Prop()
  isPOSAllowed: boolean;

  @Prop()
  isATMAllowed: boolean;

  @Prop()
  isContactlessAllowed: boolean;

  @Prop()
  isCashlessAllowed: boolean;

  @Prop()
  cardType: string;

  @Prop()
  cardScheme: string;

  @Prop()
  pan: string;

  @Prop()
  cvV2: string;

  @Prop()
  webTransactionLimit: number;

  @Prop()
  posTransactionLimit: number;

  @Prop()
  atmTransactionLimit: number;

  @Prop()
  contactlessTransactionLimit: number;

  @Prop()
  transactionPin: string;

  @Prop()
  status?: CardStatus;

  @Prop()
  hash: string;
}
