import {
  ScaleFade,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { useQuery } from "@apollo/client";
import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Footer } from '../components/Footer'
import { MatchBriefCard } from '../components/MatchBriefCard';
import { ALL_MATCHES } from '../graphql/queries';
import { MatchData } from '../models/apidatamodels';

// const data = {
//   matches : [
//     {
//       id: "1",
//       date: "Apr 28, 2019",
//       result: "CSK Won by 7 wickets",
//       team1Won: true,
//       team1: {
//         id: "11",
//         name: "CSK",
//       },
//       team2: {
//         id: "12",
//         name: "SRH",
//       },
//       team1Rating: 4.3,
//       team2Rating: 3.2,
//       count: 10,
//     },
//     {
//       id: "2",
//       date: "April 27, 2019",
//       result: "RCB Won by 1 run",
//       team1Won: false,
//       team1: {
//         id: "13",
//         name: "DC",
//       },
//       team2: {
//         id: "14",
//         name: "RCB",
//       },
//       team1Rating: 2.3,
//       team2Rating: 5,
//       count: 10,
//     }
//   ]
// }

const Index = () => {

  const {data, loading, error} = useQuery(ALL_MATCHES);

  const renderCards = () => {
    return data.matches.map((m: MatchData) =>{
      const iscale = Math.random();
      return <ScaleFade initialScale={iscale} in={true} key={m.id} ><MatchBriefCard match={m} mt="1em"/></ScaleFade>;
    });
  }
  return (
    <Container>
      <Hero isHome={true} />
      {
        loading? <Text>Loading matches, please wait...</Text> :
        error? <Text>Failed to load matches, try again...</Text> :
        <SimpleGrid columns={[1, 2, 3, 4]} w="100%" spacing="10px">
          { renderCards()}
        </SimpleGrid>
      }
      <Footer />
    </Container>
  );
}

export default Index
