
export class Performance {
    playerId: string = "";
    performance: string[] = [];
}

export class Rating {
    playerId: string = "";
    defaultRating: number = 0;
}
export class Bowling {
    playerId: string = "";
    overs: number = 0;
    runs: number = 0;
    maindains: number = 0;
    wickets: number = 0;
    economy: number = 0;
}
export class Batting {
    playerId: string = "";
    runs: number = 0;
    balls: number = 0;
    fours: number = 0;
    sixes: number = 0;
    sr: number = 0;
    status: string = "";
}

export class Team {
    name: string;
    isWon: boolean;
    playingIds: string[];
    teamRating: number;
    count: number;
    extras: number;
    total: string;
    overs: number;
    batting: Batting[];
    bowling: Bowling[];
    performance: Performance[];
    rating: Rating[];

    constructor() {
            this.name = "";
            this.isWon = false;
            this.teamRating = 0;
            this.count = 0;
            this.playingIds = [];
            this.extras = 0;
            this.total = "";
            this.overs = 0;
            this.batting = [];
            this.bowling = [];
            this.performance = [];
            this.rating = [];
        }

}

export class Match {
    name: string;
    tournamentId: string;
    date: string;
    result: string;
    teams: Team[];
    
    constructor(name: string, tournamentId: string, date: string, result: string) {
        this.name = name;
        this.tournamentId = tournamentId;
        this.date = date;
        this.result = result;
        this.teams = [];
    }
}

export class Tournament {
    id: string;
    name: string;
    host: string;
    year: number;

    constructor() {
        this.id = "";
        this.name = "";
        this.host = "";
        this.year = 0;
    }
}

export class Player {
    id: string = "";
    name: string = "";
    photo: string = "";
}

export class PlayerInfo {
    id: string = "";
    isReady: boolean = false;
    isBatting: boolean = false;
    batting: Batting = new Batting();
    isBowling: boolean = false;
    bowling: Bowling = new Bowling();
    rating: Rating = new Rating();
    performance: Performance = new Performance();
}
