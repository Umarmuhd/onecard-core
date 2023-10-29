import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { Services } from 'src/utils/constants';
import { UsersService } from './user.service';
import { DatabaseModule } from 'src/database';
import { UserDocument } from './user.model';
import { LoggerModule } from 'src/logger';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([UserDocument]),
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: Services.USERS,
      useClass: UsersService,
    },
    UsersRepository,
  ],
  exports: [
    {
      provide: Services.USERS,
      useClass: UsersService,
    },
  ],
})
export class UserModule {}
