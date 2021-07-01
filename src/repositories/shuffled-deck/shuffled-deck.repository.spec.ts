import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { Card } from '../../entities/card';
import { Deck } from '../../entities/deck';
import { ShuffledDeckRepository } from './shuffled-deck.repository';

describe(ShuffledDeckRepository, () => {
  let service: ShuffledDeckRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShuffledDeckRepository,
        {
          provide: HttpService,
          useClass: HttpServiceMock,
        },
        {
          provide: ConfigService,
          useClass: ConfigServiceMock,
        },
      ],
    }).compile();

    service = module.get<ShuffledDeckRepository>(ShuffledDeckRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns deck of cards', async () => {
    const deck = await service.getDeck();

    expect(deck).toBeInstanceOf(Deck);
    expect(deck.size()).toBe(2);

    const card = deck.drawCard();

    expect(card).toBeInstanceOf(Card);
    expect(card.symbol).toBe('D4');

    const card2 = deck.drawCard();

    expect(card2).toBeInstanceOf(Card);
    expect(card2.symbol).toBe('SQ');
  });
});

class HttpServiceMock {
  get() {
    return of({
      data: [
        { suit: 'DIAMONDS', value: '4' },
        { suit: 'SPADES', value: 'Q' },
      ],
    });
  }
}

class ConfigServiceMock {
  get() {
    return 'https://some.url';
  }
}
