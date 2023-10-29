import { SessionDocument } from './session.model';

export interface ISessionService {
  create(data: Partial<SessionDocument>): Promise<SessionDocument>;
}
