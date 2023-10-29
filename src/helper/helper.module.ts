import { Global, Module } from '@nestjs/common';
import { HelperHashService } from './services/hash.service';

@Global()
@Module({
  providers: [HelperHashService],
  exports: [HelperHashService],
  controllers: [],
})
export class HelperModule {}
