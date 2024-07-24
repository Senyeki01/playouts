import { Component, OnDestroy } from '@angular/core';
import { MainSport } from 'src/classes/MainSport';
import { DataService } from './service/data.service';
import { Subscription } from 'rxjs';
import { MainData } from 'src/interfaces/MainData';
import { GameList } from 'src/interfaces/GameList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  games!: MainData;
  gameList!: GameList;
  dataSubscription!: Subscription;

  constructor(private dataService: DataService) {
    this.resetGame();

    this.dataSubscription = this.dataService.getGames().subscribe(res => {
      this.games = res;
      this.gameList = new MainSport(this.games, 'football'); // icehookey
    });
  }

  resetGame() {
    this.gameList = {
      gameConfig: {
        breakCount: 0,
        msPerGamePeriod: 0,
        breakDuration: 0,
        numberOfPlayers: 0
      },
      games: [],
    }
  }

  startGame() {
    const gameList = { ...this.gameList };

    gameList.games.forEach(game => {
      game.goals.forEach(goal => {
        setTimeout(() => {
          console.log(`${goal.teamAbbr} Goal Scored!!!`);
          if (goal.teamID === game.homeTeamID) {
            game['homeTeamScore']++;
          } else {
            game['awayTeamScore']++;
          }
          this.gameList = gameList;
        }, goal.videoMS);
      });
    });

    console.log('Half Time', this.gameList.gameConfig.msPerGamePeriod);

    setTimeout(() => {
      alert('Half Time');
    }, this.gameList.gameConfig.msPerGamePeriod);

    setTimeout(() => {
      alert('Match Ended');
    }, this.gameList.gameConfig.msPerGamePeriod * 2 + this.gameList.gameConfig.breakDuration);
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

}
