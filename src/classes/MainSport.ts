import { MainData } from "src/interfaces/MainData";
import { Sport } from "src/interfaces/Sport";
import { SportConfig } from "src/interfaces/SportConfig";
import { Football } from "./Football";
import { IceHockey } from "./IceHockey";
import { BehaviorSubject } from "rxjs";

export class MainSport {
    public breakStatus = new BehaviorSubject<string>('Game On');
    public breakStatus$ = this.breakStatus.asObservable();

    public gameConfig!: SportConfig;
    public games: Sport[] = [];

    constructor(
        private mainData: MainData,
        private gameType: string,
        private timeoutService: any
    ) {
        this.createGames(this.mainData.data);
    }

    createGames(games: Sport[]) {
        games.forEach((game: Sport) => {
            const { homeTeam, awayTeam } = this.getTeams(game);

            this.games.push(
                {
                    homeTeamAbbr: homeTeam.teamName,
                    awayTeamAbbr: awayTeam.teamName,
                    homeTeamID: homeTeam.teamID,
                    awayTeamID: awayTeam.teamID,
                    goals: game.goals,
                    homeTeamImg: `../assets/team-badges/${game.homeTeamAbbr}.png`,
                    awayTeamImg: `../assets/team-badges/${game.awayTeamAbbr}.png`,
                    homeTeamScore: 0,
                    awayTeamScore: 0,
                }
            );

            this.gameConfig = {
                ...homeTeam.getConfigs(),
                // Data from a JSON file
                breakDuration: this.mainData.config.break,
                msPerGamePeriod: this.mainData.config.msPerGamePeriod,
            }
        });
    }

    getTeams(game: Sport) {
        let homeTeam, awayTeam;

        switch (this.gameType) {
            case 'football':
                homeTeam = new Football(game.homeTeamID, game.homeTeamAbbr);
                awayTeam = new Football(game.awayTeamID, game.awayTeamAbbr);
                break;
            default:
                homeTeam = new IceHockey(game.homeTeamID, game.homeTeamAbbr);
                awayTeam = new IceHockey(game.awayTeamID, game.awayTeamAbbr);
                break;
        }

        return { homeTeam, awayTeam };
    }

    startGames() {
        this.games.forEach(game => {
            game.goals.forEach(goal => {
                this.timeoutService.startTimeout(() => {
                    if (goal.teamID === game.homeTeamID) {
                        game['homeTeamScore']++;
                    } else {
                        game['awayTeamScore']++;
                    }
                }, goal.videoMS);
            });
        });

        this.timeoutService.startTimeout(() => {
            this.breakStatus.next('Half Time');
            console.log('Half Time', this.gameConfig.breakDuration);
            this.timeoutService.startBreak(this.gameConfig.breakDuration);
            // Break in progress
            window.setTimeout(() => {
                console.log('Break Complete')
                this.timeoutService.resumeAllTimeouts();
                this.breakStatus.next('Game On');
            }, this.gameConfig.breakDuration);
        }, this.gameConfig.msPerGamePeriod);

        this.timeoutService.startTimeout(() => {
            console.log('Match Ended');
            this.breakStatus.next('Match Ended');
        }, this.gameConfig.msPerGamePeriod * 2);
    }
}