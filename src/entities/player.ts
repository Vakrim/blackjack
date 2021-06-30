import { Card } from './card';

export class Player {
  #hand: Card[] = [];
  #name: string;
  #score: number = 0;

  constructor(name: string) {
    this.#name = name;
  }

  get score() {
    return this.#score;
  }

  get name() {
    return this.#name;
  }

  hasBusted() {
    return this.#score > 21;
  }

  hasBlackjack() {
    return this.#score === 21;
  }

  takeCard(card: Card) {
    if (this.hasBusted()) {
      throw new Error('Player has busted');
    }

    if (this.hasBlackjack()) {
      throw new Error('Player has blackjack already');
    }

    this.#score += card.score;
    this.#hand.push(card);
  }
}
