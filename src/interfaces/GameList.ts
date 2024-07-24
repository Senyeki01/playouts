import { SportConfig } from "./SportConfig";
import { Sport } from "./Sport";

export interface GameList {
    gameConfig: SportConfig,
    games: Sport[],
}