import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Card } from '../../entities/card';
import { Deck } from '../../entities/deck';

@Injectable()
export class ShuffledDeckRepository {
  private shuffledDeckUrl: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    const shuffledDeckUrl = this.configService.get<string>('SHUFFLED_DECK_URL');

    if (!shuffledDeckUrl) {
      throw new Error('SHUFFLED_DECK_URL env is missing');
    }

    this.shuffledDeckUrl = shuffledDeckUrl;
  }

  public async getDeck() {
    const response = await this.makeRequest();
    return this.mapToEntities(response.data);
  }

  private mapToEntities(cardlikes: CardDTO[]) {
    return new Deck(
      cardlikes.map((cardDTO) => new Card(cardDTO.suit, cardDTO.value)),
    );
  }

  private async makeRequest() {
    try {
      return await this.httpService
        .get<CardDTO[]>(this.shuffledDeckUrl)
        .toPromise();
    } catch (error) {
      throw new Error('Card shuffle service unavaliable');
    }
  }
}

interface CardDTO {
  suit: CardSuit;
  value: CardValue;
}

type CardSuit = 'DIAMONDS' | 'SPADES' | 'CLUBS' | 'HEARTS';

type CardValue =
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
