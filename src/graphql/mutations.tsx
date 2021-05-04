import { gql } from "@apollo/client";

export const ADD_PLAYER = gql`
mutation addPlayer($name: String!, $photo: String!) {
    addPlayer(name: $name, photo: $photo) {
      id
      name
      photo
    }
} 
`;

export const ADD_TOURNAMENT = gql`
  mutation addTournament($name: String!, $host: String!, $year: Int!) {
    addTournament(name: $name, host: $host, year: $year) {
      id
      name
      host
      year
    }
  } 
`;

export const UPLOAD_MATCH = gql`
mutation uploadMatch($input: UploadMatchPayload!) {
  uploadMatch(input: $input) {
    id
  }
}
`;

export const UPLOAD_RATING = gql`
mutation updateRating($input: MatchRatingPayload!){
  updateRating(input: $input) 
  {
  	id
    teams {
      id
      name
      teamRating
      count
      isWon
    }
  }
}
`;