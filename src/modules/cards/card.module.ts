import { Module } from "@nestjs/common";
import { CardsController } from "./card.controller";
import { Services } from "src/utils/constants";
import { CardsService } from "./card.service";
import { DatabaseModule } from "src/database";
import { CardDocument } from "./card.model";
import { LoggerModule } from "src/logger";
import { CardRepository } from "./cards.repository";

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([CardDocument]),
    LoggerModule,
  ],
  controllers: [CardsController],
  providers: [
    {
      provide: Services.CARDS,
      useClass: CardsService,
    },
    CardRepository,
  ],
  exports: [
    {
      provide: Services.CARDS,
      useClass: CardsService,
    },
  ],
})
export class CardModule {}
