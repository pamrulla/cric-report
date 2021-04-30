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
        team1Rating: 2.3,
        team2Rating: 5,
        count: 10,
        team1: {
          id: "11",
          name: "CSK",
          ratings: [
              {
                  player: {
                      name: "Player 1"
                  },
                  rating: 2.5,
              },
              {
                player: {
                    name: "Player 2"
                },
                rating: 1.25,
            }
          ],
        },
        team2: {
          id: "12",
          name: "SRH",
          ratings: [
            {
                player: {
                    name: "Player 12"
                },
                rating: 2.5,
            },
            {
              player: {
                  name: "Player 22"
              },
              rating: 1.25,
          }
        ],
      }
  }
}

const getTabTitle = (name: string, rating: number) => {
    return name + " " + rating + " / 5"; 
}

const prepareRow = (arr: any) => {
    return arr.map((b: { player: { name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }; rating: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
        return (
            <Tr>
                <Td>{b.player.name}</Td>
                <Td><Center>{b.rating}</Center></Td>
            </Tr>
        );
    });
}

const prepareTabPanel = (team: any) => {
    return (
    <TabPanel px="0px">
        <Box px="10px">
            <Table colorScheme="whiteAlpha" variant="striped" size="xs">
                <Thead>
                    <Th><Center>Player</Center></Th>
                    <Th><Center>Rating</Center></Th>
                </Thead>
                <Tbody fontSize="xs">
                    {prepareRow(team.ratings)}
                </Tbody>
            </Table>
        </Box>
    </TabPanel>);
}

const Index = () => (
  
    <Container>
      <Hero title="Report Card"/>
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
              <Heading fontSize="sm" my="5px">Ratings are based on total {data.match.count} votes</Heading>
              <Tabs colorScheme="whiteAlpha" variant="enclosed" mt="10px">
                  <TabList>
                      <Tab>{getTabTitle(data.match.team1.name, data.match.team1Rating)}</Tab>
                      <Tab>{getTabTitle(data.match.team2.name, data.match.team2Rating)}</Tab>
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
  