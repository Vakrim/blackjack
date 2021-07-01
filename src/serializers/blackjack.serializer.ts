import { Injectable } from '@nestjs/common';
import { Player } from '../entities/player';

@Injectable()
export class BlackjackSerializer {
  public serialize(data: BlackjactData) {
    return {
      winner: data.winner.name,
      players: [
        this.serializePlayer(data.player),
        this.serializePlayer(data.bob),
      ],
    };
  }

  private serializePlayer(player: Player) {
    return {
      name: player.name,
      points: player.score,
      cards: player.hand.map((card) => card.symbol),
    };
  }
}

interface BlackjactData {
  winner: Player;
  player: Player;
  bob: Player;
}
