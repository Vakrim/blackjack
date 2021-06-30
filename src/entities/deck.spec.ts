import { Card } from './card';
import { Deck } from './deck';

describe(Deck, () => {
  it('has cards, that can be drawn', () => {
    const topCard = new Card('DIAMONDS', '5');
    const secondCard = new Card('HEARTS', '9');

    const deck = new Deck([topCard, secondCard]);

    expect(deck.drawCard()).toBe(topCard);
    expect(deck.drawCard()).toBe(secondCard);
    expect(() => {
      deck.drawCard();
    }).toThrow('Deck is empty');
  });
});
