import { MainData } from "src/interfaces/MainData";
import { Sport } from "src/interfaces/Sport";
import { SportConfig } from "src/interfaces/SportConfig";
import { Football } from "./Football";

export class MainSport {
    public gameConfig!: SportConfig;
    public games: Sport[] = [];

    constructor(
        private mainData: MainData,
        private gameType: string
    ) {
        if (gameType === 'football') {
            this.createFootballGames(this.mainData.data);
        }
    }

    createFootballGames(games: Sport[]) {
        games.forEach((game: Sport) => {
            const homeTeam = new Football(game.homeTeamID, game.homeTeamAbbr);
            const awayTeam = new Football(game.awayTeamID, game.awayTeamAbbr);

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
                breakDuration: this.mainData.config.break,
                msPerGamePeriod: this.mainData.config.msPerGamePeriod,
            }
        });
    }
}