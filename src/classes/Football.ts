export class Football {
    private breakCount: number = 1;
    private numberOfPlayers: number = 11;

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