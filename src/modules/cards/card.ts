import { CreateCardDto } from "./dtos/create-card.dto";
import { CardDocument } from "./card.model";
import { CreateCardIssueDto } from "./dtos/create-issue.dto";

export interface ICardsService {
  createCard(createCardDto: CreateCardDto): Promise<CardDocument>;
  getAllCards(): Promise<CardDocument[]>;
  createCardIssues(createCardIssuesDto: CreateCardIssueDto): Promise<void>;
}
