import { SportConfig } from "./SportConfig";
import { Sport } from "./Sport";
import { Observable } from "rxjs";

export interface GameList {
    gameConfig: SportConfig,
    games: Sport[],
    startGames: Function,
    breakStatus$: any
}