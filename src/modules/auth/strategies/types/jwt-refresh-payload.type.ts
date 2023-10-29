import { SessionDocument } from 'src/modules/session/session.model';

export type JwtRefreshPayloadType = {
  sessionId: SessionDocument['_id'];
  iat: number;
  exp: number;
};
