import { Test, TestingModule } from '@nestjs/testing';
import { Card, CardValue } from '../../entities/card';
import { Deck } from '../../entities/deck';
import { ShuffledDeckRepository } from '../../repositories/shuffled-deck/shuffled-deck.repository';
import { BlackjackUseCase } from './blackjack.use-case';

describe(BlackjackUseCase, () => {
  let service: BlackjackUseCase;
  let getDeckMock: jest.Mock<Promise<Deck>, []>;

  beforeEach(async () => {
    getDeckMock = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlackjackUseCase,
        { provide: ShuffledDeckRepository, useValue: { getDeck: getDeckMock } },
      ],
    }).compile();

    service = module.get<BlackjackUseCase>(BlackjackUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /**
   * player 11 + 10 = 21
   * bob 7 + 7
   */
  it('player wins with instant blackjack', async () => {
    getDeckMock.mockResolvedValueOnce(generateDeck(['A', 'K', '7', '7']));

    let result = await service.executeGame();

    expect(result.winner).toBe(result.player);

    expect(result.player.hand.length).toBe(2);
    expect(result.player.score).toBe(21);
    expect(result.bob.score).toBe(14);
  });

  /**
   * player 11 + 5 + 5 = 21
   * bob 7 + 7
   */
  it('player wins with blackjack', async () => {
    getDeckMock.mockResolvedValueOnce(generateDeck(['A', '5', '7', '7', '5']));

    let result = await service.executeGame();

    expect(result.winner).toBe(result.player);

    expect(result.player.hand.length).toBe(3);
    expect(result.player.score).toBe(21);
    expect(result.bob.score).toBe(14);
  });

  /**
   * player 11 + 5 + 8 = 24
   * bob 7 + 7
   */
  it('player busts', async () => {
    getDeckMock.mockResolvedValueOnce(generateDeck(['A', '5', '7', '7', '8']));

    let result = await service.executeGame();

    expect(result.winner).toBe(result.bob);

    expect(result.player.hand.length).toBe(3);
    expect(result.player.score).toBe(24);
    expect(result.bob.score).toBe(14);
  });

  /**
   * player 11 + 5 + 8 = 24
   * bob 7 + 7
   */
  it('player busts', async () => {
    getDeckMock.mockResolvedValueOnce(generateDeck(['A', '5', '7', '7', '8']));

    let result = await service.executeGame();

    expect(result.winner).toBe(result.bob);

    expect(result.player.hand.length).toBe(3);
    expect(result.player.score).toBe(24);
    expect(result.bob.score).toBe(14);
  });

  /**
   * player 11 + 6 = 17
   * bob 7 + 7 + 10 = 24
   */
  it('bob busts', async () => {
    getDeckMock.mockResolvedValueOnce(generateDeck(['A', '6', '7', '7', 'K']));

    let result = await service.executeGame();

    expect(result.winner).toBe(result.player);

    expect(result.player.hand.length).toBe(2);
    expect(result.player.score).toBe(17);
    expect(result.bob.score).toBe(24);
  });

  /**
   * player 5 + 6 + 3 + 2 + 2 = 18
   * bob 7 + 7 + 2 + 3 = 19
   */
  it('bob wins', async () => {
    getDeckMock.mockResolvedValueOnce(
      generateDeck(['5', '6', '7', '7', '3', '2', '2', '2', '3']),
    );

    let result = await service.executeGame();

    expect(result.winner).toBe(result.bob);

    expect(result.player.hand.length).toBe(5);
    expect(result.player.score).toBe(18);
    expect(result.bob.score).toBe(19);
  });
});

function generateDeck(values: CardValue[]) {
  return new Deck(values.map((v) => new Card('HEARTS', v)));
}
