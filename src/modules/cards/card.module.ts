import { Module } from "@nestjs/common";
import { CardsController } from "./card.controller";
import { Services } from "src/utils/constants";
import { CardsService } from "./card.service";
import { DatabaseModule } from "src/database";
import { CardDocument } from "./card.model";
import { LoggerModule } from "src/logger";
import { CardRepository } from "./cards.repository";
import { CardIssuesRepository } from "./card_issues.repository";
import { CardIssuesDocument } from "./card_issues.model";
// import { UsersRepository } from "../user/users.repository";
// import { UsersService } from "../user/user.service";

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([CardDocument]),
    DatabaseModule.forFeature([CardIssuesDocument]),
    LoggerModule,
  ],
  controllers: [CardsController],
  providers: [
    {
      provide: Services.CARDS,
      useClass: CardsService,
    },
    CardRepository,
    CardIssuesRepository,
  ],
  exports: [
    {
      provide: Services.CARDS,
      useClass: CardsService,
    },
  ],
})
export class CardModule {}
