import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { SessionModule } from './modules/session/session.module';

import mailerConfig from './config/mailer.config';
import authConfig from './config/auth.config';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import googleConfig from './config/google.config';
import { DatabaseModule } from './database';
import { LoggerModule } from './logger';
import { HelperModule } from './helper/helper.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, authConfig, mailerConfig, googleConfig],
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    SessionModule,
    AuthModule,
    UserModule,
    LoggerModule,
    HelperModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
