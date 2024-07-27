export class IceHockey {
    private breakCount: number = 3;
    private numberOfPlayers: number = 6;
    private msPerGamePeriod: number = 60000 * 60;
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