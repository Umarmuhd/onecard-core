import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/database';
import { SessionDocument } from './session.model';

@Injectable()
export class SessionRepository extends AbstractRepository<SessionDocument> {
  protected readonly logger = new Logger(SessionRepository.name);

  constructor(
    @InjectModel(SessionDocument.collectionName)
    sessionModel: Model<SessionDocument>,
  ) {
    super(sessionModel);
  }
}
