import { Module } from "@nestjs/common";
import { SessionService } from "./session.service";
import { Services } from "src/utils/constants";
import { DatabaseModule } from "src/database";
import { SessionDocument } from "./session.model";
import { LoggerModule } from "src/logger";
import { SessionRepository } from "./session.repository";

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([SessionDocument]),
    LoggerModule,
  ],
  providers: [
    {
      provide: Services.SESSION,
      useClass: SessionService,
    },
    SessionRepository,
  ],
  exports: [
    {
      provide: Services.SESSION,
      useClass: SessionService,
    },
  ],
})
export class SessionModule {}
