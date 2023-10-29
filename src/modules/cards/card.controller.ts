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

  @Get("/")
  @HttpCode(HttpStatus.OK)
  async findCards(): Promise<{success:boolean,data:CardDocument[], }> {
    const cards= await this.cardsService.getAllCards();
    return {
      success:true,
      data:cards,
    }
  }
}
