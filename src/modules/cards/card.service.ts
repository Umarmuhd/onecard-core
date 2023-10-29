import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateCardDto } from "./dtos/create-card.dto";
import { CardRepository } from "./cards.repository";
import { CardDocument } from "./card.model";
import { ICardsService } from "./card";
import { CardStatus } from "./card.model";

@Injectable()
export class CardsService implements ICardsService {
  constructor(private readonly cardRepository: CardRepository) {}

  async createCard(createCardDto: CreateCardDto): Promise<CardDocument> {
    const existingCard = await this.cardRepository.findOne({
      pan: createCardDto.pan,
    });

    if (existingCard) {
      throw new HttpException("Card already exists", HttpStatus.CONFLICT);
    }

    const Card = await this.cardRepository.create({
      ...createCardDto,
      hash: null,
      status: CardStatus.Active,
      activatedDate: new Date(),
      isWebAllowed: false,
      isPOSAllowed: false,
      isATMAllowed: false,
      isContactlessAllowed: false,
      isCashlessAllowed: false,
      webTransactionLimit: 0,
      posTransactionLimit: 0,
      atmTransactionLimit: 0,
      contactlessTransactionLimit: 0,
      transactionPin: "",
      cardType: "",
      cardScheme: "",
      pan: "",
      cvV2: "",
      accountNumber: "",
      currencyCode: "",
      expiryDate: "",
    });
    return Card;
  }

  async getAllCards(): Promise<CardDocument[]> {
    const cards = await this.cardRepository.find();
    return cards;
  }
}
