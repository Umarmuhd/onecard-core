import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/database';
import { CardDocument } from './card.model';

@Injectable()
export class CardRepository extends AbstractRepository<CardDocument> {
  protected readonly logger = new Logger(CardRepository.name);

  constructor(
    @InjectModel(CardDocument.collectionName)
    cardModel: Model<CardDocument>,
  ) {
    super(cardModel);
  }
}
