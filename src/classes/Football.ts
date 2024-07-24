export class Football {
    private breakCount: number = 1;
    private numberOfPlayers: number = 11;
    private msPerGamePeriod: number = 60000 * 90;
    private breakDuration: number = 60000 * 15;

    constructor(
        public teamID: number, 
        public teamName: string,         
    ) { }

    getConfigs() {
        return {
            breakCount: this.breakCount,
            numberOfPlayers: this.numberOfPlayers,
            msPerGamePeriod: this.msPerGamePeriod,
            breakDuration: this.breakDuration,
        }
    }
}