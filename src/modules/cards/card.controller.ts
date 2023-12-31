import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from "@nestjs/common";
import { Routes, Services } from "src/utils/constants";
import { CardDocument } from "./card.model";
import { CreateCardDto } from "./dtos/create-card.dto";
import { ICardsService } from "./card";
import { StatusOk } from "src/utils/types/ok";
import { CreateCardIssueDto } from "./dtos/create-issue.dto";

@Controller(Routes.CARDS)
export class CardsController {
  constructor(
    @Inject(Services.CARDS) private readonly cardsService: ICardsService,
  ) {}

  @Post("/")
  @HttpCode(HttpStatus.NO_CONTENT)
  async createCard(
    @Body() createCardDto: CreateCardDto,
  ): Promise<CardDocument> {
    return this.cardsService.createCard(createCardDto);
  }

  @Post("/issue")
  @HttpCode(HttpStatus.NO_CONTENT)
  async issueCard(@Body() issueCardDto: CreateCardIssueDto): Promise<void> {
    return this.cardsService.createCardIssues(issueCardDto);
  }

  @Get("/")
  @HttpCode(HttpStatus.OK)
  async findCards(): Promise<StatusOk<CardDocument[]>> {
    const cards = await this.cardsService.getAllCards();
    return {
      success: true,
      message: "Cards found",
      data: cards,
    };
  }
}
