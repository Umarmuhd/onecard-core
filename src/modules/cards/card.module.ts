import { Module } from "@nestjs/common";
import { CardsController } from "./card.controller";
import { Services } from "src/utils/constants";
import { CardsService } from "./card.service";
import { DatabaseModule } from "src/database";
import { CardDocument } from "./card.model";
import { LoggerModule } from "src/logger";
import { CardRepository } from "./cards.repository";
import { IssuedCardDocument } from "./issued_card.model";
import { IssuedCardRepository } from "./issued_card.repository";
// import { UsersRepository } from "../user/users.repository";
// import { UsersService } from "../user/user.service";

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([CardDocument]),
    DatabaseModule.forFeature([IssuedCardDocument]),
    LoggerModule,
  ],
  controllers: [CardsController],
  providers: [
    {
      provide: Services.CARDS,
      useClass: CardsService,
    },
    CardRepository,
    IssuedCardRepository,
  ],
  exports: [
    {
      provide: Services.CARDS,
      useClass: CardsService,
    },
  ],
})
export class CardModule {}
