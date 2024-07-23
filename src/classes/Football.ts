export class Football {
    private breakCount: number = 1;
    private numberOfPlayers: number = 11;

    constructor(
        public teamID: number, 
        public teamName: string, 
        public msPerGamePeriod: number,
        public breakDuration: number,        
    ) { }

    getConfigs() {
        return {
            breakCount: this.breakCount,
            msPerGamePeriod: this.msPerGamePeriod,
            breakDuration: this.breakDuration,
            numberOfPlayers: this.numberOfPlayers
        }
    }
}