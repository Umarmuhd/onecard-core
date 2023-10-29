import { SessionDocument } from 'src/modules/session/session.model';
import { UserDocument } from 'src/modules/user/user.model';

export type JwtPayloadType = Pick<UserDocument, '_id'> & {
  sessionId: SessionDocument['_id'];
  iat: number;
  exp: number;
};
