import { Card } from "./card";

export class Deck {
  #cards: Card[];

  constructor(cards: Card[]) {
    this.#cards = cards;
  }

  public drawCard() {
    if(this.#cards.length === 0) {
      throw new Error('Deck is empty');
    }
    return this.#cards.shift()!;
  }
}


