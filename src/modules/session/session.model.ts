import { AbstractDocument } from 'src/database';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class SessionDocument extends AbstractDocument {
  static readonly collectionName = 'sessions';

  @Prop()
  user: string;

  @Prop()
  isValid: boolean;
}
