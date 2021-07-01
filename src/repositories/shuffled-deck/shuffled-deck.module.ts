import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShuffledDeckRepository } from './shuffled-deck.repository';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [ShuffledDeckRepository],
  exports: [ShuffledDeckRepository],
})
export class ShuffledDeckModule {}
