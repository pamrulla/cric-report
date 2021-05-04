import {
    Box,
    Input,
    Button,
    Select,
    Flex,
    Heading,
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel
} from '@chakra-ui/react'
import Router from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Footer } from '../components/Footer'
import theme from "../theme";
import React, { useState } from 'react';
import { Match, Team, Tournament } from '../models/addMatchModel';
import AddTournamentModal from '../components/AddTournamentModal';
import AddTeamModal from '../components/AddTeamModal';
import { GET_TOURNAMENTS } from '../graphql/queries';
import { UPLOAD_MATCH } from '../graphql/mutations';

const Index = () => {
  const [match, setMatch] = useState<Match>(new Match());
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  const { loading, error } = useQuery(GET_TOURNAMENTS, {
    onCompleted: (data) => {
      if(data.tournaments.length > 0)
        setTournaments([...data.tournaments])    
    }
  });

  const [uploadMatch, {loading: uploadMatchLoading}] = useMutation(UPLOAD_MATCH, {
    onCompleted: (_data) => {
      Router.push("/");
    }
  });
  
  const OnSubmit = () => {
    uploadMatch({variables:{input: {match: match}}});
  }

  const renderTournamentOptions = () => {
    return tournaments.map(t => {
      return <option value={t.id} key={t.id}>{t.name}</option>
    })
  }

  const onAddingTournament = (tournament: Tournament) => {
    tournaments.push(tournament);
    setMatch({...match, tournamentId: tournament.id})
  }

  const onAddingTeam = (team: Team) => {
    match.teams.push(team);
    setMatch({...match, teams: [...match.teams]})
  }

  const renderBowling = (t : Team) => {
    return t.bowling.map(b => {
      return (<>
        <Flex key={b.playerId} direction="row" alignItems="center" justifyContent="space-around">
                  <Text>{b.overs}</Text>
                  <Text>{b.runs}</Text>
                  <Text>{b.maindains}</Text>
                  <Text>{b.wickets}</Text>
                  <Text>{b.economy}</Text>
        </Flex>
      </>);
    });
  }

  const renderBatting = (t : Team) => {
    return t.batting.map(b => {
      return (<>
        <Flex key={b.playerId} direction="row" alignItems="center" justifyContent="space-around">
                  <Text>{b.runs}</Text>
                  <Text>{b.balls}</Text>
                  <Text>{b.fours}</Text>
                  <Text>{b.sixes}</Text>
                  <Text>{b.sr}</Text>
        </Flex>
      </>);
    });
  }
  const renderTeams = () => {
    return match.teams.map(t => {
      return( 
      <>
        <AccordionItem  key={t.name}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
              <Heading fontSize="lg">{t.name} {t.total} ({t.overs})</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Heading fontSize="sm">Batting</Heading>
            <Flex direction="row" alignItems="center" justifyContent="space-around">
                  <Text>R</Text>
                  <Text>B</Text>
                  <Text>4s</Text>
                  <Text>6s</Text>
                  <Text>S/R</Text>
            </Flex>
            {renderBatting(t)}
            <Heading fontSize="sm">Bowling</Heading>
            <Flex direction="row" alignItems="center" justifyContent="space-around">
                  <Text>O</Text>
                  <Text>R</Text>
                  <Text>M</Text>
                  <Text>W</Text>
                  <Text>Eco</Text>
            </Flex>
            {renderBowling(t)}
          </AccordionPanel>
        </AccordionItem>
      </>);
    });
  }

  return (
    <Container>
      <Hero title="Add Match" />
      <Box
        p="10px"
        borderRadius="lg"
        w="100%"
        bg={theme.colors.color2}
        boxShadow="dark-lg"
        maxW="620px"
      >
        {loading ? 
          <Text>Loading...</Text> :
          error ? <Text>Error occured...</Text> :
          <>
            <Input placeholder="Name of the Match" name="match-name" value={match.name} onChange={e => setMatch({...match, name: e.target.value})} />
            <Input placeholder="Date of the Match" name="match-date" value={match.date}  onChange={e => setMatch({...match, date: e.target.value})} />
            <Input placeholder="Result of the Match" name="match-result" value={match.result}  onChange={e => setMatch({...match, result: e.target.value})} />
            <Flex direction="row">
              <Select placeholder="Select Tournament" value={match.tournamentId} onChange={e => setMatch({...match, tournamentId: e.target.value})}>
                {renderTournamentOptions()}
              </Select>
              <AddTournamentModal onSuccess={onAddingTournament}></AddTournamentModal>
            </Flex>
            <Flex my="10px" direction="column">
              <Accordion allowToggle>
                {renderTeams()}
              </Accordion>          
            </Flex>
            <Flex my="10px" direction="row" justifyContent="space-between">
              <AddTeamModal onSuccess={onAddingTeam}></AddTeamModal>
              <Button bg={theme.colors.color4} onClick={OnSubmit} loadingText="Please wait..." isLoading={uploadMatchLoading} >Submit</Button>
            </Flex>
          </>
        }
      </Box>
      <Footer />
    </Container>
  );
}

export default Index;
