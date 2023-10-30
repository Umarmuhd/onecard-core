import { Prop, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { AbstractDocument } from "src/database";
import { UserDocument } from "../user/user.model";
import { CardDocument } from "./card.model";

@Schema({ versionKey: false })
export class CardIssuesDocument extends AbstractDocument {
  static readonly collectionName = "card_issues";

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "user" })
  user: UserDocument["_id"];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "card" })
  card: CardDocument["_id"];
  @Prop()
  issuer: string;
  @Prop()
  activationDate: Date;
  @Prop({ default: null })
  deactivatedAt: Date | null;
}
