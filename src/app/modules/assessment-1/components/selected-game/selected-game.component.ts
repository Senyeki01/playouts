import { Component, OnDestroy } from '@angular/core';
import { MainSport } from 'src/app/classes/MainSport';
import { DataService } from '../../../../services/data.service';
import { Subscription } from 'rxjs';
import { MainData } from 'src/interfaces/MainData';
import { GameList } from 'src/interfaces/GameList';
import { TimeoutService } from "src/app/services/timeout.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-selected-game',
  templateUrl: './selected-game.component.html',
  styleUrls: ['./selected-game.component.scss']
})
export class SelectedGameComponent implements OnDestroy {
  public games!: MainData;
  public gameList!: GameList;
  public dataSubscription!: Subscription;
  public gamesStarted: boolean = false;
  public teamScored: string = '';
  private timeoutId: any;
  public gameType: string = '';

  constructor(private dataService: DataService, private timeoutService: TimeoutService, private router: Router) {
    this.resetGame();

    const routeArray = router.url.split('/');
    this.gameType = routeArray[routeArray.length - 1];
    console.log(this.gameType);

    this.dataSubscription = this.dataService.getGames(this.gameType).subscribe(res => {
      this.games = res;
      this.gameList = new MainSport(this.games, this.gameType, this.timeoutService); // icehookey

      // Listen to the team that scores
      this.gameList.teamScored$.subscribe((teamScored:string) => {
        if (this.timeoutId) {
          clearInterval(this.timeoutId);
        }
        
        this.teamScored = teamScored;
        this.timeoutId = setTimeout(() => {
          this.teamScored = ''
        }, 7000);
      })
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
      startGames: () => { },
      breakStatus$: 0,
      teamScored$: '',
    }
  }

  startGame() {
    this.gamesStarted = true;
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();

    if (this.timeoutId) {
      clearInterval(this.timeoutId);
    }
  }
}
