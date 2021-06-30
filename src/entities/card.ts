export class Card {
  #suit: CardSuit;
  #value: CardValue;

  constructor(suit: CardSuit, value: CardValue) {
    this.#suit = suit;
    this.#value = value;
  }

  public get score(): number {
    return ScoreTable[this.#value];
  }

  public get symbol(): string {
    return `${this.#suit.slice(0, 1)}${this.#value}`;
  }
}

export type CardSuit = 'DIAMONDS' | 'SPADES' | 'CLUBS' | 'HEARTS';

export type CardValue =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'J'
  | 'Q'
  | 'K'
  | 'A';

const ScoreTable: Record<CardValue, number> = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  J: 10,
  Q: 10,
  K: 10,
  A: 11,
};
