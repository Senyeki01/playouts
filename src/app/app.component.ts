import { Component, OnDestroy } from '@angular/core';
import { Football } from 'src/classes/Football';
import { SportCreated } from 'src/classes/Sport';
import { DataService } from './service/data.service';
import { Subscription } from 'rxjs';
import { MainData } from 'src/interfaces/MainData';
import { Sport } from 'src/interfaces/Sport';
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

      this.games.data.forEach((game: Sport) => this.createSport({
        ...game,
        homeTeamImg: `../assets/team-badges/${game.homeTeamAbbr}.png`,
        awayTeamImg: `../assets/team-badges/${game.awayTeamAbbr}.png`,
        homeTeamScore: 0,
        awayTeamScore: 0
      }));
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

  createSport(game: Sport) {
    const homeTeam = new Football(game.homeTeamID, game.homeTeamAbbr, this.games.config.msPerGamePeriod, this.games.config.break);
    const awayTeam = new Football(game.awayTeamID, game.awayTeamAbbr, this.games.config.msPerGamePeriod, this.games.config.break);
    
    this.gameList.games.push(new SportCreated(
      {
        homeTeamAbbr: homeTeam.teamName,
        awayTeamAbbr: awayTeam.teamName,
        homeTeamID: homeTeam.teamID,
        awayTeamID: awayTeam.teamID,
        goals: game.goals,
        homeTeamImg: game['homeTeamImg'],
        awayTeamImg: game['awayTeamImg'],
        homeTeamScore: game['homeTeamScore'],
        awayTeamScore: game['awayTeamScore']
      }
    ));
    this.gameList.gameConfig = homeTeam.getConfigs()
  }

  startGame() {
    console.log('Game List', this.gameList);
    const gameList = {...this.gameList};

    gameList.games.forEach(game => {
      game.sport.goals.forEach(goal => {
        setTimeout(() => {
          console.log(`${goal.teamAbbr} Goal Scored!!!`);
          if(goal.teamID === game.sport.homeTeamID) {
            game.sport['homeTeamScore']++;
          } else {
            game.sport['awayTeamScore']++;
          }
          this.gameList = gameList;
        }, goal.videoMS);
      });
    });
    console.log('Half Time', this.gameList.gameConfig.msPerGamePeriod);
    console.log('Match Ended', this.gameList.gameConfig.msPerGamePeriod * 2 + this.gameList.gameConfig.breakDuration);

    console.log('Break Duration', this.gameList.gameConfig.breakDuration);
    console.log('Full Time', this.gameList.gameConfig.msPerGamePeriod * 2);


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
