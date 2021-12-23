import { Module } from '@nestjs/common';
import { ConnectionModule } from './config/database/typeorm/connection.module';

@Module({
  imports: [ConnectionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
