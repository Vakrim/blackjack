import { Injectable } from '@nestjs/common';
import { Deck } from '../../entities/deck';
import { Player } from '../../entities/player';
import { ShuffledDeckRepository } from '../../repositories/shuffled-deck/shuffled-deck.repository';

@Injectable()
export class BlackjackUseCase {
  constructor(private shuffledDeckRepository: ShuffledDeckRepository) {}

  public async executeGame() {
    const deck = await this.shuffledDeckRepository.getDeck();

    const player = new Player('Kamil');
    const bob = new Player('Bob');

    const winner = this.getWinner(deck, player, bob);

    return { winner, player, bob };
  }

  private getWinner(deck: Deck, player: Player, bob: Player) {
    player.takeCard(deck.drawCard());
    player.takeCard(deck.drawCard());

    bob.takeCard(deck.drawCard());
    bob.takeCard(deck.drawCard());

    if (player.hasBlackjack()) {
      return player;
    }

    while (player.score < playerDrawingScoreLimit) {
      player.takeCard(deck.drawCard());

      if (player.hasBlackjack()) {
        return player;
      }
      if (player.hasBusted()) {
        return bob;
      }
    }

    while (bob.score <= player.score) {
      bob.takeCard(deck.drawCard());

      if (bob.hasBusted()) {
        return player;
      }
    }

    return bob;
  }
}

const playerDrawingScoreLimit = 17;
