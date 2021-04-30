import {
    Box,
    Flex,
    Heading,
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel, 
    Table, 
    Thead, 
    Th, 
    Tbody, 
    Tr, 
    Td, 
    Center, 
  } from '@chakra-ui/react'
  
import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Footer } from '../components/Footer'
import React from 'react';
import theme from '../theme';
import { MatchInfo } from '../components/MatchInfo';
  
  const data = {
    match : {
        id: "1",
        date: "Apr 28, 2019",
        result: "CSK Won by 7 wickets",
        team1Won: true,
        team1: {
          id: "11",
          name: "CSK",
          total: 171,
          wickets: 3,
          extras: 8,
          overs: 20,
          rr: 8.35,
          batting: [
              {
                  player: {
                      name: "Player 1"
                  },
                  runs: 20,
                  balls: 30,
                  fours: 1,
                  sixes: 0,
                  sr: 80.4,
                  status: "not out",
              },
              {
                player: {
                    name: "Player 2"
                },
                runs: 125,
                balls: 80,
                fours: 10,
                sixes: 8,
                sr: 154.24,
                status: "c Kedar Jadhav b Rashid Khan",
            }
          ],
          bowling: [
              {
                player: {
                    name: "Player 3"
                },
                overs: 4,
                maidens: 0,
                runs: 24,
                wickets: 1,
                economy: 6.12,
              },
              {
                player: {
                    name: "Player 4"
                },
                overs: 3.1,
                maidens: 1,
                runs: 10,
                wickets: 5,
                economy: 2.33,
              }
          ]
        },
        team2: {
          id: "12",
          name: "SRH",
          total: 173,
          wickets: 8,
          extras: 2,
          overs: 19,
          rr: 9,
          batting: [
              {
                  player: {
                      name: "Player 12"
                  },
                  runs: 20,
                  balls: 30,
                  fours: 1,
                  sixes: 0,
                  sr: 80.4,
                  status: "not out",
              },
              {
                player: {
                    name: "Player 22"
                },
                runs: 125,
                balls: 80,
                fours: 10,
                sixes: 8,
                sr: 154.24,
                status: "c Kedar Jadhav b Rashid Khan",
            }
          ],
          bowling: [
              {
                player: {
                    name: "Player 32"
                },
                overs: 4,
                maidens: 0,
                runs: 24,
                wickets: 1,
                economy: 6.12,
              },
              {
                player: {
                    name: "Player 42"
                },
                overs: 3.1,
                maidens: 1,
                runs: 10,
                wickets: 5,
                economy: 2.33,
              }
          ]
        },
        team1Rating: 4.3,
        team2Rating: 3.2
      }
  }

const getTabTitle = (name: string, total: number, wickets: number) => {
    return name + " " + total + "/" + wickets; 
}

const prepareBattingRow = (battingArray: any) => {
    return battingArray.map((b: { player: { name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }; runs: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; balls: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; fours: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; sixes: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; sr: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
        return (
            <Tr>
                <Td>{b.player.name}</Td>
                <Td><Center>{b.runs}</Center></Td>
                <Td><Center>{b.balls}</Center></Td>
                <Td><Center>{b.fours}</Center></Td>
                <Td><Center>{b.sixes}</Center></Td>
                <Td><Center>{b.sr}</Center></Td>
            </Tr>
        );
    });
}

const prepareBowlingRow = (bowlingArray: any) => {
    return bowlingArray.map((b: { player: { name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }; overs: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; maidens: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; runs: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; wickets: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; economy: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
        return (
            <Tr>
                <Td>{b.player.name}</Td>
                <Td><Center>{b.overs}</Center></Td>
                <Td><Center>{b.maidens}</Center></Td>
                <Td><Center>{b.runs}</Center></Td>
                <Td><Center>{b.wickets}</Center></Td>
                <Td><Center>{b.economy}</Center></Td>
            </Tr>
        );
    });
}

const prepareTabPanel = (team: any) => {
    return (
    <TabPanel px="0px">
        <Box bg={theme.colors.color1} w="100%" px="10px">
        <Heading as="u" fontSize="sm">Batting</Heading>
        </Box>
        <Box px="10px">
        <Table colorScheme="whiteAlpha" variant="striped" size="xs">
            <Thead>
                <Th><Center>Player</Center></Th>
                <Th><Center>R</Center></Th>
                <Th><Center>B</Center></Th>
                <Th><Center>4s</Center></Th>
                <Th><Center>6s</Center></Th>
                <Th><Center>SR</Center></Th>
            </Thead>
            <Tbody fontSize="xs">
                {prepareBattingRow(team.batting)}
            </Tbody>
        </Table>
        </Box>
        <Box px="10px" mt="20px">
        <Heading fontSize="sm">Extras {team.extras}</Heading>
        <Heading fontSize="sm">Total {team.total}</Heading>
        <Heading fontSize="sm">Overs {team.overs}, {team.wickets} Wickets, RR {team.rr}</Heading>
        </Box>
        <Box bg={theme.colors.color1} w="100%" px="10px" mt="20px">
        <Heading as="u" fontSize="sm">Bowling</Heading>
        </Box>
        <Box px="10px">
        <Table colorScheme="whiteAlpha" variant="striped" size="xs">
            <Thead>
                <Th><Center>Player</Center></Th>
                <Th><Center>O</Center></Th>
                <Th><Center>M</Center></Th>
                <Th><Center>R</Center></Th>
                <Th><Center>W</Center></Th>
                <Th><Center>E</Center></Th>
            </Thead>
            <Tbody fontSize="xs">
                {prepareBowlingRow(team.bowling)}
            </Tbody>
        </Table>
        </Box>
    </TabPanel>);
}

  const Index = () => (
  
    <Container>
      <Hero title="Score Card"/>
      <Box
        p="2px"
        borderRadius="lg"
        w="100%"
        bg={theme.colors.color2}
        boxShadow="dark-lg"
        maxW="620px"
      >
          <Flex direction="column">
              <MatchInfo team1={data.match.team1.name} team2={data.match.team2.name} result={data.match.result} mathDate={data.match.date} />
              <Tabs colorScheme="whiteAlpha" variant="enclosed" mt="10px">
                  <TabList>
                      <Tab>{getTabTitle(data.match.team1.name, data.match.team1.total, data.match.team1.wickets)}</Tab>
                      <Tab>{getTabTitle(data.match.team2.name, data.match.team2.total, data.match.team2.wickets)}</Tab>
                  </TabList>
                  <TabPanels>
                      {prepareTabPanel(data.match.team1)}
                      {prepareTabPanel(data.match.team2)}
                  </TabPanels>
              </Tabs>
          </Flex>
      </Box>
      <Footer />
    </Container>
  )
  
  export default Index
  