import { Card } from './card';

describe(Card, () => {
  it('has assigned score', () => {
    expect(new Card('DIAMONDS', '6').score).toBe(6);
    expect(new Card('HEARTS', '6').score).toBe(6);
    expect(new Card('HEARTS', 'J').score).toBe(10);
    expect(new Card('HEARTS', 'K').score).toBe(10);
    expect(new Card('HEARTS', 'A').score).toBe(11);
  });

  it('has symbol', () => {
    expect(new Card('DIAMONDS', '6').symbol).toBe('D6');
    expect(new Card('HEARTS', '6').symbol).toBe('H6');
    expect(new Card('HEARTS', 'J').symbol).toBe('HJ');
    expect(new Card('SPADES', 'K').symbol).toBe('SK');
    expect(new Card('CLUBS', 'A').symbol).toBe('CA');
  });
});
