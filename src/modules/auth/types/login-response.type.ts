import { FlatRecord } from 'mongoose';
import { UserDocument } from 'src/modules/user/user.model';

export type LoginResponseType = Readonly<{
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: FlatRecord<UserDocument>;
}>;
