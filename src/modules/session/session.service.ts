import { Injectable } from '@nestjs/common';
import { SessionRepository } from './session.repository';
import { SessionDocument } from './session.model';
import { ISessionService } from './session';

interface CreateSessionDto {
  user: string;
  isValid: boolean;
}

@Injectable()
export class SessionService implements ISessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async create(data: CreateSessionDto): Promise<SessionDocument> {
    return this.sessionRepository.create({ ...data });
  }
}
