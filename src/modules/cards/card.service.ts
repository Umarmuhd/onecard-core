import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateCardDto } from "./dtos/create-card.dto";
import { CardRepository } from "./cards.repository";
import { CardDocument } from "./card.model";
import { ICardsService } from "./card";
import { CardStatus } from "./card.model";
import { CreateCardIssueDto } from "./dtos/create-issue.dto";
import { CardIssuesRepository } from "./card_issues.repository";
// import { UsersService } from "../user/user.service";
import mongoose from "mongoose";

@Injectable()
export class CardsService implements ICardsService {
  constructor(
    private readonly cardRepository: CardRepository,
    // private readonly userService: UsersService,
    private readonly cardIssuesRepository: CardIssuesRepository,
  ) {}

  async createCard(createCardDto: CreateCardDto): Promise<CardDocument> {
    const existingCard = await this.cardRepository.findOne({
      pan: createCardDto.pan,
    });

    if (existingCard) {
      throw new HttpException("Card already exists", HttpStatus.CONFLICT);
    }

    const Card = await this.cardRepository.create({
      ...createCardDto,
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
      cardType: "",
      cardScheme: "",
      pan: "",
      cvV2: "",
      accountNumber: "",
      currencyCode: "",
      expiryDate: "",
      nameOnCard: "",
      pin: "",
    });

    return Card;
  }

  async getAllCards(): Promise<CardDocument[]> {
    const cards = await this.cardRepository.find();
    return cards;
  }

  async createCardIssues(
    createCardIssuesDto: CreateCardIssueDto,
  ): Promise<void> {
    const card = await this.cardRepository.findOne({
      pan: { $regex: createCardIssuesDto.last6Digit + "$" },
    });
    if (!card) {
      throw new HttpException("Card not found", HttpStatus.NOT_FOUND);
    }

    if (card.cvV2 != createCardIssuesDto.cvc) {
      throw new HttpException("Invalid CVV", HttpStatus.BAD_REQUEST);
    }

    const issuer = "";

    // const user = await this.userService.findOneUser({});
    const user = "";

    const cardIssues = await this.cardIssuesRepository.create({
      ...createCardIssuesDto,
      activationDate: new Date(),
      card: card._id,
      deactivatedAt: null,
      issuer: issuer,
      user: new mongoose.Types.ObjectId(user),
    });

    console.log(cardIssues);

    await this.cardRepository.findOneAndUpdate(
      { _id: card._id },
      { $set: { status: CardStatus.Active, pin: createCardIssuesDto.pin } },
    );
  }
}
