import { Module } from '@nestjs/common';
import { BlackjackController } from '../controllers/blackjack.controller';
import { ShuffledDeckModule } from '../repositories/shuffled-deck/shuffled-deck.module';
import { BlackjackSerializer } from '../serializers/blackjack.serializer';
import { BlackjackUseCase } from '../use-cases/blackjack/blackjack.use-case';

@Module({
  imports: [ShuffledDeckModule],
  providers: [BlackjackUseCase, BlackjackSerializer],
  controllers: [BlackjackController],
})
export class BlackjackModule {}
