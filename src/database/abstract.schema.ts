import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export abstract class AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  _createdAt: Date;

  @Prop({ type: Date })
  _updatedAt: Date;
}

export type AutoGeneratedField = '_id' | '_createdAt' | '_updatedAt';
