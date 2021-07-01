import { Test, TestingModule } from '@nestjs/testing';
import { HttpService, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { of } from 'rxjs';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    })
      .overrideProvider(HttpService)
      .useClass(HttpServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(
        JSON.stringify({
          winner: 'Bob',
          players: [
            { name: 'Kamil', points: 25, cards: ['SA', 'S2', 'D2', 'DJ'] },
            { name: 'Bob', points: 17, cards: ['C6', 'CA'] },
          ],
        }),
      );
  });
});

class HttpServiceMock {
  get() {
    return of({
      data: [
        { suit: 'SPADES', value: 'A' },
        { suit: 'SPADES', value: '2' },
        { suit: 'CLUBS', value: '6' },
        { suit: 'CLUBS', value: 'A' },
        { suit: 'DIAMONDS', value: '2' },
        { suit: 'DIAMONDS', value: 'J' },
        { suit: 'CLUBS', value: '8' },
        { suit: 'SPADES', value: 'K' },
        { suit: 'DIAMONDS', value: '7' },
        { suit: 'SPADES', value: '10' },
        { suit: 'DIAMONDS', value: 'K' },
        { suit: 'HEARTS', value: '4' },
        { suit: 'SPADES', value: '4' },
        { suit: 'DIAMONDS', value: '4' },
        { suit: 'CLUBS', value: '3' },
        { suit: 'HEARTS', value: 'J' },
        { suit: 'HEARTS', value: '3' },
        { suit: 'SPADES', value: '5' },
        { suit: 'CLUBS', value: '4' },
        { suit: 'CLUBS', value: '8' },
        { suit: 'HEARTS', value: '2' },
        { suit: 'SPADES', value: '6' },
        { suit: 'DIAMONDS', value: '5' },
        { suit: 'CLUBS', value: 'K' },
        { suit: 'HEARTS', value: '7' },
        { suit: 'DIAMONDS', value: '8' },
        { suit: 'SPADES', value: '3' },
        { suit: 'CLUBS', value: '2' },
        { suit: 'DIAMONDS', value: 'A' },
        { suit: 'SPADES', value: 'Q' },
        { suit: 'HEARTS', value: 'K' },
        { suit: 'HEARTS', value: '8' },
        { suit: 'CLUBS', value: '7' },
        { suit: 'DIAMONDS', value: 'Q' },
        { suit: 'SPADES', value: 'J' },
        { suit: 'HEARTS', value: 'Q' },
        { suit: 'DIAMONDS', value: '6' },
        { suit: 'CLUBS', value: '5' },
        { suit: 'DIAMONDS', value: '3' },
        { suit: 'HEARTS', value: '10' },
        { suit: 'CLUBS', value: 'Q' },
        { suit: 'CLUBS', value: 'J' },
        { suit: 'HEARTS', value: 'A' },
        { suit: 'HEARTS', value: '6' },
        { suit: 'HEARTS', value: '8' },
        { suit: 'HEARTS', value: '5' },
        { suit: 'SPADES', value: '8' },
        { suit: 'DIAMONDS', value: '8' },
        { suit: 'DIAMONDS', value: '10' },
        { suit: 'SPADES', value: '8' },
        { suit: 'CLUBS', value: '10' },
        { suit: 'SPADES', value: '7' },
      ],
    });
  }
}
