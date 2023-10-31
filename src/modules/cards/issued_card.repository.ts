import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AbstractRepository } from "src/database";
import { IssuedCardDocument } from "./issued_card.model";

@Injectable()
export class IssuedCardRepository extends AbstractRepository<IssuedCardDocument> {
  protected readonly logger = new Logger(IssuedCardRepository.name);

  constructor(
    @InjectModel(IssuedCardDocument.collectionName)
    issuedCardModel: Model<IssuedCardDocument>,
  ) {
    super(issuedCardModel);
  }
}
