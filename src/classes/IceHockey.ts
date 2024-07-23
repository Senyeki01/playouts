export class IceHockey {
    private breakCount: number = 3;
    private numberOfPlayers: number = 6;

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