import { gql } from "@apollo/client";

export const ALL_PLAYERS = gql`
  {
    players {
      id
      name
      photo
    }
  }
`;

export const GET_TOURNAMENTS = gql`
  {
    tournaments {
      id
      year
      name
      host
    }
  }
`;

export const ALL_MATCHES = gql`
{
  matches {
    id,
    tournament {
      name
      host
      year
    }
    name
    date
    result
    teams {
      id
      name
      isWon
      teamRating
      count
      extras
      total
      overs      
    }
  }
}
`;

export const MATCH_SCORECARD = gql `
query match($id: ID!) {
    match(id: $id) {
      id,
      tournament {
        name
        host
        year
      }
      name
      date
      result
      teams {
        id
        name
        isWon
        teamRating
        count
        extras
        total
        overs
        playing {
          name
          photo
        }
        batting {
          id
          player {
            name
            photo
          }
          runs
          balls
          fours
          sixes
          sr
          status
        }
        bowling {
          id
          player {
            name
            photo
          }
          overs
          runs
          maindains
          wickets
          economy
        }
      }
    }
  }
`;

export const MATCH_VIEWRATING = gql `
query match($id: ID!) {
    match(id: $id) {
      id,
    tournament {
      name
      host
      year
    }
    name
    date
    result
    teams {
      id
      name
      isWon
      teamRating
      count
      rating {
        id
        player {
          name
        }
        rating
        defaultRating
      }
    }
  }
}
`;

export const MATCH_DOVOTE = gql `
query match($id: ID!) {
    match(id: $id) {
      id,
    tournament {
      name
      host
      year
    }
    name
    date
    result
    teams {
      id
      name
      isWon
      teamRating
      count
      rating {
        id
        player {
          id
          name
        }
        rating
        defaultRating
      }
      performance {
        id
        player {
          id
          name
          photo
        }
        performance
      }
    }
  }
}
`;
