import { Sport } from "./Sport"

export interface MainData {
    config: {
        break: number,
        msPerGamePeriod: number
    },
    data: Sport[]
}