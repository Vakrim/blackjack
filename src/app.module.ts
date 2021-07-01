import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BlackjackModule } from './domains/blackjack.module';

@Module({
  imports: [
    BlackjackModule,
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'test' ? 'test.env' : '.env',
    }),
  ],
})
export class AppModule {}
