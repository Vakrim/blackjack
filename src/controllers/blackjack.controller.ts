import { Controller, Get } from '@nestjs/common';
import { BlackjackSerializer } from '../serializers/blackjack.serializer';
import { BlackjackUseCase } from '../use-cases/blackjack/blackjack.use-case';

@Controller()
export class BlackjackController {
  constructor(
    private blackjackUseCase: BlackjackUseCase,
    private blackjackSerializer: BlackjackSerializer,
  ) {}

  @Get()
  async blackjack() {
    const result = await this.blackjackUseCase.executeGame();

    return this.blackjackSerializer.serialize(result);
  }
}
