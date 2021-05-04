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
    Text
  } from '@chakra-ui/react'
import { useQuery } from "@apollo/client";
import { Hero } from '../../components/Hero'
import { Container } from '../../components/Container'
import { Footer } from '../../components/Footer'
import React from 'react';
import theme from '../../theme';
import { MatchInfo } from '../../components/MatchInfo';
import { useRouter } from 'next/router';
import { BattingData, BowlingData } from '../../models/apidatamodels';
import { MATCH_SCORECARD } from '../../graphql/queries';

const getTabTitle = (name: string, total: number, wickets: number) => {
    return name + " " + total + " (" + wickets + ")"; 
}

const prepareBattingRow = (battingArray: any) => {
    return battingArray.map((b: BattingData) => {
        return (
            <Tr key={b.id}>
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
    return bowlingArray.map((b: BowlingData) => {
        return (
            <Tr key={b.id}>
                <Td>{b.player.name}</Td>
                <Td><Center>{b.overs}</Center></Td>
                <Td><Center>{b.maindains}</Center></Td>
                <Td><Center>{b.runs}</Center></Td>
                <Td><Center>{b.wickets}</Center></Td>
                <Td><Center>{b.economy}</Center></Td>
            </Tr>
        );
    });
}

const prepareTabPanel = (team: any, team2: any) => {
    return (
    <TabPanel px="0px">
        <Box bg={theme.colors.color1} w="100%" px="10px">
        <Heading as="u" fontSize="sm">Batting</Heading>
        </Box>
        <Box px="10px">
        <Table colorScheme="whiteAlpha" variant="striped" size="xs">
            <Thead>
                <Tr>
                    <Th><Center>Player</Center></Th>
                    <Th><Center>R</Center></Th>
                    <Th><Center>B</Center></Th>
                    <Th><Center>4s</Center></Th>
                    <Th><Center>6s</Center></Th>
                    <Th><Center>SR</Center></Th>
                </Tr>
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
                <Tr>
                    <Th><Center>Player</Center></Th>
                    <Th><Center>O</Center></Th>
                    <Th><Center>M</Center></Th>
                    <Th><Center>R</Center></Th>
                    <Th><Center>W</Center></Th>
                    <Th><Center>E</Center></Th>
                </Tr>
            </Thead>
            <Tbody fontSize="xs">
                {prepareBowlingRow(team2.bowling)}
            </Tbody>
        </Table>
        </Box>
    </TabPanel>);
}

const Index = () => {
    const router = useRouter();
    const {data, loading, error} = useQuery(MATCH_SCORECARD, {variables: {id: router.query.id}})

    return (
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
        {
            loading ? <Text>Loading match data, please wait...</Text> :
            error ? <Text>Error while loading match data, try again...</Text> :
            <Flex direction="column">
                <MatchInfo team1={data.match.teams[0].name} team2={data.match.teams[1].name} result={data.match.result} mathDate={data.match.date} />
                <Tabs colorScheme="whiteAlpha" variant="enclosed" mt="10px">
                    <TabList>
                        <Tab>{getTabTitle(data.match.teams[0].name, data.match.teams[0].total, data.match.teams[0].overs)}</Tab>
                        <Tab>{getTabTitle(data.match.teams[1].name, data.match.teams[1].total, data.match.teams[1].overs)}</Tab>
                    </TabList>
                    <TabPanels>
                        {prepareTabPanel(data.match.teams[0], data.match.teams[1])}
                        {prepareTabPanel(data.match.teams[1], data.match.teams[0])}
                    </TabPanels>
                </Tabs>
            </Flex>
        }
      </Box>
      <Footer />
    </Container>
  )
}
  
export default Index
  