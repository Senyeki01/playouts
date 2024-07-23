import { Goal } from "./Goal";

export interface Sport {
    homeTeamAbbr: string,
    awayTeamAbbr: string,
    awayTeamID: number,
    homeTeamID: number,
    goals: Goal[],
    // Index signature for additional properties
    [key: string]: any;
}