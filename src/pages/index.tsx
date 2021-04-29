import {
  SimpleGrid,
  Text,
} from '@chakra-ui/react'

import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Footer } from '../components/Footer'
import { MatchBriefCard } from '../components/MatchBriefCard';

const data = {
  matches : [
    {
      id: "1",
      date: "Apr 28, 2019",
      result: "CSK Won by 7 wickets",
      team1Won: true,
      team1: {
        id: "11",
        name: "CSK",
      },
      team2: {
        id: "12",
        name: "SRH",
      },
      team1Rating: 4.3,
      team2Rating: 3.2,
      count: 10,
    },
    {
      id: "2",
      date: "April 27, 2019",
      result: "RCB Won by 1 run",
      team1Won: false,
      team1: {
        id: "13",
        name: "DC",
      },
      team2: {
        id: "14",
        name: "RCB",
      },
      team1Rating: 2.3,
      team2Rating: 5,
      count: 10,
    }
  ]
}

const renderCards = () => {
  return data.matches.map(m =>{
    if(m.team1Won)
      return <MatchBriefCard count={m.count} id={m.id} team1={m.team1.name} team2={m.team2.name} result={m.result} isTeam1Won mathDate={m.date} team1Rating={m.team1Rating.toString()} team2Rating={m.team2Rating.toString()} mt="1em"/>;
    else
      return <MatchBriefCard count={m.count} id={m.id} team1={m.team1.name} team2={m.team2.name} result={m.result} mathDate={m.date} team1Rating={m.team1Rating.toString()} team2Rating={m.team2Rating.toString()} mt="1em"/>;
  });
}

const Index = () => (

  <Container>
    <Hero />
    <SimpleGrid columns={[1, 2, 3, 4]} w="100%" spacing="10px">
      { renderCards()}
    </SimpleGrid>
    <Footer />
  </Container>
)

export default Index
