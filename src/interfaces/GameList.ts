import { SportCreated } from "src/classes/Sport";
import { SportConfig } from "./SportConfig";

export interface GameList {
    gameConfig: SportConfig,
    games: SportCreated[],
}