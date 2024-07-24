import { Component, OnDestroy } from '@angular/core';
import { MainSport } from 'src/classes/MainSport';
import { DataService } from './services/data.service';
import { Subscription } from 'rxjs';
import { MainData } from 'src/interfaces/MainData';
import { GameList } from 'src/interfaces/GameList';
import { TimeoutService } from "src/app/services/timeout.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  games!: MainData;
  gameList!: GameList;
  dataSubscription!: Subscription;
  gamesStarted:boolean = false;

  constructor(private dataService: DataService, private timeoutService: TimeoutService) {
    this.resetGame();

    this.dataSubscription = this.dataService.getGames().subscribe(res => {
      this.games = res;
      this.gameList = new MainSport(this.games, 'football', this.timeoutService); // icehookey
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
      startGames: () => {},
      breakStatus$: 0
    }
  }

  startGame() {
    this.gamesStarted = true;
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

}
