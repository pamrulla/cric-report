import { Player, Tournament } from "./addMatchModel";

export class PerformanceData {
    id: string = "";
    player: Player = new Player();
    performance: string[] = [];
}

export class RatingData {
    id: string = "";
    player: Player = new Player();
    rating: number = 0;
    defaultRating: number = 0;
}
export class BowlingData {
    id: string = "";
    player: Player = new Player();
    overs: number = 0;
    runs: number = 0;
    maindains: number = 0;
    wickets: number = 0;
    economy: number = 0;
}
export class BattingData {
    id: string = "";
    player: Player = new Player();
    runs: number = 0;
    balls: number = 0;
    fours: number = 0;
    sixes: number = 0;
    sr: number = 0;
    status: string = "";
}

export class TeamData {
    id: string = "";
    name: string;
    isWon: boolean;
    playing: Player[];
    teamRating: number;
    count: number;
    extras: number;
    total: string;
    overs: number;
    batting: BattingData[];
    bowling: BowlingData[];
    performance: PerformanceData[];
    rating: RatingData[];

    constructor() {
            this.name = "";
            this.isWon = false;
            this.teamRating = 0;
            this.count = 0;
            this.playing = [];
            this.extras = 0;
            this.total = "";
            this.overs = 0;
            this.batting = [];
            this.bowling = [];
            this.performance = [];
            this.rating = [];
        }

}

export class MatchData {
    id: string = "";
    name: string = "";
    tournamentId: Tournament = new Tournament();
    date: string = "";
    result: string = "";
    teams: TeamData[] = [];
}
