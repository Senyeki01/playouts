export class IceHockey {
    private breakCount: number = 3;
    private numberOfPlayers: number = 6;

    constructor(
        public teamID: number, 
        public teamName: string,        
    ) { }

    getConfigs() {
        return {
            breakCount: this.breakCount,
            numberOfPlayers: this.numberOfPlayers
        }
    }
}