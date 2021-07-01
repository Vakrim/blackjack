import { Card, CardValue } from './card';
import { Player } from './player';

describe(Player, () => {
  let player: Player;

  beforeEach(() => {
    player = new Player('Kamil');
  });

  it('has initial state', () => {
    expect(player.score).toBe(0);
    expect(player.hasBlackjack()).toBe(false);
    expect(player.hasBusted()).toBe(false);
  });

  it('has name', () => {
    expect(player.name).toBe('Kamil');
  });

  it('has score', () => {
    player.takeCard(getCard('6'));
    expect(player.score).toBe(6);
  });

  it('can take cards until blackjack', () => {
    player.takeCard(getCard('K'));
    player.takeCard(getCard('A'));

    expect(player.score).toBe(21);
    expect(player.hasBlackjack()).toBe(true);

    expect(() => {
      player.takeCard(getCard('5'));
    }).toThrow('Player has blackjack already');
  });

  it('can take cards until blackjack', () => {
    player.takeCard(getCard('5'));
    player.takeCard(getCard('K'));
    player.takeCard(getCard('J'));

    expect(player.score).toBe(25);
    expect(player.hasBusted()).toBe(true);

    expect(() => {
      player.takeCard(getCard('5'));
    }).toThrow('Player has busted');
  });
});

function getCard(value: CardValue) {
  return new Card('HEARTS', value);
}
