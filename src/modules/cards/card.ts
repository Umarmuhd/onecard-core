import { CreateCardDto } from "./dtos/create-card.dto";
import { CardDocument } from "./card.model";

export interface ICardsService {
  createCard(createCardDto: CreateCardDto): Promise<CardDocument>;
  findCards(): Promise<CardDocument[]>;
}
