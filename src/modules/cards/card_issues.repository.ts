import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AbstractRepository } from "src/database";
import { CardIssuesDocument } from "./card_issues.model";

@Injectable()
export class CardIssuesRepository extends AbstractRepository<CardIssuesDocument> {
  protected readonly logger = new Logger(CardIssuesRepository.name);

  constructor(
    @InjectModel(CardIssuesDocument.collectionName)
    cardIssuesModel: Model<CardIssuesDocument>,
  ) {
    super(cardIssuesModel);
  }
}
