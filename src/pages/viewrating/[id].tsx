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
  
import { Hero } from '../../components/Hero'
import { Container } from '../../components/Container'
import { Footer } from '../../components/Footer'
import React from 'react';
import theme from '../../theme';
import { MatchInfo } from '../../components/MatchInfo';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { MATCH_VIEWRATING } from "../../graphql/queries";
import { RatingData, TeamData } from '../../models/apidatamodels';
  
const getTabTitle = (name: string, rating: number) => {
    return name + " " + (Math.round(rating *100 ) / 100) + " / 5"; 
}

const prepareRow = (arr: any) => {
    return arr.map((b: RatingData) => {
        return (
            <Tr key={b.id}>
                <Td>{b.player.name}</Td>
                <Td><Center>{Math.round(b.rating * 100) / 100}</Center></Td>
            </Tr>
        );
    });
}

const prepareTabPanel = (team: TeamData) => {
    return (
    <TabPanel px="0px">
        <Box px="10px">
            <Table colorScheme="whiteAlpha" variant="striped" size="xs">
                <Thead>
                    <Tr>
                        <Th><Center>Player</Center></Th>
                        <Th><Center>Rating</Center></Th>
                    </Tr>
                </Thead>
                <Tbody fontSize="xs">
                    {prepareRow(team.rating)}
                </Tbody>
            </Table>
        </Box>
    </TabPanel>);
}

const Index = () => {
    const router = useRouter()
    const {data, loading, error} = useQuery(MATCH_VIEWRATING, {variables: {id: router.query.id}});
    
    return (
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
          {
            loading ? <Text>Loading match data, please wait...</Text> :
            error ? <Text>Error while loading match data, try again...</Text> :
                <Flex direction="column">
                    <MatchInfo team1={data.match.teams[0].name} team2={data.match.teams[1].name} result={data.match.result} mathDate={data.match.date} />
                    <Heading fontSize="sm" my="5px">Ratings are based on total {data.match.teams[0].count} votes</Heading>
                    <Tabs colorScheme="whiteAlpha" variant="enclosed" mt="10px">
                        <TabList>
                            <Tab>{getTabTitle(data.match.teams[0].name, data.match.teams[0].teamRating)}</Tab>
                            <Tab>{getTabTitle(data.match.teams[1].name, data.match.teams[1].teamRating)}</Tab>
                        </TabList>
                        <TabPanels>
                            {prepareTabPanel(data.match.teams[0])}
                            {prepareTabPanel(data.match.teams[1])}
                        </TabPanels>
                    </Tabs>
                </Flex>
            }
      </Box>
      <Footer />
    </Container>
  );
}
  export default Index
  